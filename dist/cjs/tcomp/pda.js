"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findMintAuthorityPda = exports.findTreeAuthorityPda = exports.findNftEscrowPda = exports.findListStatePda = exports.findBidStatePda = exports.findTCompPda = void 0;
const web3_js_1 = require("@solana/web3.js");
const tensor_common_1 = require("@tensor-hq/tensor-common");
const constants_1 = require("./constants");
const findTCompPda = ({ program }) => {
    return web3_js_1.PublicKey.findProgramAddressSync([], program ?? constants_1.TCOMP_ADDR);
};
exports.findTCompPda = findTCompPda;
const findBidStatePda = ({ program, bidId, owner, }) => {
    return web3_js_1.PublicKey.findProgramAddressSync([Buffer.from("bid_state"), owner.toBytes(), bidId.toBytes()], program ?? constants_1.TCOMP_ADDR);
};
exports.findBidStatePda = findBidStatePda;
const findListStatePda = ({ program, assetId, }) => {
    return web3_js_1.PublicKey.findProgramAddressSync([Buffer.from("list_state"), assetId.toBytes()], program ?? constants_1.TCOMP_ADDR);
};
exports.findListStatePda = findListStatePda;
const findNftEscrowPda = ({ program, nftMint, }) => {
    return web3_js_1.PublicKey.findProgramAddressSync([Buffer.from("nft_escrow"), nftMint.toBytes()], program ?? constants_1.TCOMP_ADDR);
};
exports.findNftEscrowPda = findNftEscrowPda;
const findTreeAuthorityPda = ({ merkleTree, }) => {
    return web3_js_1.PublicKey.findProgramAddressSync([merkleTree.toBytes()], tensor_common_1.BUBBLEGUM_PROGRAM_ID);
};
exports.findTreeAuthorityPda = findTreeAuthorityPda;
const findMintAuthorityPda = ({ mint }) => {
    return web3_js_1.PublicKey.findProgramAddressSync([mint.toBytes()], tensor_common_1.BUBBLEGUM_PROGRAM_ID);
};
exports.findMintAuthorityPda = findMintAuthorityPda;
//# sourceMappingURL=pda.js.map