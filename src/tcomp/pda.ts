import { PublicKey } from "@solana/web3.js";
import { TCOMP_ADDR } from "./constants";
import { BUBBLEGUM_PROGRAM_ID } from "./sdk";

export const findTCompPda = ({ program }: { program?: PublicKey }) => {
  return PublicKey.findProgramAddressSync([], program ?? TCOMP_ADDR);
};

export const findBidStatePda = ({
  program,
  bidId,
  owner,
}: {
  program?: PublicKey;
  // If you want stackable bids use a random pubkey, if you want replaceable bids use targetId
  bidId: PublicKey;
  owner: PublicKey;
}) => {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("bid_state"), owner.toBytes(), bidId.toBytes()],
    program ?? TCOMP_ADDR
  );
};

export const findListStatePda = ({
  program,
  assetId,
}: {
  program?: PublicKey;
  assetId: PublicKey;
}) => {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("list_state"), assetId.toBytes()],
    program ?? TCOMP_ADDR
  );
};

export const findTreeAuthorityPda = ({
  merkleTree,
}: {
  merkleTree: PublicKey;
}) => {
  return PublicKey.findProgramAddressSync(
    [merkleTree.toBytes()],
    BUBBLEGUM_PROGRAM_ID
  );
};
