import { BorshCoder, EventParser, Program, } from "@coral-xyz/anchor";
import { ASSOCIATED_TOKEN_PROGRAM_ID, getAssociatedTokenAddressSync, TOKEN_PROGRAM_ID, } from "@solana/spl-token";
import { SystemProgram, SYSVAR_INSTRUCTIONS_PUBKEY, SYSVAR_RENT_PUBKEY, } from "@solana/web3.js";
import { AUTH_PROGRAM_ID, Cluster, decodeAnchorAcct, genAcctDiscHexMap, getRent, getRentSync, hexCode, parseAnchorIxs, prependComputeIxs, prepPnftAccounts, TMETA_PROGRAM_ID, } from "@tensor-hq/tensor-common";
import { DEFAULT_MICRO_LAMPORTS, DEFAULT_XFER_COMPUTE_UNITS, evalMathExpr, } from "../common";
import { findTSwapPDA, TensorSwapSDK, TENSORSWAP_ADDR } from "../tensorswap";
import { TBID_ADDR } from "./constants";
import { findBidStatePda, findNftTempPDA } from "./pda";
// ---------------------------------------- Versioned IDLs for backwards compat when parsing.
import { IDL as IDL_v0_1_0, } from "./idl/tensor_bid_v0_1_0";
import { IDL as IDL_latest } from "./idl/tensor_bid";
// initial deployment: https://explorer.solana.com/tx/2pLEU4Bvvd6xtRasDMQa9pRjhEsJKzqRoaQ4oDBG38AWadHUPudi8WjNACrB4neR5ap1GAxK6kvgcMuYYRvSVg11
export const TBidIDL_v0_1_0 = IDL_v0_1_0;
export const TBidIDL_v0_1_0_EffSlot_Mainnet = 183865849;
// remove margin funding during bidding: https://solscan.io/tx/5A7XWvgicH1hDYAPtWhZd2SX7WCvUB2jjKDFqyRr6MwtfnGuTyfPkngTvQ7dFfcSTvjihLuBSETftPo1u5iixpp
export const TBidIDL_latest = IDL_latest;
export const TBidIDL_latest_EffSlot_Mainnet = 184669012;
export const TBidIDL_latest_EffSlot_Devnet = 203536603;
// Use this function to figure out which IDL to use based on the slot # of historical txs.
export const triageBidIDL = (slot, cluster) => {
    switch (cluster) {
        case Cluster.Mainnet:
            if (slot < TBidIDL_v0_1_0_EffSlot_Mainnet)
                return null;
            if (slot < TBidIDL_latest_EffSlot_Mainnet)
                return TBidIDL_v0_1_0;
            return TBidIDL_latest;
        case Cluster.Devnet:
            if (slot < TBidIDL_latest_EffSlot_Devnet)
                return null;
            return TBidIDL_latest;
    }
};
// --------------------------------------- constants
export const CURRENT_TBID_VERSION = +IDL_latest.constants.find((c) => c.name === "CURRENT_TBID_VERSION").value;
export const TBID_TAKER_FEE_BPS = +IDL_latest.constants.find((c) => c.name === "TBID_TAKER_FEE_BPS").value;
export const MAX_EXPIRY_SEC = +IDL_latest.constants.find((c) => c.name === "MAX_EXPIRY_SEC").value;
export const BID_STATE_SIZE = evalMathExpr(IDL_latest.constants.find((c) => c.name === "BID_STATE_SIZE").value);
export const APPROX_BID_STATE_RENT = getRentSync(BID_STATE_SIZE);
// --------------------------------------- sdk
export class TensorBidSDK {
    program;
    discMap;
    coder;
    eventParser;
    constructor({ idl = IDL_latest, addr = TBID_ADDR, provider, coder, }) {
        this.program = new Program(idl, addr, provider, coder);
        this.discMap = genAcctDiscHexMap(idl);
        this.coder = new BorshCoder(idl);
        this.eventParser = new EventParser(addr, this.coder);
    }
    // --------------------------------------- fetchers
    async fetchBidState(bidState, commitment) {
        return (await this.program.account.bidState.fetch(bidState, commitment));
    }
    // --------------------------------------- account methods
    decode(acct) {
        if (!acct.owner.equals(this.program.programId))
            return null;
        return decodeAnchorAcct(acct, this.discMap);
    }
    // --------------------------------------- ixs
    async bid({ bidder, nftMint, lamports, margin = null, expireIn = null, }) {
        const [bidState, bidStateBump] = findBidStatePda({
            mint: nftMint,
            owner: bidder,
        });
        const [tswapPda, tswapPdaBump] = findTSwapPDA({});
        const builder = this.program.methods.bid(lamports, expireIn).accounts({
            nftMint,
            bidder,
            bidState,
            rent: SYSVAR_RENT_PUBKEY,
            systemProgram: SystemProgram.programId,
            tswap: tswapPda,
            //optional, as a default pick another mutable account
            marginAccount: margin ?? bidder,
        });
        return {
            builder,
            tx: { ixs: [await builder.instruction()], extraSigners: [] },
            bidState,
            bidStateBump,
            tswapPda,
            tswapPdaBump,
        };
    }
    async takeBid({ bidder, seller, nftMint, lamports, margin = null, metaCreators, nftSellerAcc, authData, compute = DEFAULT_XFER_COMPUTE_UNITS, priorityMicroLamports = DEFAULT_MICRO_LAMPORTS, optionalRoyaltyPct = null, takerBroker = null, }) {
        const [bidState, bidStateBump] = findBidStatePda({
            mint: nftMint,
            owner: bidder,
        });
        const [tswapPda, tswapPdaBump] = findTSwapPDA({});
        const swapSdk = new TensorSwapSDK({
            provider: this.program.provider,
        });
        const tSwapAcc = await swapSdk.fetchTSwap(tswapPda);
        const [tempPda, tempPdaBump] = findNftTempPDA({ nftMint });
        const destAta = getAssociatedTokenAddressSync(nftMint, bidder, true);
        //prepare 2 pnft account sets
        const [{ meta, creators, ownerTokenRecordBump, ownerTokenRecordPda, destTokenRecordBump: tempDestTokenRecordBump, destTokenRecordPda: tempDestTokenRecordPda, ruleSet, nftEditionPda, authDataSerialized, }, { destTokenRecordBump: destTokenRecordBump, destTokenRecordPda: destTokenRecordPda, },] = await Promise.all([
            prepPnftAccounts({
                connection: this.program.provider.connection,
                metaCreators,
                nftMint,
                destAta: tempPda,
                authData,
                sourceAta: nftSellerAcc,
            }),
            prepPnftAccounts({
                connection: this.program.provider.connection,
                metaCreators,
                nftMint,
                destAta,
                authData,
                sourceAta: tempPda,
            }),
        ]);
        const builder = this.program.methods
            .takeBid(lamports, !!ruleSet, authDataSerialized, optionalRoyaltyPct)
            .accounts({
            nftMint,
            tswap: tswapPda,
            feeVault: tSwapAcc.feeVault,
            bidState,
            bidder,
            nftSellerAcc,
            nftMetadata: meta,
            nftBidderAcc: destAta,
            nftTempAcc: tempPda,
            seller,
            tensorswapProgram: TENSORSWAP_ADDR,
            tokenProgram: TOKEN_PROGRAM_ID,
            associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
            systemProgram: SystemProgram.programId,
            rent: SYSVAR_RENT_PUBKEY,
            nftEdition: nftEditionPda,
            bidderTokenRecord: destTokenRecordPda,
            sellerTokenRecord: ownerTokenRecordPda,
            tempTokenRecord: tempDestTokenRecordPda,
            marginAccount: margin ?? seller,
            authRules: ruleSet ?? SystemProgram.programId,
            takerBroker: takerBroker ?? tSwapAcc.feeVault,
            pnftShared: {
                authorizationRulesProgram: AUTH_PROGRAM_ID,
                tokenMetadataProgram: TMETA_PROGRAM_ID,
                instructions: SYSVAR_INSTRUCTIONS_PUBKEY,
            },
        })
            .remainingAccounts(creators.map((c) => ({
            pubkey: c,
            isWritable: true,
            isSigner: false,
        })));
        return {
            builder,
            tx: {
                ixs: prependComputeIxs([await builder.instruction()], compute, priorityMicroLamports),
                extraSigners: [],
            },
            bidState,
            bidStateBump,
            tswapPda,
            tswapPdaBump,
            tempPda,
            tempPdaBump,
            meta,
            ownerTokenRecordBump,
            ownerTokenRecordPda,
            destTokenRecordBump,
            destTokenRecordPda,
            tempDestTokenRecordBump,
            tempDestTokenRecordPda,
            ruleSet,
            nftEditionPda,
            authDataSerialized,
            nftbidderAcc: destAta,
        };
    }
    async cancelBid({ bidder, nftMint, }) {
        const [bidState, bidStateBump] = findBidStatePda({
            mint: nftMint,
            owner: bidder,
        });
        const builder = this.program.methods.cancelBid().accounts({
            nftMint,
            bidder,
            bidState,
            rent: SYSVAR_RENT_PUBKEY,
            systemProgram: SystemProgram.programId,
        });
        return {
            builder,
            tx: { ixs: [await builder.instruction()], extraSigners: [] },
            bidState,
            bidStateBump,
        };
    }
    async closeExpiredBid({ bidder, nftMint, }) {
        const [bidState, bidStateBump] = findBidStatePda({
            mint: nftMint,
            owner: bidder,
        });
        const builder = this.program.methods.closeExpiredBid().accounts({
            nftMint,
            bidder,
            bidState,
            rent: SYSVAR_RENT_PUBKEY,
            systemProgram: SystemProgram.programId,
        });
        return {
            builder,
            tx: { ixs: [await builder.instruction()], extraSigners: [] },
            bidState,
            bidStateBump,
        };
    }
    // --------------------------------------- helpers
    async getBidStateRent() {
        return await getRent(this.program.provider.connection, this.program.account.bidState);
    }
    getError(name) {
        //@ts-ignore (throwing weird ts errors for me)
        return this.program.idl.errors.find((e) => e.name === name);
    }
    getErrorCodeHex(name) {
        return hexCode(this.getError(name).code);
    }
    // --------------------------------------- parsing raw txs
    /** This only works for the latest IDL. This is intentional: otherwise we'll need to switch/case all historical deprecated ixs downstream. */
    parseIxs(tx) {
        return parseAnchorIxs({
            tx,
            coder: this.coder,
            eventParser: this.eventParser,
            programId: this.program.programId,
        });
    }
    getFeeAmount(ix) {
        switch (ix.ix.name) {
            case "takeBid": {
                const event = ix.events[0].data;
                return event.tswapFee.add(event.creatorsFee);
            }
            case "bid":
            case "cancelBid":
            case "closeExpiredBid":
                return null;
        }
    }
    getSolAmount(ix) {
        switch (ix.ix.name) {
            case "takeBid":
            case "bid":
                return ix.ix.data.lamports;
            case "cancelBid":
            case "closeExpiredBid":
                return null;
        }
    }
    // FYI: accounts under InstructioNDisplay is the space-separated capitalized
    // version of the fields for the corresponding #[Accounts].
    // eg sol_escrow -> "Sol Escrow', or tswap -> "Tswap"
    // shared.sol_escrow -> "Shared > Sol Escrow"
    getAccountByName(ix, name) {
        // We use endsWith since composite nested accounts (eg shared.sol_escrow)
        // will prefix it as "Shared > Sol Escrow"
        return ix.formatted?.accounts.find((acc) => acc.name?.endsWith(name));
    }
}
//# sourceMappingURL=sdk.js.map