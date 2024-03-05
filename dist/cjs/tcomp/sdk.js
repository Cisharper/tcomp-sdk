"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTcompRentPayer = exports.deserializeTcompEvent = exports.TCOMP_DISC_MAP = exports.takeEventSchema = exports.TakeEventRaw = exports.makeEventSchema = exports.TCompSDK = exports.castMetadata = exports.castTokenProgramVersion = exports.castUses = exports.castUseMethod = exports.UseMethodAnchor = exports.castTokenStandard = exports.TokenStandardAnchor = exports.castField = exports.castFieldAnchor = exports.Field = exports.fieldFromU8 = exports.fieldU8 = exports.FieldAnchor = exports.castTarget = exports.castTargetAnchor = exports.Target = exports.targetFromU8 = exports.targetU8 = exports.TargetAnchor = exports.APPROX_LIST_STATE_RENT = exports.APPROX_BID_STATE_RENT = exports.MAX_EXPIRY_SEC = exports.BID_STATE_SIZE = exports.LIST_STATE_SIZE = exports.MAKER_BROKER_PCT = exports.TCOMP_FEE_BPS = exports.CURRENT_TCOMP_VERSION = exports.triageTCompIDL = exports.TCompIDL_latest_EffSlot_Devnet = exports.TCompIDL_latest_EffSlot_Mainnet = exports.TCompIDL_latest = exports.TCompIDL_v0_13_4_EffSlot_Mainnet = exports.TCompIDL_v0_13_4 = exports.TCompIDL_v0_11_0_EffSlot_Mainnet = exports.TCompIDL_v0_11_0 = exports.TCompIDL_v0_6_0_EffSlot_Devnet = exports.TCompIDL_v0_6_0_EffSlot_Mainnet = exports.TCompIDL_v0_6_0 = exports.TCompIDL_v0_4_0_EffSlot_Mainnet = exports.TCompIDL_v0_4_0 = exports.TCompIDL_v0_1_0_EffSlot_Mainnet = exports.TCompIDL_v0_1_0 = void 0;
const anchor_1 = require("@coral-xyz/anchor");
const mpl_bubblegum_1 = require("@metaplex-foundation/mpl-bubblegum");
const spl_account_compression_1 = require("@solana/spl-account-compression");
const spl_token_1 = require("@solana/spl-token");
const web3_js_1 = require("@solana/web3.js");
const tensor_common_1 = require("@tensor-hq/tensor-common");
const tensorswap_sdk_1 = require("@tensor-oss/tensorswap-sdk");
const borsh = __importStar(require("borsh"));
const bs58_1 = __importDefault(require("bs58"));
const token2022_1 = require("../token2022");
const shared_1 = require("../shared");
const constants_1 = require("./constants");
const tcomp_1 = require("./idl/tcomp");
const tcomp_v0_11_0_1 = require("./idl/tcomp_v0_11_0");
const tcomp_v0_13_4_1 = require("./idl/tcomp_v0_13_4");
const tcomp_v0_1_0_1 = require("./idl/tcomp_v0_1_0");
const tcomp_v0_4_0_1 = require("./idl/tcomp_v0_4_0");
const tcomp_v0_6_0_1 = require("./idl/tcomp_v0_6_0");
const pda_1 = require("./pda");
// --------------------------------------- idl
//original deployment
exports.TCompIDL_v0_1_0 = tcomp_v0_1_0_1.IDL;
exports.TCompIDL_v0_1_0_EffSlot_Mainnet = 0;
//add noop ixs to cancel bid/listing https://solscan.io/tx/5fyrggiyFujwfyB624P9WbjVSRtnwee5wzP6CHNRSvg15xAovNAE1FdgPXVDEaZ9x6BKsVpMnEjmLkoCT8ZhSnRU
exports.TCompIDL_v0_4_0 = tcomp_v0_4_0_1.IDL;
exports.TCompIDL_v0_4_0_EffSlot_Mainnet = 195759029;
//add asset id to events
exports.TCompIDL_v0_6_0 = tcomp_v0_6_0_1.IDL;
exports.TCompIDL_v0_6_0_EffSlot_Mainnet = 195759029; // https://solscan.io/tx/4ZrW4gn3wrjvytaycVRWf2gU2UZJVeHpDKDVbE8KVfXWpugTiKZtPsAkuxjwdvCKEnnV8Y8U5MwCCVguRszR6wcV
exports.TCompIDL_v0_6_0_EffSlot_Devnet = 218778608; // https://solscan.io/tx/2JNJPCx6EE8wsh4KZ3y4dyAtM1Q1a94c5iXYLtTpKFvjJFzW7Ct8UmfRu1EAqz3PAWfTCT6HHXRtpP7TwkmXKDG6?cluster=devnet
//add optional cosigner https://solscan.io/tx/2zEnwiJKJq4ckfLGdKD4p8hiMWEFY6qvd5yiW7QpZxAdcBMbCDK8cnxpnNfpU1x8HC7csEurSC4mbHzAKdfr45Yc
exports.TCompIDL_v0_11_0 = tcomp_v0_11_0_1.IDL;
exports.TCompIDL_v0_11_0_EffSlot_Mainnet = 225359236;
//add proof account for legacy take bid https://solscan.io/tx/2MELxB2wAWp3UVaEmktNJeA85vhVhuerfaw7M4hgCx4wjqLrsJ3xQNMgKyypy17MyV8Meem9G5WX1pmoci5XSrK
exports.TCompIDL_v0_13_4 = tcomp_v0_13_4_1.IDL;
exports.TCompIDL_v0_13_4_EffSlot_Mainnet = 225783471;
//add rent payer, gameshift broker, USDC buy
exports.TCompIDL_latest = tcomp_1.IDL;
exports.TCompIDL_latest_EffSlot_Mainnet = 233959124; // https://solscan.io/tx/3t9g4DgnAoF1n2wCNfRBNzo4DSUGoNVmqthNrZw2RR9JqBeaEkondVy8ozqR98Nd6zmXE3TKUK18gF1rkDd5NQUk
exports.TCompIDL_latest_EffSlot_Devnet = 265159305; // https://solscan.io/tx/2V665dcPTaFc4gf18c4wtVb6iXSVP9uGJgpaGc1qyrqziBcHCJSy1pR5zmeb32XkKEXWWjQX8A9WG2ecii6JWGw?cluster=devnet
// Use this function to figure out which IDL to use based on the slot # of historical txs.
const triageTCompIDL = (slot, cluster) => {
    switch (cluster) {
        case tensor_common_1.Cluster.Mainnet:
            if (slot < exports.TCompIDL_v0_1_0_EffSlot_Mainnet)
                return null;
            if (slot < exports.TCompIDL_v0_4_0_EffSlot_Mainnet)
                return exports.TCompIDL_v0_1_0;
            if (slot < exports.TCompIDL_v0_6_0_EffSlot_Mainnet)
                return exports.TCompIDL_v0_4_0;
            if (slot < exports.TCompIDL_v0_11_0_EffSlot_Mainnet)
                return exports.TCompIDL_v0_6_0;
            if (slot < exports.TCompIDL_v0_13_4_EffSlot_Mainnet)
                return exports.TCompIDL_v0_11_0;
            if (slot < exports.TCompIDL_latest_EffSlot_Mainnet)
                return exports.TCompIDL_v0_13_4;
            return exports.TCompIDL_latest;
        case tensor_common_1.Cluster.Devnet:
            if (slot < exports.TCompIDL_v0_6_0_EffSlot_Devnet)
                return null;
            // v0_11_0 and v0_13_4 were skipped
            if (slot < exports.TCompIDL_latest_EffSlot_Devnet)
                return exports.TCompIDL_v0_6_0;
            return exports.TCompIDL_latest;
    }
};
exports.triageTCompIDL = triageTCompIDL;
// --------------------------------------- constants
exports.CURRENT_TCOMP_VERSION = +tcomp_1.IDL.constants.find((c) => c.name === "CURRENT_TCOMP_VERSION").value;
exports.TCOMP_FEE_BPS = +tcomp_1.IDL.constants.find((c) => c.name === "TCOMP_FEE_BPS").value;
exports.MAKER_BROKER_PCT = +tcomp_1.IDL.constants.find((c) => c.name === "MAKER_BROKER_PCT").value;
exports.LIST_STATE_SIZE = (0, shared_1.evalMathExpr)(tcomp_1.IDL.constants.find((c) => c.name === "LIST_STATE_SIZE").value);
exports.BID_STATE_SIZE = (0, shared_1.evalMathExpr)(tcomp_1.IDL.constants.find((c) => c.name === "BID_STATE_SIZE").value);
exports.MAX_EXPIRY_SEC = +tcomp_1.IDL.constants.find((c) => c.name === "MAX_EXPIRY_SEC").value;
exports.APPROX_BID_STATE_RENT = (0, tensor_common_1.getRentSync)(exports.BID_STATE_SIZE);
exports.APPROX_LIST_STATE_RENT = (0, tensor_common_1.getRentSync)(exports.LIST_STATE_SIZE);
// --------------------------------------- types (target)
exports.TargetAnchor = {
    AssetId: { assetId: {} },
    Whitelist: { whitelist: {} },
};
const targetU8 = (target) => {
    const t = {
        assetId: 0,
        whitelist: 1,
    };
    return t[Object.keys(target)[0]];
};
exports.targetU8 = targetU8;
const targetFromU8 = (n) => {
    return Object.values(Target)[n];
};
exports.targetFromU8 = targetFromU8;
var Target;
(function (Target) {
    Target["AssetId"] = "AssetId";
    Target["Whitelist"] = "Whitelist";
})(Target = exports.Target || (exports.Target = {}));
const castTargetAnchor = (target) => ({
    0: Target.AssetId,
    1: Target.Whitelist,
}[(0, exports.targetU8)(target)]);
exports.castTargetAnchor = castTargetAnchor;
const castTarget = (target) => {
    switch (target) {
        case Target.AssetId:
            return exports.TargetAnchor.AssetId;
        case Target.Whitelist:
            return exports.TargetAnchor.Whitelist;
    }
};
exports.castTarget = castTarget;
// --------------------------------------- types (field)
exports.FieldAnchor = {
    Name: { name: {} },
};
const fieldU8 = (target) => {
    const t = {
        name: 0,
    };
    return t[Object.keys(target)[0]];
};
exports.fieldU8 = fieldU8;
const fieldFromU8 = (n) => {
    return Object.values(Field)[n];
};
exports.fieldFromU8 = fieldFromU8;
var Field;
(function (Field) {
    Field["Name"] = "Name";
})(Field = exports.Field || (exports.Field = {}));
const castFieldAnchor = (target) => ({
    0: Field.Name,
}[(0, exports.fieldU8)(target)]);
exports.castFieldAnchor = castFieldAnchor;
const castField = (target) => {
    switch (target) {
        case Field.Name:
            return exports.FieldAnchor.Name;
    }
};
exports.castField = castField;
// --------------------------------------- types (rest)
exports.TokenStandardAnchor = {
    NonFungible: { nonFungible: {} },
    FungibleAsset: { fungibleAsset: {} },
    Fungible: { fungible: {} },
    NonFungibleEdition: { nonFungibleEdition: {} },
};
const castTokenStandard = (t) => {
    if ((0, tensor_common_1.isNullLike)(t))
        return null;
    switch (t) {
        case mpl_bubblegum_1.TokenStandard.Fungible:
            return exports.TokenStandardAnchor.Fungible;
        case mpl_bubblegum_1.TokenStandard.NonFungible:
            return exports.TokenStandardAnchor.NonFungible;
        case mpl_bubblegum_1.TokenStandard.NonFungibleEdition:
            return exports.TokenStandardAnchor.NonFungibleEdition;
        case mpl_bubblegum_1.TokenStandard.FungibleAsset:
            return exports.TokenStandardAnchor.FungibleAsset;
    }
};
exports.castTokenStandard = castTokenStandard;
exports.UseMethodAnchor = {
    Burn: { burn: {} },
    Multiple: { multiple: {} },
    Single: { single: {} },
};
const castUseMethod = (u) => {
    switch (u) {
        case mpl_bubblegum_1.UseMethod.Burn:
            return exports.UseMethodAnchor.Burn;
        case mpl_bubblegum_1.UseMethod.Single:
            return exports.UseMethodAnchor.Single;
        case mpl_bubblegum_1.UseMethod.Multiple:
            return exports.UseMethodAnchor.Multiple;
    }
};
exports.castUseMethod = castUseMethod;
const castUses = (u) => {
    if ((0, tensor_common_1.isNullLike)(u))
        return null;
    return {
        useMethod: (0, exports.castUseMethod)(u.useMethod),
        remaining: new anchor_1.BN(u.remaining),
        total: new anchor_1.BN(u.total),
    };
};
exports.castUses = castUses;
const TokenProgramVersionAnchor = {
    Original: { original: {} },
    Token2022: { token2022: {} },
};
const castTokenProgramVersion = (t) => {
    switch (t) {
        case mpl_bubblegum_1.TokenProgramVersion.Original:
            return TokenProgramVersionAnchor.Original;
        case mpl_bubblegum_1.TokenProgramVersion.Token2022:
            return TokenProgramVersionAnchor.Token2022;
    }
};
exports.castTokenProgramVersion = castTokenProgramVersion;
const castMetadata = (m) => {
    const { creators, ...metaWithoutCreators } = m;
    return {
        ...metaWithoutCreators,
        tokenStandard: (0, exports.castTokenStandard)(m.tokenStandard),
        uses: (0, exports.castUses)(m.uses),
        tokenProgramVersion: (0, exports.castTokenProgramVersion)(m.tokenProgramVersion),
        creatorShares: Buffer.from(creators.map((c) => c.share)),
        creatorVerified: creators.map((c) => c.verified),
    };
};
exports.castMetadata = castMetadata;
// --------------------------------------- sdk
class TCompSDK {
    program;
    discMap;
    coder;
    eventParser;
    constructor({ idl = tcomp_1.IDL, addr = constants_1.TCOMP_ADDR, provider, coder, }) {
        this.program = new anchor_1.Program(idl, addr, provider, coder);
        this.discMap = (0, tensor_common_1.genAcctDiscHexMap)(idl);
        this.coder = new anchor_1.BorshCoder(idl);
        this.eventParser = new anchor_1.EventParser(addr, this.coder);
    }
    // --------------------------------------- fetchers
    async fetchBidState(bidState, commitment) {
        return (await this.program.account.bidState.fetch(bidState, commitment));
    }
    async fetchListState(listState, commitment) {
        return (await this.program.account.listState.fetch(listState, commitment));
    }
    // --------------------------------------- account methods
    decode(acct) {
        if (!acct.owner.equals(this.program.programId))
            return null;
        return (0, tensor_common_1.decodeAnchorAcct)(acct, this.discMap);
    }
    // --------------------------------------- ixs
    async list({ merkleTree, owner, delegate = owner, proof, root, dataHash, creatorsHash, nonce, index, amount, expireInSec = null, currency = null, makerBroker = null, privateTaker = null, rentPayer = null, compute = shared_1.DEFAULT_XFER_COMPUTE_UNITS, priorityMicroLamports = shared_1.DEFAULT_MICRO_LAMPORTS, canopyDepth = 0, delegateSigner, }) {
        nonce = nonce ?? new anchor_1.BN(index);
        const [treeAuthority] = (0, pda_1.findTreeAuthorityPda)({ merkleTree });
        const assetId = (0, tensor_common_1.getLeafAssetId)(merkleTree, nonce);
        const [listState] = (0, pda_1.findListStatePda)({ assetId });
        let proofPath = proof.slice(0, proof.length - canopyDepth).map((b) => ({
            pubkey: new web3_js_1.PublicKey(b),
            isSigner: false,
            isWritable: false,
        }));
        const builder = this.program.methods
            .list(nonce, index, root, [...dataHash], [...creatorsHash], amount, expireInSec, currency, privateTaker, makerBroker)
            .accounts({
            logWrapper: spl_account_compression_1.SPL_NOOP_PROGRAM_ID,
            compressionProgram: spl_account_compression_1.SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
            systemProgram: web3_js_1.SystemProgram.programId,
            bubblegumProgram: tensor_common_1.BUBBLEGUM_PROGRAM_ID,
            tcompProgram: constants_1.TCOMP_ADDR,
            merkleTree,
            treeAuthority,
            delegate,
            owner,
            listState,
            rentPayer: rentPayer ?? owner,
        })
            .remainingAccounts(proofPath);
        //because EITHER of the two has to sign, mark one of them as signer
        const ix = await builder.instruction();
        if (!!delegate && delegateSigner) {
            const i = ix.keys.findIndex((k) => k.pubkey.equals(delegate));
            ix["keys"][i]["isSigner"] = true;
        }
        else {
            const i = ix.keys.findIndex((k) => k.pubkey.equals(owner));
            ix["keys"][i]["isSigner"] = true;
        }
        const ixs = (0, tensor_common_1.prependComputeIxs)([ix], compute, priorityMicroLamports);
        return {
            builder,
            tx: {
                ixs,
                extraSigners: [],
            },
            treeAuthority,
            assetId,
            listState,
            proofPath,
        };
    }
    async edit({ owner, listState, amount, expireInSec = null, currency = null, privateTaker = null, makerBroker = null, 
    // Not a heavy ix, no need
    compute = null, priorityMicroLamports = null, }) {
        const builder = this.program.methods
            .edit(amount, expireInSec, currency, privateTaker, makerBroker)
            .accounts({
            owner,
            listState,
            tcompProgram: constants_1.TCOMP_ADDR,
        });
        const ixs = (0, tensor_common_1.prependComputeIxs)([await builder.instruction()], compute, priorityMicroLamports);
        return {
            builder,
            tx: {
                ixs,
                extraSigners: [],
            },
        };
    }
    async delist({ merkleTree, owner, rentDest, proof, root, dataHash, creatorsHash, nonce, index, compute = shared_1.DEFAULT_XFER_COMPUTE_UNITS, priorityMicroLamports = shared_1.DEFAULT_MICRO_LAMPORTS, canopyDepth = 0, }) {
        nonce = nonce ?? new anchor_1.BN(index);
        const [treeAuthority] = (0, pda_1.findTreeAuthorityPda)({ merkleTree });
        const assetId = (0, tensor_common_1.getLeafAssetId)(merkleTree, nonce);
        const [listState] = (0, pda_1.findListStatePda)({ assetId });
        let proofPath = proof.slice(0, proof.length - canopyDepth).map((b) => ({
            pubkey: new web3_js_1.PublicKey(b),
            isSigner: false,
            isWritable: false,
        }));
        const builder = this.program.methods
            .delist(nonce, index, root, [...dataHash], [...creatorsHash])
            .accounts({
            tcompProgram: constants_1.TCOMP_ADDR,
            logWrapper: spl_account_compression_1.SPL_NOOP_PROGRAM_ID,
            compressionProgram: spl_account_compression_1.SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
            systemProgram: web3_js_1.SystemProgram.programId,
            bubblegumProgram: tensor_common_1.BUBBLEGUM_PROGRAM_ID,
            merkleTree,
            treeAuthority,
            owner,
            rentDest: (0, exports.getTcompRentPayer)({ rentPayer: rentDest, owner }),
            listState,
        })
            .remainingAccounts(proofPath);
        const ixs = (0, tensor_common_1.prependComputeIxs)([await builder.instruction()], compute, priorityMicroLamports);
        return {
            builder,
            tx: {
                ixs,
                extraSigners: [],
            },
            treeAuthority,
            assetId,
            listState,
            proofPath,
        };
    }
    async buy({ merkleTree, proof, root, metaHash, creators, sellerFeeBasisPoints, nonce, index, maxAmount, makerBroker, takerBroker = null, optionalRoyaltyPct = 100, owner, buyer, payer = null, rentDest, compute = shared_1.DEFAULT_XFER_COMPUTE_UNITS, priorityMicroLamports = shared_1.DEFAULT_MICRO_LAMPORTS, canopyDepth = 0, }) {
        nonce = nonce ?? new anchor_1.BN(index);
        const [treeAuthority] = (0, pda_1.findTreeAuthorityPda)({ merkleTree });
        const [tcomp] = (0, pda_1.findTCompPda)({});
        const assetId = (0, tensor_common_1.getLeafAssetId)(merkleTree, nonce);
        const [listState] = (0, pda_1.findListStatePda)({ assetId });
        let creatorsPath = creators.map((c) => ({
            pubkey: c.address,
            isSigner: false,
            isWritable: c.share > 0, // reduces congestion + program creators
        }));
        let proofPath = proof.slice(0, proof.length - canopyDepth).map((b) => ({
            pubkey: new web3_js_1.PublicKey(b),
            isSigner: false,
            isWritable: false,
        }));
        const builder = this.program.methods
            .buy(nonce, index, root, [...metaHash], Buffer.from(creators.map((c) => c.share)), creators.map((c) => c.verified), sellerFeeBasisPoints, maxAmount, optionalRoyaltyPct)
            .accounts({
            logWrapper: spl_account_compression_1.SPL_NOOP_PROGRAM_ID,
            compressionProgram: spl_account_compression_1.SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
            systemProgram: web3_js_1.SystemProgram.programId,
            bubblegumProgram: tensor_common_1.BUBBLEGUM_PROGRAM_ID,
            tcompProgram: constants_1.TCOMP_ADDR,
            merkleTree,
            treeAuthority,
            buyer,
            payer: payer ?? buyer,
            owner,
            rentDest: (0, exports.getTcompRentPayer)({ rentPayer: rentDest, owner }),
            listState,
            tcomp,
            takerBroker,
            makerBroker,
        })
            .remainingAccounts([...creatorsPath, ...proofPath]);
        const ixs = (0, tensor_common_1.prependComputeIxs)([await builder.instruction()], compute, priorityMicroLamports);
        return {
            builder,
            tx: {
                ixs,
                extraSigners: [],
            },
            listState,
            treeAuthority,
            tcomp,
            creators,
            proofPath,
        };
    }
    async buySpl({ merkleTree, proof, root, metaHash, creators, sellerFeeBasisPoints, nonce, index, maxAmount, currency, makerBroker, takerBroker = null, optionalRoyaltyPct = 100, owner, buyer, payer = null, rentPayer = null, rentDest, compute = shared_1.DEFAULT_XFER_COMPUTE_UNITS, priorityMicroLamports = shared_1.DEFAULT_MICRO_LAMPORTS, canopyDepth = 0, }) {
        nonce = nonce ?? new anchor_1.BN(index);
        const [treeAuthority] = (0, pda_1.findTreeAuthorityPda)({ merkleTree });
        const [tcomp] = (0, pda_1.findTCompPda)({});
        const assetId = (0, tensor_common_1.getLeafAssetId)(merkleTree, nonce);
        const [listState] = (0, pda_1.findListStatePda)({ assetId });
        const takerBrokerAta = takerBroker ? (0, shared_1.findAta)(currency, takerBroker) : null;
        const makerBrokerAta = makerBroker ? (0, shared_1.findAta)(currency, makerBroker) : null;
        const tcompAta = (0, shared_1.findAta)(currency, tcomp);
        const payerSource = (0, shared_1.findAta)(currency, payer ?? buyer);
        const ownerDest = (0, shared_1.findAta)(currency, owner);
        let creatorsPath = creators.map((c) => ({
            pubkey: c.address,
            isSigner: false,
            isWritable: c.share > 0, // reduces congestion + program creators
        }));
        let creatorAtasPath = creators.map((c) => ({
            pubkey: (0, shared_1.findAta)(currency, c.address),
            isSigner: false,
            isWritable: true,
        }));
        let proofPath = proof.slice(0, proof.length - canopyDepth).map((b) => ({
            pubkey: new web3_js_1.PublicKey(b),
            isSigner: false,
            isWritable: false,
        }));
        const builder = this.program.methods
            .buySpl(nonce, index, root, [...metaHash], Buffer.from(creators.map((c) => c.share)), creators.map((c) => c.verified), sellerFeeBasisPoints, maxAmount, optionalRoyaltyPct)
            .accounts({
            logWrapper: spl_account_compression_1.SPL_NOOP_PROGRAM_ID,
            compressionProgram: spl_account_compression_1.SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
            systemProgram: web3_js_1.SystemProgram.programId,
            bubblegumProgram: tensor_common_1.BUBBLEGUM_PROGRAM_ID,
            tcompProgram: constants_1.TCOMP_ADDR,
            merkleTree,
            treeAuthority,
            buyer,
            payer: payer ?? buyer,
            payerSource,
            owner,
            ownerDest,
            rentPayer: rentPayer ?? payer ?? buyer,
            rentDest: (0, exports.getTcompRentPayer)({ rentPayer: rentDest, owner }),
            listState,
            tcomp,
            tcompAta,
            currency,
            takerBroker,
            takerBrokerAta,
            makerBroker,
            makerBrokerAta,
        })
            .remainingAccounts([...creatorsPath, ...creatorAtasPath, ...proofPath]);
        const ixs = (0, tensor_common_1.prependComputeIxs)([await builder.instruction()], compute, priorityMicroLamports);
        return {
            builder,
            tx: {
                ixs,
                extraSigners: [],
            },
            listState,
            treeAuthority,
            tcomp,
            creators,
            proofPath,
        };
    }
    async bid({ target, targetId, bidId = targetId, field = null, fieldId = null, quantity = 1, owner, amount, expireInSec = null, currency = null, makerBroker = null, privateTaker = null, compute = shared_1.DEFAULT_COMPUTE_UNITS, priorityMicroLamports = shared_1.DEFAULT_MICRO_LAMPORTS, margin = null, cosigner = null, rentPayer = null, }) {
        const [bidState] = (0, pda_1.findBidStatePda)({ bidId, owner });
        const builder = this.program.methods
            .bid(bidId, (0, exports.castTarget)(target), targetId, field ? (0, exports.castField)(field) : null, fieldId, amount, quantity, expireInSec, currency, privateTaker, makerBroker)
            .accounts({
            owner,
            systemProgram: web3_js_1.SystemProgram.programId,
            tcompProgram: constants_1.TCOMP_ADDR,
            bidState,
            marginAccount: margin ?? owner,
            cosigner: cosigner ?? owner,
            rentPayer: rentPayer ?? owner,
        });
        const ixs = (0, tensor_common_1.prependComputeIxs)([await builder.instruction()], compute, priorityMicroLamports);
        return {
            builder,
            tx: {
                ixs,
                extraSigners: [],
            },
            bidState,
        };
    }
    async cancelBid({ bidId, owner, rentDest, compute = null, priorityMicroLamports = null, }) {
        const [bidState] = (0, pda_1.findBidStatePda)({ bidId, owner });
        const builder = this.program.methods.cancelBid().accounts({
            tcompProgram: constants_1.TCOMP_ADDR,
            owner,
            rentDest: (0, exports.getTcompRentPayer)({ rentPayer: rentDest, owner }),
            systemProgram: web3_js_1.SystemProgram.programId,
            bidState,
        });
        const ixs = (0, tensor_common_1.prependComputeIxs)([await builder.instruction()], compute, priorityMicroLamports);
        return {
            builder,
            tx: {
                ixs,
                extraSigners: [],
            },
            bidState,
        };
    }
    async closeExpiredBid({ bidId, owner, rentDest, compute = null, priorityMicroLamports = null, }) {
        const [bidState] = (0, pda_1.findBidStatePda)({ bidId, owner });
        const builder = this.program.methods.closeExpiredBid().accounts({
            tcompProgram: constants_1.TCOMP_ADDR,
            owner,
            systemProgram: web3_js_1.SystemProgram.programId,
            bidState,
            rentDest: (0, exports.getTcompRentPayer)({ rentPayer: rentDest, owner }),
        });
        const ixs = (0, tensor_common_1.prependComputeIxs)([await builder.instruction()], compute, priorityMicroLamports);
        return {
            builder,
            tx: {
                ixs,
                extraSigners: [],
            },
            bidState,
        };
    }
    async closeExpiredListing({ merkleTree, owner, rentDest, proof, root, dataHash, creatorsHash, nonce, index, compute = shared_1.DEFAULT_XFER_COMPUTE_UNITS, priorityMicroLamports = shared_1.DEFAULT_MICRO_LAMPORTS, canopyDepth = 0, }) {
        nonce = nonce ?? new anchor_1.BN(index);
        const [treeAuthority] = (0, pda_1.findTreeAuthorityPda)({ merkleTree });
        const assetId = (0, tensor_common_1.getLeafAssetId)(merkleTree, nonce);
        const [listState] = (0, pda_1.findListStatePda)({ assetId });
        let proofPath = proof.slice(0, proof.length - canopyDepth).map((b) => ({
            pubkey: new web3_js_1.PublicKey(b),
            isSigner: false,
            isWritable: false,
        }));
        const builder = this.program.methods
            .closeExpiredListing(nonce, index, root, [...dataHash], [...creatorsHash])
            .accounts({
            tcompProgram: constants_1.TCOMP_ADDR,
            logWrapper: spl_account_compression_1.SPL_NOOP_PROGRAM_ID,
            compressionProgram: spl_account_compression_1.SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
            systemProgram: web3_js_1.SystemProgram.programId,
            bubblegumProgram: tensor_common_1.BUBBLEGUM_PROGRAM_ID,
            merkleTree,
            treeAuthority,
            owner,
            listState,
            rentDest: (0, exports.getTcompRentPayer)({ rentPayer: rentDest, owner }),
        })
            .remainingAccounts(proofPath);
        const ixs = (0, tensor_common_1.prependComputeIxs)([await builder.instruction()], compute, priorityMicroLamports);
        return {
            builder,
            tx: {
                ixs,
                extraSigners: [],
            },
            treeAuthority,
            assetId,
            listState,
            proofPath,
        };
    }
    async takeBid({ targetData, bidId, merkleTree, proof, root, nonce, index, minAmount, currency = null, makerBroker, takerBroker = null, optionalRoyaltyPct = 100, owner, rentDest, seller, delegate = seller, margin = null, compute = shared_1.DEFAULT_XFER_COMPUTE_UNITS, priorityMicroLamports = shared_1.DEFAULT_MICRO_LAMPORTS, canopyDepth = 0, whitelist = null, delegateSigner, cosigner = null, }) {
        nonce = nonce ?? new anchor_1.BN(index);
        const creators = targetData.target === "rest"
            ? targetData.data.metadata.creators
            : targetData.data.creators;
        const [treeAuthority] = (0, pda_1.findTreeAuthorityPda)({ merkleTree });
        const [tcomp] = (0, pda_1.findTCompPda)({});
        const [bidState] = (0, pda_1.findBidStatePda)({ bidId, owner });
        let creatorsPath = creators.map((c) => ({
            pubkey: c.address,
            isSigner: false,
            isWritable: c.share > 0, // reduces congestion + program creators
        }));
        let proofPath = proof.slice(0, proof.length - canopyDepth).map((b) => ({
            pubkey: new web3_js_1.PublicKey(b),
            isSigner: false,
            isWritable: false,
        }));
        const accounts = {
            logWrapper: spl_account_compression_1.SPL_NOOP_PROGRAM_ID,
            compressionProgram: spl_account_compression_1.SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
            systemProgram: web3_js_1.SystemProgram.programId,
            bubblegumProgram: tensor_common_1.BUBBLEGUM_PROGRAM_ID,
            tcompProgram: constants_1.TCOMP_ADDR,
            merkleTree,
            treeAuthority,
            seller,
            owner,
            rentDest: (0, exports.getTcompRentPayer)({ rentPayer: rentDest, owner }),
            bidState,
            tcomp,
            takerBroker,
            makerBroker,
            delegate: delegate,
            marginAccount: margin ?? seller,
            tensorswapProgram: tensor_common_1.TSWAP_PROGRAM_ID,
            whitelist: whitelist ?? tensor_common_1.TSWAP_PROGRAM_ID,
            cosigner: cosigner ?? delegate ?? seller,
        };
        const remAccounts = [...creatorsPath, ...proofPath];
        let builder;
        if (targetData.target === "assetIdOrFvcWithoutField") {
            // preferred branch
            builder = this.program.methods
                .takeBidMetaHash(nonce, index, root, [...targetData.data.metaHash], Buffer.from(creators.map((c) => c.share)), creators.map((c) => c.verified), targetData.data.sellerFeeBasisPoints, minAmount, optionalRoyaltyPct)
                .accounts(accounts)
                .remainingAccounts(remAccounts);
        }
        else {
            //VOC + name
            builder = this.program.methods
                .takeBidFullMeta(nonce, index, root, (0, exports.castMetadata)(targetData.data.metadata), minAmount, optionalRoyaltyPct)
                .accounts(accounts)
                .remainingAccounts(remAccounts);
        }
        //because EITHER of the two has to sign, mark one of them as signer
        const ix = await builder.instruction();
        if (!!delegate && delegateSigner) {
            const i = ix.keys.findIndex((k) => k.pubkey.equals(delegate));
            ix["keys"][i]["isSigner"] = true;
        }
        else {
            const i = ix.keys.findIndex((k) => k.pubkey.equals(seller));
            ix["keys"][i]["isSigner"] = true;
        }
        const ixs = (0, tensor_common_1.prependComputeIxs)([ix], compute, priorityMicroLamports);
        return {
            builder,
            tx: {
                ixs,
                extraSigners: [],
            },
            bidState,
            treeAuthority,
            tcomp,
            creators,
            proofPath,
        };
    }
    async takeBidLegacy({ bidId, nftMint, nftSellerAcc, owner, rentDest, seller, minAmount, tokenProgram, currency = null, makerBroker, takerBroker = null, optionalRoyaltyPct = 100, margin = null, whitelist = null, 
    /** pnft args */
    meta, authData = null, compute = 800000, // pnfts are expensive
    ruleSetAddnCompute = shared_1.DEFAULT_RULESET_ADDN_COMPUTE_UNITS, priorityMicroLamports = shared_1.DEFAULT_MICRO_LAMPORTS, cosigner = null, }) {
        const [tcomp] = (0, pda_1.findTCompPda)({});
        const ownerAtaAcc = (0, shared_1.findAta)(nftMint, owner);
        const nftMetadata = (0, tensor_common_1.findMetadataPda)(nftMint)[0];
        const [bidState] = (0, pda_1.findBidStatePda)({ bidId, owner });
        const [escrowPda] = (0, pda_1.findNftEscrowPda)({ nftMint });
        const mintProofPda = whitelist
            ? (0, tensorswap_sdk_1.findMintProofPDA)({ mint: nftMint, whitelist })[0]
            : web3_js_1.SystemProgram.programId;
        //prepare 2 pnft account sets
        const { meta: newMeta, creators, ownerTokenRecordPda, destTokenRecordPda: escrowDestTokenRecordPda, ruleSet, nftEditionPda, authDataSerialized, } = await (0, tensor_common_1.prepPnftAccounts)({
            connection: this.program.provider.connection,
            meta,
            nftMint,
            destAta: escrowPda,
            authData,
            sourceAta: nftSellerAcc,
        });
        meta = newMeta;
        const [destTokenRecord] = (0, tensor_common_1.findTokenRecordPda)(nftMint, ownerAtaAcc);
        const builder = this.program.methods
            .takeBidLegacy(minAmount, optionalRoyaltyPct, !!ruleSet, authDataSerialized)
            .accounts({
            tcomp,
            seller,
            bidState,
            owner,
            rentDest: (0, exports.getTcompRentPayer)({ rentPayer: rentDest, owner }),
            takerBroker,
            makerBroker,
            marginAccount: margin ?? seller,
            whitelist: whitelist ?? tensor_common_1.TSWAP_PROGRAM_ID,
            nftSellerAcc,
            nftMint,
            nftMetadata,
            ownerAtaAcc,
            nftEdition: nftEditionPda,
            ownerTokenRecord: ownerTokenRecordPda,
            destTokenRecord: destTokenRecord,
            pnftShared: {
                authorizationRulesProgram: tensor_common_1.AUTH_PROGRAM_ID,
                tokenMetadataProgram: tensor_common_1.TMETA_PROGRAM_ID,
                instructions: web3_js_1.SYSVAR_INSTRUCTIONS_PUBKEY,
            },
            nftEscrow: escrowPda,
            tempEscrowTokenRecord: escrowDestTokenRecordPda,
            authRules: ruleSet ?? web3_js_1.SystemProgram.programId,
            tokenProgram,
            associatedTokenProgram: spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID,
            systemProgram: web3_js_1.SystemProgram.programId,
            tcompProgram: constants_1.TCOMP_ADDR,
            tensorswapProgram: tensor_common_1.TSWAP_PROGRAM_ID,
            cosigner: cosigner ?? seller,
            mintProof: mintProofPda,
        })
            .remainingAccounts(creators.map((c) => ({
            pubkey: c.address,
            isSigner: false,
            isWritable: c.share > 0, // reduces congestion + program creators
        })));
        const ix = await builder.instruction();
        const ruleSetCompute = ruleSet ? ruleSetAddnCompute : null;
        const ixs = (0, tensor_common_1.prependComputeIxs)([ix], (0, tensor_common_1.isNullLike)(compute) && (0, tensor_common_1.isNullLike)(ruleSetCompute)
            ? null
            : (compute ?? 0) + (ruleSetCompute ?? 0), priorityMicroLamports);
        return {
            builder,
            tx: {
                ixs,
                extraSigners: [],
            },
            bidState,
            tcomp,
            creators,
            ownerAtaAcc,
        };
    }
    async withdrawFees({ lamports, destination, owner = tensor_common_1.TSWAP_OWNER, cosigner = tensor_common_1.TSWAP_COSIGNER, }) {
        const tswap = (0, tensorswap_sdk_1.findTSwapPDA)({})[0];
        const tcomp = (0, pda_1.findTCompPda)({})[0];
        const builder = this.program.methods.withdrawFees(lamports).accounts({
            tswap,
            tcomp,
            cosigner,
            owner,
            destination,
            systemProgram: web3_js_1.SystemProgram.programId,
        });
        const ix = await builder.instruction();
        return {
            builder,
            tx: {
                ixs: [ix],
                extraSigners: [],
            },
        };
    }
    async takeBidT22({ bidId, nftMint, nftSellerAcc, owner, rentDest, seller, minAmount, currency = null, makerBroker, takerBroker = null, margin = null, whitelist = null, compute = 800000, // pnfts are expensive
    priorityMicroLamports = shared_1.DEFAULT_MICRO_LAMPORTS, cosigner = null, }) {
        const [tcomp] = (0, pda_1.findTCompPda)({});
        const ownerAtaAcc = (0, shared_1.findAtaWithProgramId)(nftMint, owner, spl_token_1.TOKEN_2022_PROGRAM_ID);
        const [bidState] = (0, pda_1.findBidStatePda)({ bidId, owner });
        const mintProofPda = whitelist
            ? (0, tensorswap_sdk_1.findMintProofPDA)({ mint: nftMint, whitelist })[0]
            : web3_js_1.SystemProgram.programId;
        const builder = this.program.methods.takeBidT22(minAmount).accounts({
            tcomp,
            seller,
            bidState,
            owner,
            rentDest: (0, exports.getTcompRentPayer)({ rentPayer: rentDest, owner }),
            takerBroker,
            makerBroker,
            marginAccount: margin ?? seller,
            whitelist: whitelist ?? tensor_common_1.TSWAP_PROGRAM_ID,
            nftSellerAcc,
            nftMint,
            ownerAtaAcc,
            tokenProgram: spl_token_1.TOKEN_2022_PROGRAM_ID,
            associatedTokenProgram: spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID,
            systemProgram: web3_js_1.SystemProgram.programId,
            tcompProgram: constants_1.TCOMP_ADDR,
            tensorswapProgram: tensor_common_1.TSWAP_PROGRAM_ID,
            cosigner: cosigner ?? seller,
            mintProof: mintProofPda,
        });
        const ix = await builder.instruction();
        const ixs = (0, tensor_common_1.prependComputeIxs)([ix], (0, tensor_common_1.isNullLike)(compute) ? null : compute ?? 0, priorityMicroLamports);
        return {
            builder,
            tx: {
                ixs,
                extraSigners: [],
            },
            bidState,
            tcomp,
            ownerAtaAcc,
        };
    }
    async takeBidWns({ bidId, nftMint, nftSellerAcc, owner, rentDest, seller, minAmount, collectionMint, currency = null, makerBroker, takerBroker = null, margin = null, whitelist = null, compute = 800000, // pnfts are expensive
    priorityMicroLamports = shared_1.DEFAULT_MICRO_LAMPORTS, cosigner = null, }) {
        const [tcomp] = (0, pda_1.findTCompPda)({});
        const ownerAtaAcc = (0, shared_1.findAtaWithProgramId)(nftMint, owner, spl_token_1.TOKEN_2022_PROGRAM_ID);
        const [bidState] = (0, pda_1.findBidStatePda)({ bidId, owner });
        const mintProofPda = whitelist
            ? (0, tensorswap_sdk_1.findMintProofPDA)({ mint: nftMint, whitelist })[0]
            : web3_js_1.SystemProgram.programId;
        const approveAccount = (0, token2022_1.getApprovalAccount)(nftMint);
        const distribution = (0, token2022_1.getDistributionAccount)(collectionMint);
        const extraMetas = (0, spl_token_1.getExtraAccountMetaAddress)(nftMint, token2022_1.WNS_PROGRAM_ID);
        const builder = this.program.methods.takeBidWns(minAmount).accounts({
            tcomp,
            seller,
            bidState,
            owner,
            rentDest: (0, exports.getTcompRentPayer)({ rentPayer: rentDest, owner }),
            takerBroker,
            makerBroker,
            marginAccount: margin ?? seller,
            whitelist: whitelist ?? tensor_common_1.TSWAP_PROGRAM_ID,
            nftSellerAcc,
            nftMint,
            ownerAtaAcc,
            tokenProgram: spl_token_1.TOKEN_2022_PROGRAM_ID,
            associatedTokenProgram: spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID,
            systemProgram: web3_js_1.SystemProgram.programId,
            tcompProgram: constants_1.TCOMP_ADDR,
            tensorswapProgram: tensor_common_1.TSWAP_PROGRAM_ID,
            cosigner: cosigner ?? seller,
            mintProof: mintProofPda,
            approveAccount,
            distribution,
            distributionProgram: token2022_1.WNS_DISTRIBUTION_PROGRAM_ID,
            wnsProgram: token2022_1.WNS_PROGRAM_ID,
            extraMetas,
        });
        const ix = await builder.instruction();
        const ixs = (0, tensor_common_1.prependComputeIxs)([ix], (0, tensor_common_1.isNullLike)(compute) ? null : compute ?? 0, priorityMicroLamports);
        return {
            builder,
            tx: {
                ixs,
                extraSigners: [],
            },
            bidState,
            tcomp,
            ownerAtaAcc,
        };
    }
    // --------------------------------------- helpers
    async getBidStateRent() {
        return await (0, tensor_common_1.getRent)(this.program.provider.connection, this.program.account.bidState);
    }
    async getListStateRent() {
        return await (0, tensor_common_1.getRent)(this.program.provider.connection, this.program.account.listState);
    }
    getError(name) {
        //@ts-ignore (throwing weird ts errors for me)
        return this.program.idl.errors.find((e) => e.name === name);
    }
    getErrorCodeHex(name) {
        return (0, tensor_common_1.hexCode)(this.getError(name).code);
    }
    // --------------------------------------- parsing raw txs
    parseIxs(tx) {
        return (0, tensor_common_1.parseAnchorIxs)({
            coder: this.coder,
            tx,
            programId: this.program.programId,
            noopIxDiscHex: exports.TCOMP_DISC_MAP.tcompNoop,
        });
    }
    getEvent(ix) {
        if (!ix.noopIxs?.length)
            return null;
        const cpiData = Buffer.from(bs58_1.default.decode(ix.noopIxs[0].data));
        return deserializeTcompEvent(cpiData);
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
exports.TCompSDK = TCompSDK;
class MakeEventRaw {
    maker;
    bidId;
    target;
    targetId;
    field;
    fieldId;
    amount;
    quantity;
    currency;
    expiry;
    privateTaker;
    assetId;
    constructor(fields) {
        Object.assign(this, fields);
    }
}
exports.makeEventSchema = new Map([
    [
        MakeEventRaw,
        {
            kind: "struct",
            fields: [
                ["maker", [32]],
                ["bidId", { kind: "option", type: [32] }],
                ["target", "u8"],
                ["targetId", [32]],
                ["field", { kind: "option", type: "u8" }],
                ["fieldId", { kind: "option", type: [32] }],
                ["amount", "u64"],
                ["quantity", "u32"],
                ["currency", { kind: "option", type: [32] }],
                ["expiry", "u64"],
                ["privateTaker", { kind: "option", type: [32] }],
                ["assetId", { kind: "option", type: [32] }],
            ],
        },
    ],
]);
class TakeEventRaw {
    taker;
    bidId;
    target;
    targetId;
    field;
    fieldId;
    amount;
    quantity;
    tcompFee;
    takerBrokerFee;
    makerBrokerFee;
    creatorFee;
    currency;
    assetId;
    constructor(fields) {
        Object.assign(this, fields);
    }
}
exports.TakeEventRaw = TakeEventRaw;
exports.takeEventSchema = new Map([
    [
        TakeEventRaw,
        {
            kind: "struct",
            fields: [
                ["taker", [32]],
                ["bidId", { kind: "option", type: [32] }],
                ["target", "u8"],
                ["targetId", [32]],
                ["field", { kind: "option", type: "u8" }],
                ["fieldId", { kind: "option", type: [32] }],
                ["amount", "u64"],
                ["quantity", "u32"],
                ["tcompFee", "u64"],
                ["takerBrokerFee", "u64"],
                ["makerBrokerFee", "u64"],
                ["creatorFee", "u64"],
                ["currency", { kind: "option", type: [32] }],
                ["assetId", { kind: "option", type: [32] }],
            ],
        },
    ],
]);
// This map serves 2 purposes:
// 1) lists discriminators (in hex) for each ix
// 2) lists whether an ix calls NOOP. This is needed for ETL parsing where we match ix # with noop #
// Intentionally made it a dict so that we don't forget an ix
exports.TCOMP_DISC_MAP = (0, tensor_common_1.genIxDiscHexMap)(tcomp_1.IDL);
function deserializeTcompEvent(data) {
    if (data.subarray(0, 8).toString("hex") !== exports.TCOMP_DISC_MAP.tcompNoop) {
        throw new Error("not tcomp noop buffer data");
    }
    // cut off anchor discriminator
    data = data.subarray(8, data.length);
    if (data[0] === 0) {
        // console.log("🟩 Maker event detected", data.length - 64);
        const e = borsh.deserialize(exports.makeEventSchema, MakeEventRaw, data.subarray(1, data.length));
        const typedEvent = {
            type: "maker",
            maker: new web3_js_1.PublicKey(e.maker),
            bidId: e.bidId ? new web3_js_1.PublicKey(e.bidId) : null,
            target: (0, exports.targetFromU8)(e.target),
            targetId: new web3_js_1.PublicKey(e.targetId),
            field: !(0, tensor_common_1.isNullLike)(e.field) ? (0, exports.fieldFromU8)(e.field) : null,
            fieldId: e.fieldId ? new web3_js_1.PublicKey(e.fieldId) : null,
            amount: new anchor_1.BN(e.amount),
            quantity: e.quantity,
            currency: e.currency ? new web3_js_1.PublicKey(e.currency) : null,
            expiry: new anchor_1.BN(e.expiry),
            privateTaker: e.privateTaker ? new web3_js_1.PublicKey(e.privateTaker) : null,
            assetId: e.assetId ? new web3_js_1.PublicKey(e.assetId) : null,
        };
        return typedEvent;
    }
    else if (data[0] === 1) {
        // console.log("🟥 Taker event detected", data.length - 64);
        const e = borsh.deserialize(exports.takeEventSchema, TakeEventRaw, data.subarray(1, data.length));
        const typedEvent = {
            type: "taker",
            taker: new web3_js_1.PublicKey(e.taker),
            bidId: e.bidId ? new web3_js_1.PublicKey(e.bidId) : null,
            target: (0, exports.targetFromU8)(e.target),
            targetId: new web3_js_1.PublicKey(e.targetId),
            field: !(0, tensor_common_1.isNullLike)(e.field) ? (0, exports.fieldFromU8)(e.field) : null,
            fieldId: e.fieldId ? new web3_js_1.PublicKey(e.fieldId) : null,
            amount: new anchor_1.BN(e.amount),
            quantity: e.quantity,
            tcompFee: new anchor_1.BN(e.tcompFee),
            creatorFee: new anchor_1.BN(e.creatorFee),
            takerBrokerFee: new anchor_1.BN(e.takerBrokerFee),
            makerBrokerFee: new anchor_1.BN(e.makerBrokerFee),
            currency: e.currency ? new web3_js_1.PublicKey(e.currency) : null,
            assetId: e.assetId ? new web3_js_1.PublicKey(e.assetId) : null,
        };
        return typedEvent;
    }
    else {
        throw new Error("unknown event");
    }
}
exports.deserializeTcompEvent = deserializeTcompEvent;
//(!!) sync with state.rs:get_rent_payer()
const getTcompRentPayer = ({ rentPayer, owner, }) => {
    if (!rentPayer.equals(web3_js_1.PublicKey.default)) {
        return rentPayer;
    }
    else {
        return owner;
    }
};
exports.getTcompRentPayer = getTcompRentPayer;
//# sourceMappingURL=sdk.js.map