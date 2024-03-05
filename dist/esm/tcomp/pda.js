import { PublicKey } from "@solana/web3.js";
import { BUBBLEGUM_PROGRAM_ID } from "@tensor-hq/tensor-common";
import { TCOMP_ADDR } from "./constants";
export const findTCompPda = ({ program }) => {
    return PublicKey.findProgramAddressSync([], program ?? TCOMP_ADDR);
};
export const findBidStatePda = ({ program, bidId, owner, }) => {
    return PublicKey.findProgramAddressSync([Buffer.from("bid_state"), owner.toBytes(), bidId.toBytes()], program ?? TCOMP_ADDR);
};
export const findListStatePda = ({ program, assetId, }) => {
    return PublicKey.findProgramAddressSync([Buffer.from("list_state"), assetId.toBytes()], program ?? TCOMP_ADDR);
};
export const findNftEscrowPda = ({ program, nftMint, }) => {
    return PublicKey.findProgramAddressSync([Buffer.from("nft_escrow"), nftMint.toBytes()], program ?? TCOMP_ADDR);
};
export const findTreeAuthorityPda = ({ merkleTree, }) => {
    return PublicKey.findProgramAddressSync([merkleTree.toBytes()], BUBBLEGUM_PROGRAM_ID);
};
export const findMintAuthorityPda = ({ mint }) => {
    return PublicKey.findProgramAddressSync([mint.toBytes()], BUBBLEGUM_PROGRAM_ID);
};
//# sourceMappingURL=pda.js.map