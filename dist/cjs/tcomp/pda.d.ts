import { PublicKey } from "@solana/web3.js";
export declare const findTCompPda: ({ program }: {
    program?: PublicKey | undefined;
}) => [PublicKey, number];
export declare const findBidStatePda: ({ program, bidId, owner, }: {
    program?: PublicKey | undefined;
    bidId: PublicKey;
    owner: PublicKey;
}) => [PublicKey, number];
export declare const findListStatePda: ({ program, assetId, }: {
    program?: PublicKey | undefined;
    assetId: PublicKey;
}) => [PublicKey, number];
export declare const findNftEscrowPda: ({ program, nftMint, }: {
    program?: PublicKey | undefined;
    nftMint: PublicKey;
}) => [PublicKey, number];
export declare const findTreeAuthorityPda: ({ merkleTree, }: {
    merkleTree: PublicKey;
}) => [PublicKey, number];
export declare const findMintAuthorityPda: ({ mint }: {
    mint: PublicKey;
}) => [PublicKey, number];
//# sourceMappingURL=pda.d.ts.map