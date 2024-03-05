/// <reference types="bn.js" />
/// <reference types="node" />
import { BN, BorshCoder, Coder, EventParser, Instruction, Program, Provider } from "@coral-xyz/anchor";
import { MetadataArgs, TokenProgramVersion, TokenStandard, UseMethod } from "@metaplex-foundation/mpl-bubblegum";
import { Creator, Uses } from "@metaplex-foundation/mpl-token-metadata";
import { AccountInfo, Commitment, PublicKey, TransactionInstruction, TransactionResponse } from "@solana/web3.js";
import { AcctDiscHexMap, Cluster, ParsedAnchorIx, PnftArgs } from "@tensor-hq/tensor-common";
import { AccountSuffix } from "../shared";
import { ParsedAccount } from "../types";
import { IDL as IDL_latest, Tcomp as TComp_latest } from "./idl/tcomp";
import { Tcomp as TComp_v0_11_0 } from "./idl/tcomp_v0_11_0";
import { Tcomp as Tcomp_v0_13_4 } from "./idl/tcomp_v0_13_4";
import { Tcomp as TComp_v0_1_0 } from "./idl/tcomp_v0_1_0";
import { Tcomp as TComp_v0_4_0 } from "./idl/tcomp_v0_4_0";
import { Tcomp as TComp_v0_6_0 } from "./idl/tcomp_v0_6_0";
export declare const TCompIDL_v0_1_0: TComp_v0_1_0;
export declare const TCompIDL_v0_1_0_EffSlot_Mainnet = 0;
export declare const TCompIDL_v0_4_0: TComp_v0_4_0;
export declare const TCompIDL_v0_4_0_EffSlot_Mainnet = 195759029;
export declare const TCompIDL_v0_6_0: TComp_v0_6_0;
export declare const TCompIDL_v0_6_0_EffSlot_Mainnet = 195759029;
export declare const TCompIDL_v0_6_0_EffSlot_Devnet = 218778608;
export declare const TCompIDL_v0_11_0: TComp_v0_11_0;
export declare const TCompIDL_v0_11_0_EffSlot_Mainnet = 225359236;
export declare const TCompIDL_v0_13_4: Tcomp_v0_13_4;
export declare const TCompIDL_v0_13_4_EffSlot_Mainnet = 225783471;
export declare const TCompIDL_latest: TComp_latest;
export declare const TCompIDL_latest_EffSlot_Mainnet = 233959124;
export declare const TCompIDL_latest_EffSlot_Devnet = 265159305;
export type TcompIDL = TComp_v0_1_0 | TComp_v0_4_0 | TComp_v0_6_0 | TComp_v0_11_0 | Tcomp_v0_13_4 | TComp_latest;
export declare const triageTCompIDL: (slot: number | bigint, cluster: Cluster) => TcompIDL | null;
export type ParsedTCompIx = ParsedAnchorIx<TcompIDL>;
export declare const CURRENT_TCOMP_VERSION: number;
export declare const TCOMP_FEE_BPS: number;
export declare const MAKER_BROKER_PCT: number;
export declare const LIST_STATE_SIZE: number;
export declare const BID_STATE_SIZE: number;
export declare const MAX_EXPIRY_SEC: number;
export declare const APPROX_BID_STATE_RENT: number;
export declare const APPROX_LIST_STATE_RENT: number;
export declare const TargetAnchor: {
    AssetId: {
        assetId: {};
    };
    Whitelist: {
        whitelist: {};
    };
};
type TargetAnchor = (typeof TargetAnchor)[keyof typeof TargetAnchor];
export declare const targetU8: (target: TargetAnchor) => 0 | 1;
export declare const targetFromU8: (n: number) => Target;
export declare enum Target {
    AssetId = "AssetId",
    Whitelist = "Whitelist"
}
export declare const castTargetAnchor: (target: TargetAnchor) => Target;
export declare const castTarget: (target: Target) => TargetAnchor;
export declare const FieldAnchor: {
    Name: {
        name: {};
    };
};
type FieldAnchor = (typeof FieldAnchor)[keyof typeof FieldAnchor];
export declare const fieldU8: (target: FieldAnchor) => 0;
export declare const fieldFromU8: (n: number) => Field;
export declare enum Field {
    Name = "Name"
}
export declare const castFieldAnchor: (target: FieldAnchor) => Field;
export declare const castField: (target: Field) => FieldAnchor;
export declare const TokenStandardAnchor: {
    NonFungible: {
        nonFungible: {};
    };
    FungibleAsset: {
        fungibleAsset: {};
    };
    Fungible: {
        fungible: {};
    };
    NonFungibleEdition: {
        nonFungibleEdition: {};
    };
};
export type TokenStandardAnchor = (typeof TokenStandardAnchor)[keyof typeof TokenStandardAnchor];
export declare const castTokenStandard: (t: TokenStandard | null) => TokenStandardAnchor | null;
export declare const UseMethodAnchor: {
    Burn: {
        burn: {};
    };
    Multiple: {
        multiple: {};
    };
    Single: {
        single: {};
    };
};
export type UseMethodAnchor = (typeof UseMethodAnchor)[keyof typeof UseMethodAnchor];
export declare const castUseMethod: (u: UseMethod) => UseMethodAnchor;
export type UsesAnchor = {
    useMethod: UseMethodAnchor;
    remaining: BN;
    total: BN;
};
export declare const castUses: (u: Uses | null) => UsesAnchor | null;
declare const TokenProgramVersionAnchor: {
    Original: {
        original: {};
    };
    Token2022: {
        token2022: {};
    };
};
export type TokenProgramVersionAnchor = (typeof TokenProgramVersionAnchor)[keyof typeof TokenProgramVersionAnchor];
export declare const castTokenProgramVersion: (t: TokenProgramVersion) => TokenProgramVersionAnchor;
export type MetadataArgsAnchor = Omit<MetadataArgs, "tokenStandard" | "uses" | "tokenProgramVersion" | "creators"> & {
    tokenStandard: TokenStandardAnchor | null;
    uses: UsesAnchor | null;
    tokenProgramVersion: TokenProgramVersionAnchor;
    creatorShares: Buffer;
    creatorVerified: boolean[];
};
export declare const castMetadata: (m: MetadataArgs) => MetadataArgsAnchor;
export type BidStateAnchor = {
    version: number;
    bump: number[];
    owner: PublicKey;
    bidId: PublicKey;
    target: TargetAnchor;
    targetId: PublicKey;
    field?: FieldAnchor;
    fieldId?: PublicKey;
    quantity: number;
    filledQuantity: number;
    amount: BN;
    currency: PublicKey | null;
    expiry: BN;
    privateTaker: PublicKey | null;
    makerBroker: PublicKey | null;
    margin: PublicKey | null;
    updatedAt: BN;
    cosigner: PublicKey;
    /** owner is the rent payer when this is PublicKey.default */
    rentPayer: PublicKey;
};
export type ListStateAnchor = {
    version: number;
    bump: number[];
    owner: PublicKey;
    assetId: PublicKey;
    amount: BN;
    currency: PublicKey | null;
    expiry: BN;
    privateTaker: PublicKey | null;
    makerBroker: PublicKey | null;
    /** owner is the rent payer when this is PublicKey.default */
    rentPayer: PublicKey;
};
export type TCompPdaAnchor = BidStateAnchor | ListStateAnchor;
export type TaggedTCompPdaAnchor = {
    name: "bidState";
    account: BidStateAnchor;
} | {
    name: "listState";
    account: ListStateAnchor;
};
export declare class TCompSDK {
    program: Program<TcompIDL>;
    discMap: AcctDiscHexMap<TcompIDL>;
    coder: BorshCoder;
    eventParser: EventParser;
    constructor({ idl, addr, provider, coder, }: {
        idl?: any;
        addr?: PublicKey;
        provider?: Provider;
        coder?: Coder;
    });
    fetchBidState(bidState: PublicKey, commitment?: Commitment): Promise<BidStateAnchor>;
    fetchListState(listState: PublicKey, commitment?: Commitment): Promise<ListStateAnchor>;
    decode(acct: AccountInfo<Buffer>): TaggedTCompPdaAnchor | null;
    list({ merkleTree, owner, delegate, proof, root, dataHash, creatorsHash, nonce, index, amount, expireInSec, currency, makerBroker, privateTaker, rentPayer, compute, priorityMicroLamports, canopyDepth, delegateSigner, }: {
        merkleTree: PublicKey;
        owner: PublicKey;
        delegate?: PublicKey;
        proof: Buffer[];
        root: number[];
        dataHash: Buffer;
        creatorsHash: Buffer;
        nonce?: BN;
        index: number;
        amount: BN;
        expireInSec?: BN | null;
        currency?: PublicKey | null;
        makerBroker?: PublicKey | null;
        privateTaker?: PublicKey | null;
        rentPayer?: PublicKey | null;
        compute?: number | null;
        priorityMicroLamports?: number | null;
        canopyDepth?: number;
        delegateSigner?: boolean;
    }): Promise<{
        builder: import("@coral-xyz/anchor/dist/cjs/program/namespace/methods").MethodsBuilder<TcompIDL, ({
            name: "list";
            accounts: [{
                name: "treeAuthority";
                isMut: false;
                isSigner: false;
            }, {
                name: "owner";
                isMut: false;
                isSigner: false;
            }, {
                name: "delegate";
                isMut: false;
                isSigner: false;
            }, {
                name: "merkleTree";
                isMut: true;
                isSigner: false;
            }, {
                name: "logWrapper";
                isMut: false;
                isSigner: false;
            }, {
                name: "compressionProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "bubblegumProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "tcompProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "listState";
                isMut: true;
                isSigner: false;
            }, {
                name: "rentPayer";
                isMut: true;
                isSigner: true;
            }];
            args: [{
                name: "nonce";
                type: "u64";
            }, {
                name: "index";
                type: "u32";
            }, {
                name: "root";
                type: {
                    array: ["u8", 32];
                };
            }, {
                name: "dataHash";
                type: {
                    array: ["u8", 32];
                };
            }, {
                name: "creatorHash";
                type: {
                    array: ["u8", 32];
                };
            }, {
                name: "amount";
                type: "u64";
            }, {
                name: "expireInSec";
                type: {
                    option: "u64";
                };
            }, {
                name: "currency";
                type: {
                    option: "publicKey";
                };
            }, {
                name: "privateTaker";
                type: {
                    option: "publicKey";
                };
            }, {
                name: "makerBroker";
                type: {
                    option: "publicKey";
                };
            }];
        } & {
            name: "list";
        }) | ({
            name: "list";
            accounts: [{
                name: "treeAuthority";
                isMut: false;
                isSigner: false;
            }, {
                name: "owner";
                isMut: false;
                isSigner: false;
            }, {
                name: "delegate";
                isMut: false;
                isSigner: false;
            }, {
                name: "merkleTree";
                isMut: true;
                isSigner: false;
            }, {
                name: "logWrapper";
                isMut: false;
                isSigner: false;
            }, {
                name: "compressionProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "bubblegumProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "tcompProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "listState";
                isMut: true;
                isSigner: false;
            }, {
                name: "payer";
                isMut: true;
                isSigner: true;
            }];
            args: [{
                name: "nonce";
                type: "u64";
            }, {
                name: "index";
                type: "u32";
            }, {
                name: "root";
                type: {
                    array: ["u8", 32];
                };
            }, {
                name: "dataHash";
                type: {
                    array: ["u8", 32];
                };
            }, {
                name: "creatorHash";
                type: {
                    array: ["u8", 32];
                };
            }, {
                name: "amount";
                type: "u64";
            }, {
                name: "expireInSec";
                type: {
                    option: "u64";
                };
            }, {
                name: "currency";
                type: {
                    option: "publicKey";
                };
            }, {
                name: "privateTaker";
                type: {
                    option: "publicKey";
                };
            }, {
                name: "makerBroker";
                type: {
                    option: "publicKey";
                };
            }];
        } & {
            name: "list";
        }) | ({
            name: "list";
            accounts: [{
                name: "treeAuthority";
                isMut: false;
                isSigner: false;
            }, {
                name: "owner";
                isMut: false;
                isSigner: false;
            }, {
                name: "delegate";
                isMut: false;
                isSigner: false;
            }, {
                name: "merkleTree";
                isMut: true;
                isSigner: false;
            }, {
                name: "logWrapper";
                isMut: false;
                isSigner: false;
            }, {
                name: "compressionProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "bubblegumProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "tcompProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "listState";
                isMut: true;
                isSigner: false;
            }, {
                name: "payer";
                isMut: true;
                isSigner: true;
            }];
            args: [{
                name: "nonce";
                type: "u64";
            }, {
                name: "index";
                type: "u32";
            }, {
                name: "root";
                type: {
                    array: ["u8", 32];
                };
            }, {
                name: "dataHash";
                type: {
                    array: ["u8", 32];
                };
            }, {
                name: "creatorHash";
                type: {
                    array: ["u8", 32];
                };
            }, {
                name: "amount";
                type: "u64";
            }, {
                name: "expireInSec";
                type: {
                    option: "u64";
                };
            }, {
                name: "currency";
                type: {
                    option: "publicKey";
                };
            }, {
                name: "privateTaker";
                type: {
                    option: "publicKey";
                };
            }, {
                name: "makerBroker";
                type: {
                    option: "publicKey";
                };
            }];
        } & {
            name: "list";
        }) | ({
            name: "list";
            accounts: [{
                name: "treeAuthority";
                isMut: false;
                isSigner: false;
            }, {
                name: "owner";
                isMut: false;
                isSigner: false;
            }, {
                name: "delegate";
                isMut: false;
                isSigner: false;
            }, {
                name: "merkleTree";
                isMut: true;
                isSigner: false;
            }, {
                name: "logWrapper";
                isMut: false;
                isSigner: false;
            }, {
                name: "compressionProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "bubblegumProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "tcompProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "listState";
                isMut: true;
                isSigner: false;
            }, {
                name: "payer";
                isMut: true;
                isSigner: true;
            }];
            args: [{
                name: "nonce";
                type: "u64";
            }, {
                name: "index";
                type: "u32";
            }, {
                name: "root";
                type: {
                    array: ["u8", 32];
                };
            }, {
                name: "dataHash";
                type: {
                    array: ["u8", 32];
                };
            }, {
                name: "creatorHash";
                type: {
                    array: ["u8", 32];
                };
            }, {
                name: "amount";
                type: "u64";
            }, {
                name: "expireInSec";
                type: {
                    option: "u64";
                };
            }, {
                name: "currency";
                type: {
                    option: "publicKey";
                };
            }, {
                name: "privateTaker";
                type: {
                    option: "publicKey";
                };
            }, {
                name: "makerBroker";
                type: {
                    option: "publicKey";
                };
            }];
        } & {
            name: "list";
        }) | ({
            name: "list";
            accounts: [{
                name: "treeAuthority";
                isMut: false;
                isSigner: false;
            }, {
                name: "owner";
                isMut: false;
                isSigner: false;
            }, {
                name: "delegate";
                isMut: false;
                isSigner: false;
            }, {
                name: "merkleTree";
                isMut: true;
                isSigner: false;
            }, {
                name: "logWrapper";
                isMut: false;
                isSigner: false;
            }, {
                name: "compressionProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "bubblegumProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "tcompProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "listState";
                isMut: true;
                isSigner: false;
            }, {
                name: "payer";
                isMut: true;
                isSigner: true;
            }];
            args: [{
                name: "nonce";
                type: "u64";
            }, {
                name: "index";
                type: "u32";
            }, {
                name: "root";
                type: {
                    array: ["u8", 32];
                };
            }, {
                name: "dataHash";
                type: {
                    array: ["u8", 32];
                };
            }, {
                name: "creatorHash";
                type: {
                    array: ["u8", 32];
                };
            }, {
                name: "amount";
                type: "u64";
            }, {
                name: "expireInSec";
                type: {
                    option: "u64";
                };
            }, {
                name: "currency";
                type: {
                    option: "publicKey";
                };
            }, {
                name: "privateTaker";
                type: {
                    option: "publicKey";
                };
            }, {
                name: "makerBroker";
                type: {
                    option: "publicKey";
                };
            }];
        } & {
            name: "list";
        }) | ({
            name: "list";
            accounts: [{
                name: "treeAuthority";
                isMut: false;
                isSigner: false;
            }, {
                name: "owner";
                isMut: false;
                isSigner: false;
            }, {
                name: "delegate";
                isMut: false;
                isSigner: false;
            }, {
                name: "merkleTree";
                isMut: true;
                isSigner: false;
            }, {
                name: "logWrapper";
                isMut: false;
                isSigner: false;
            }, {
                name: "compressionProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "bubblegumProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "tcompProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "listState";
                isMut: true;
                isSigner: false;
            }, {
                name: "payer";
                isMut: true;
                isSigner: true;
            }];
            args: [{
                name: "nonce";
                type: "u64";
            }, {
                name: "index";
                type: "u32";
            }, {
                name: "root";
                type: {
                    array: ["u8", 32];
                };
            }, {
                name: "dataHash";
                type: {
                    array: ["u8", 32];
                };
            }, {
                name: "creatorHash";
                type: {
                    array: ["u8", 32];
                };
            }, {
                name: "amount";
                type: "u64";
            }, {
                name: "expireInSec";
                type: {
                    option: "u64";
                };
            }, {
                name: "currency";
                type: {
                    option: "publicKey";
                };
            }, {
                name: "privateTaker";
                type: {
                    option: "publicKey";
                };
            }, {
                name: "makerBroker";
                type: {
                    option: "publicKey";
                };
            }];
        } & {
            name: "list";
        })>;
        tx: {
            ixs: TransactionInstruction[];
            extraSigners: never[];
        };
        treeAuthority: PublicKey;
        assetId: PublicKey;
        listState: PublicKey;
        proofPath: {
            pubkey: PublicKey;
            isSigner: boolean;
            isWritable: boolean;
        }[];
    }>;
    edit({ owner, listState, amount, expireInSec, currency, privateTaker, makerBroker, compute, priorityMicroLamports, }: {
        owner: PublicKey;
        listState: PublicKey;
        amount: BN;
        expireInSec?: BN | null;
        currency?: PublicKey | null;
        privateTaker?: PublicKey | null;
        makerBroker?: PublicKey | null;
        compute?: number | null;
        priorityMicroLamports?: number | null;
    }): Promise<{
        builder: import("@coral-xyz/anchor/dist/cjs/program/namespace/methods").MethodsBuilder<TcompIDL, ({
            name: "edit";
            accounts: [{
                name: "listState";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: false;
                isSigner: true;
            }, {
                name: "tcompProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "amount";
                type: "u64";
            }, {
                name: "expireInSec";
                type: {
                    option: "u64";
                };
            }, {
                name: "currency";
                type: {
                    option: "publicKey";
                };
            }, {
                name: "privateTaker";
                type: {
                    option: "publicKey";
                };
            }, {
                name: "makerBroker";
                type: {
                    option: "publicKey";
                };
            }];
        } & {
            name: "edit";
        }) | ({
            name: "edit";
            accounts: [{
                name: "listState";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: false;
                isSigner: true;
            }, {
                name: "tcompProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "amount";
                type: "u64";
            }, {
                name: "expireInSec";
                type: {
                    option: "u64";
                };
            }, {
                name: "currency";
                type: {
                    option: "publicKey";
                };
            }, {
                name: "privateTaker";
                type: {
                    option: "publicKey";
                };
            }, {
                name: "makerBroker";
                type: {
                    option: "publicKey";
                };
            }];
        } & {
            name: "edit";
        }) | ({
            name: "edit";
            accounts: [{
                name: "listState";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: false;
                isSigner: true;
            }, {
                name: "tcompProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "amount";
                type: "u64";
            }, {
                name: "expireInSec";
                type: {
                    option: "u64";
                };
            }, {
                name: "currency";
                type: {
                    option: "publicKey";
                };
            }, {
                name: "privateTaker";
                type: {
                    option: "publicKey";
                };
            }, {
                name: "makerBroker";
                type: {
                    option: "publicKey";
                };
            }];
        } & {
            name: "edit";
        }) | ({
            name: "edit";
            accounts: [{
                name: "listState";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: false;
                isSigner: true;
            }, {
                name: "tcompProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "amount";
                type: "u64";
            }, {
                name: "expireInSec";
                type: {
                    option: "u64";
                };
            }, {
                name: "currency";
                type: {
                    option: "publicKey";
                };
            }, {
                name: "privateTaker";
                type: {
                    option: "publicKey";
                };
            }, {
                name: "makerBroker";
                type: {
                    option: "publicKey";
                };
            }];
        } & {
            name: "edit";
        }) | ({
            name: "edit";
            accounts: [{
                name: "listState";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: false;
                isSigner: true;
            }, {
                name: "tcompProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "amount";
                type: "u64";
            }, {
                name: "expireInSec";
                type: {
                    option: "u64";
                };
            }, {
                name: "currency";
                type: {
                    option: "publicKey";
                };
            }, {
                name: "privateTaker";
                type: {
                    option: "publicKey";
                };
            }, {
                name: "makerBroker";
                type: {
                    option: "publicKey";
                };
            }];
        } & {
            name: "edit";
        }) | ({
            name: "edit";
            accounts: [{
                name: "listState";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: false;
                isSigner: true;
            }, {
                name: "tcompProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "amount";
                type: "u64";
            }, {
                name: "expireInSec";
                type: {
                    option: "u64";
                };
            }, {
                name: "currency";
                type: {
                    option: "publicKey";
                };
            }, {
                name: "privateTaker";
                type: {
                    option: "publicKey";
                };
            }, {
                name: "makerBroker";
                type: {
                    option: "publicKey";
                };
            }];
        } & {
            name: "edit";
        })>;
        tx: {
            ixs: TransactionInstruction[];
            extraSigners: never[];
        };
    }>;
    delist({ merkleTree, owner, rentDest, proof, root, dataHash, creatorsHash, nonce, index, compute, priorityMicroLamports, canopyDepth, }: {
        merkleTree: PublicKey;
        owner: PublicKey;
        rentDest: PublicKey;
        proof: Buffer[];
        root: number[];
        dataHash: Buffer;
        creatorsHash: Buffer;
        nonce?: BN;
        index: number;
        compute?: number | null;
        priorityMicroLamports?: number | null;
        canopyDepth?: number;
    }): Promise<{
        builder: import("@coral-xyz/anchor/dist/cjs/program/namespace/methods").MethodsBuilder<TcompIDL, ({
            name: "delist";
            accounts: [{
                name: "treeAuthority";
                isMut: false;
                isSigner: false;
            }, {
                name: "merkleTree";
                isMut: true;
                isSigner: false;
            }, {
                name: "logWrapper";
                isMut: false;
                isSigner: false;
            }, {
                name: "compressionProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "bubblegumProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "listState";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: false;
                isSigner: true;
            }, {
                name: "tcompProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "rentDest";
                isMut: true;
                isSigner: false;
            }];
            args: [{
                name: "nonce";
                type: "u64";
            }, {
                name: "index";
                type: "u32";
            }, {
                name: "root";
                type: {
                    array: ["u8", 32];
                };
            }, {
                name: "dataHash";
                type: {
                    array: ["u8", 32];
                };
            }, {
                name: "creatorHash";
                type: {
                    array: ["u8", 32];
                };
            }];
        } & {
            name: "delist";
        }) | ({
            name: "delist";
            accounts: [{
                name: "treeAuthority";
                isMut: false;
                isSigner: false;
            }, {
                name: "merkleTree";
                isMut: true;
                isSigner: false;
            }, {
                name: "logWrapper";
                isMut: false;
                isSigner: false;
            }, {
                name: "compressionProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "bubblegumProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "listState";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "tcompProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "nonce";
                type: "u64";
            }, {
                name: "index";
                type: "u32";
            }, {
                name: "root";
                type: {
                    array: ["u8", 32];
                };
            }, {
                name: "dataHash";
                type: {
                    array: ["u8", 32];
                };
            }, {
                name: "creatorHash";
                type: {
                    array: ["u8", 32];
                };
            }];
        } & {
            name: "delist";
        }) | ({
            name: "delist";
            accounts: [{
                name: "treeAuthority";
                isMut: false;
                isSigner: false;
            }, {
                name: "merkleTree";
                isMut: true;
                isSigner: false;
            }, {
                name: "logWrapper";
                isMut: false;
                isSigner: false;
            }, {
                name: "compressionProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "bubblegumProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "listState";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "tcompProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "nonce";
                type: "u64";
            }, {
                name: "index";
                type: "u32";
            }, {
                name: "root";
                type: {
                    array: ["u8", 32];
                };
            }, {
                name: "dataHash";
                type: {
                    array: ["u8", 32];
                };
            }, {
                name: "creatorHash";
                type: {
                    array: ["u8", 32];
                };
            }];
        } & {
            name: "delist";
        }) | ({
            name: "delist";
            accounts: [{
                name: "treeAuthority";
                isMut: false;
                isSigner: false;
            }, {
                name: "merkleTree";
                isMut: true;
                isSigner: false;
            }, {
                name: "logWrapper";
                isMut: false;
                isSigner: false;
            }, {
                name: "compressionProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "bubblegumProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "listState";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }];
            args: [{
                name: "nonce";
                type: "u64";
            }, {
                name: "index";
                type: "u32";
            }, {
                name: "root";
                type: {
                    array: ["u8", 32];
                };
            }, {
                name: "dataHash";
                type: {
                    array: ["u8", 32];
                };
            }, {
                name: "creatorHash";
                type: {
                    array: ["u8", 32];
                };
            }];
        } & {
            name: "delist";
        }) | ({
            name: "delist";
            accounts: [{
                name: "treeAuthority";
                isMut: false;
                isSigner: false;
            }, {
                name: "merkleTree";
                isMut: true;
                isSigner: false;
            }, {
                name: "logWrapper";
                isMut: false;
                isSigner: false;
            }, {
                name: "compressionProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "bubblegumProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "listState";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "tcompProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "nonce";
                type: "u64";
            }, {
                name: "index";
                type: "u32";
            }, {
                name: "root";
                type: {
                    array: ["u8", 32];
                };
            }, {
                name: "dataHash";
                type: {
                    array: ["u8", 32];
                };
            }, {
                name: "creatorHash";
                type: {
                    array: ["u8", 32];
                };
            }];
        } & {
            name: "delist";
        }) | ({
            name: "delist";
            accounts: [{
                name: "treeAuthority";
                isMut: false;
                isSigner: false;
            }, {
                name: "merkleTree";
                isMut: true;
                isSigner: false;
            }, {
                name: "logWrapper";
                isMut: false;
                isSigner: false;
            }, {
                name: "compressionProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "bubblegumProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "listState";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "tcompProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "nonce";
                type: "u64";
            }, {
                name: "index";
                type: "u32";
            }, {
                name: "root";
                type: {
                    array: ["u8", 32];
                };
            }, {
                name: "dataHash";
                type: {
                    array: ["u8", 32];
                };
            }, {
                name: "creatorHash";
                type: {
                    array: ["u8", 32];
                };
            }];
        } & {
            name: "delist";
        })>;
        tx: {
            ixs: TransactionInstruction[];
            extraSigners: never[];
        };
        treeAuthority: PublicKey;
        assetId: PublicKey;
        listState: PublicKey;
        proofPath: {
            pubkey: PublicKey;
            isSigner: boolean;
            isWritable: boolean;
        }[];
    }>;
    buy({ merkleTree, proof, root, metaHash, creators, sellerFeeBasisPoints, nonce, index, maxAmount, makerBroker, takerBroker, optionalRoyaltyPct, owner, buyer, payer, rentDest, compute, priorityMicroLamports, canopyDepth, }: {
        merkleTree: PublicKey;
        proof: Buffer[];
        root: number[];
        metaHash: Buffer;
        creators: Creator[];
        sellerFeeBasisPoints: number;
        nonce?: BN;
        index: number;
        maxAmount: BN;
        makerBroker: PublicKey | null;
        takerBroker?: PublicKey | null;
        optionalRoyaltyPct?: number | null;
        owner: PublicKey;
        buyer: PublicKey;
        payer?: PublicKey | null;
        rentDest: PublicKey;
        compute?: number | null;
        priorityMicroLamports?: number | null;
        canopyDepth?: number;
    }): Promise<{
        builder: import("@coral-xyz/anchor/dist/cjs/program/namespace/methods").MethodsBuilder<TcompIDL, ({
            name: "buy";
            accounts: [{
                name: "tcomp";
                isMut: true;
                isSigner: false;
            }, {
                name: "treeAuthority";
                isMut: false;
                isSigner: false;
            }, {
                name: "merkleTree";
                isMut: true;
                isSigner: false;
            }, {
                name: "logWrapper";
                isMut: false;
                isSigner: false;
            }, {
                name: "compressionProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "bubblegumProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "tcompProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "listState";
                isMut: true;
                isSigner: false;
            }, {
                name: "buyer";
                isMut: false;
                isSigner: false;
            }, {
                name: "payer";
                isMut: true;
                isSigner: true;
            }, {
                name: "owner";
                isMut: true;
                isSigner: false;
            }, {
                name: "takerBroker";
                isMut: true;
                isSigner: false;
                isOptional: true;
            }, {
                name: "makerBroker";
                isMut: true;
                isSigner: false;
                isOptional: true;
            }, {
                name: "rentDest";
                isMut: true;
                isSigner: false;
            }];
            args: [{
                name: "nonce";
                type: "u64";
            }, {
                name: "index";
                type: "u32";
            }, {
                name: "root";
                type: {
                    array: ["u8", 32];
                };
            }, {
                name: "metaHash";
                type: {
                    array: ["u8", 32];
                };
            }, {
                name: "creatorShares";
                type: "bytes";
            }, {
                name: "creatorVerified";
                type: {
                    vec: "bool";
                };
            }, {
                name: "sellerFeeBasisPoints";
                type: "u16";
            }, {
                name: "maxAmount";
                type: "u64";
            }, {
                name: "optionalRoyaltyPct";
                type: {
                    option: "u16";
                };
            }];
        } & {
            name: "buy";
        }) | ({
            name: "buy";
            accounts: [{
                name: "tcomp";
                isMut: true;
                isSigner: false;
            }, {
                name: "treeAuthority";
                isMut: false;
                isSigner: false;
            }, {
                name: "merkleTree";
                isMut: true;
                isSigner: false;
            }, {
                name: "logWrapper";
                isMut: false;
                isSigner: false;
            }, {
                name: "compressionProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "bubblegumProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "tcompProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "listState";
                isMut: true;
                isSigner: false;
            }, {
                name: "buyer";
                isMut: false;
                isSigner: false;
            }, {
                name: "payer";
                isMut: true;
                isSigner: true;
            }, {
                name: "owner";
                isMut: true;
                isSigner: false;
            }, {
                name: "takerBroker";
                isMut: true;
                isSigner: false;
            }, {
                name: "makerBroker";
                isMut: true;
                isSigner: false;
            }];
            args: [{
                name: "nonce";
                type: "u64";
            }, {
                name: "index";
                type: "u32";
            }, {
                name: "root";
                type: {
                    array: ["u8", 32];
                };
            }, {
                name: "metaHash";
                type: {
                    array: ["u8", 32];
                };
            }, {
                name: "creatorShares";
                type: "bytes";
            }, {
                name: "creatorVerified";
                type: {
                    vec: "bool";
                };
            }, {
                name: "sellerFeeBasisPoints";
                type: "u16";
            }, {
                name: "maxAmount";
                type: "u64";
            }, {
                name: "currency";
                type: {
                    option: "publicKey";
                };
            }, {
                name: "makerBroker";
                type: {
                    option: "publicKey";
                };
            }, {
                name: "optionalRoyaltyPct";
                type: {
                    option: "u16";
                };
            }];
        } & {
            name: "buy";
        }) | ({
            name: "buy";
            accounts: [{
                name: "tcomp";
                isMut: true;
                isSigner: false;
            }, {
                name: "treeAuthority";
                isMut: false;
                isSigner: false;
            }, {
                name: "merkleTree";
                isMut: true;
                isSigner: false;
            }, {
                name: "logWrapper";
                isMut: false;
                isSigner: false;
            }, {
                name: "compressionProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "bubblegumProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "tcompProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "listState";
                isMut: true;
                isSigner: false;
            }, {
                name: "buyer";
                isMut: false;
                isSigner: false;
            }, {
                name: "payer";
                isMut: true;
                isSigner: true;
            }, {
                name: "owner";
                isMut: true;
                isSigner: false;
            }, {
                name: "takerBroker";
                isMut: true;
                isSigner: false;
            }, {
                name: "makerBroker";
                isMut: true;
                isSigner: false;
            }];
            args: [{
                name: "nonce";
                type: "u64";
            }, {
                name: "index";
                type: "u32";
            }, {
                name: "root";
                type: {
                    array: ["u8", 32];
                };
            }, {
                name: "metaHash";
                type: {
                    array: ["u8", 32];
                };
            }, {
                name: "creatorShares";
                type: "bytes";
            }, {
                name: "creatorVerified";
                type: {
                    vec: "bool";
                };
            }, {
                name: "sellerFeeBasisPoints";
                type: "u16";
            }, {
                name: "maxAmount";
                type: "u64";
            }, {
                name: "currency";
                type: {
                    option: "publicKey";
                };
            }, {
                name: "makerBroker";
                type: {
                    option: "publicKey";
                };
            }, {
                name: "optionalRoyaltyPct";
                type: {
                    option: "u16";
                };
            }];
        } & {
            name: "buy";
        }) | ({
            name: "buy";
            accounts: [{
                name: "tcomp";
                isMut: true;
                isSigner: false;
            }, {
                name: "treeAuthority";
                isMut: false;
                isSigner: false;
            }, {
                name: "merkleTree";
                isMut: true;
                isSigner: false;
            }, {
                name: "logWrapper";
                isMut: false;
                isSigner: false;
            }, {
                name: "compressionProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "bubblegumProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "tcompProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "listState";
                isMut: true;
                isSigner: false;
            }, {
                name: "buyer";
                isMut: false;
                isSigner: true;
            }, {
                name: "payer";
                isMut: true;
                isSigner: true;
            }, {
                name: "owner";
                isMut: true;
                isSigner: false;
            }, {
                name: "takerBroker";
                isMut: true;
                isSigner: false;
            }, {
                name: "makerBroker";
                isMut: true;
                isSigner: false;
            }];
            args: [{
                name: "nonce";
                type: "u64";
            }, {
                name: "index";
                type: "u32";
            }, {
                name: "root";
                type: {
                    array: ["u8", 32];
                };
            }, {
                name: "metaHash";
                type: {
                    array: ["u8", 32];
                };
            }, {
                name: "creatorShares";
                type: "bytes";
            }, {
                name: "creatorVerified";
                type: {
                    vec: "bool";
                };
            }, {
                name: "sellerFeeBasisPoints";
                type: "u16";
            }, {
                name: "maxAmount";
                type: "u64";
            }, {
                name: "currency";
                type: {
                    option: "publicKey";
                };
            }, {
                name: "makerBroker";
                type: {
                    option: "publicKey";
                };
            }, {
                name: "optionalRoyaltyPct";
                type: {
                    option: "u16";
                };
            }];
        } & {
            name: "buy";
        }) | ({
            name: "buy";
            accounts: [{
                name: "tcomp";
                isMut: true;
                isSigner: false;
            }, {
                name: "treeAuthority";
                isMut: false;
                isSigner: false;
            }, {
                name: "merkleTree";
                isMut: true;
                isSigner: false;
            }, {
                name: "logWrapper";
                isMut: false;
                isSigner: false;
            }, {
                name: "compressionProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "bubblegumProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "tcompProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "listState";
                isMut: true;
                isSigner: false;
            }, {
                name: "buyer";
                isMut: false;
                isSigner: true;
            }, {
                name: "payer";
                isMut: true;
                isSigner: true;
            }, {
                name: "owner";
                isMut: true;
                isSigner: false;
            }, {
                name: "takerBroker";
                isMut: true;
                isSigner: false;
            }, {
                name: "makerBroker";
                isMut: true;
                isSigner: false;
            }];
            args: [{
                name: "nonce";
                type: "u64";
            }, {
                name: "index";
                type: "u32";
            }, {
                name: "root";
                type: {
                    array: ["u8", 32];
                };
            }, {
                name: "metaHash";
                type: {
                    array: ["u8", 32];
                };
            }, {
                name: "creatorShares";
                type: "bytes";
            }, {
                name: "creatorVerified";
                type: {
                    vec: "bool";
                };
            }, {
                name: "sellerFeeBasisPoints";
                type: "u16";
            }, {
                name: "maxAmount";
                type: "u64";
            }, {
                name: "currency";
                type: {
                    option: "publicKey";
                };
            }, {
                name: "makerBroker";
                type: {
                    option: "publicKey";
                };
            }, {
                name: "optionalRoyaltyPct";
                type: {
                    option: "u16";
                };
            }];
        } & {
            name: "buy";
        }) | ({
            name: "buy";
            accounts: [{
                name: "tcomp";
                isMut: true;
                isSigner: false;
            }, {
                name: "treeAuthority";
                isMut: false;
                isSigner: false;
            }, {
                name: "merkleTree";
                isMut: true;
                isSigner: false;
            }, {
                name: "logWrapper";
                isMut: false;
                isSigner: false;
            }, {
                name: "compressionProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "bubblegumProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "tcompProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "listState";
                isMut: true;
                isSigner: false;
            }, {
                name: "buyer";
                isMut: false;
                isSigner: false;
            }, {
                name: "payer";
                isMut: true;
                isSigner: true;
            }, {
                name: "owner";
                isMut: true;
                isSigner: false;
            }, {
                name: "takerBroker";
                isMut: true;
                isSigner: false;
            }, {
                name: "makerBroker";
                isMut: true;
                isSigner: false;
            }];
            args: [{
                name: "nonce";
                type: "u64";
            }, {
                name: "index";
                type: "u32";
            }, {
                name: "root";
                type: {
                    array: ["u8", 32];
                };
            }, {
                name: "metaHash";
                type: {
                    array: ["u8", 32];
                };
            }, {
                name: "creatorShares";
                type: "bytes";
            }, {
                name: "creatorVerified";
                type: {
                    vec: "bool";
                };
            }, {
                name: "sellerFeeBasisPoints";
                type: "u16";
            }, {
                name: "maxAmount";
                type: "u64";
            }, {
                name: "currency";
                type: {
                    option: "publicKey";
                };
            }, {
                name: "makerBroker";
                type: {
                    option: "publicKey";
                };
            }, {
                name: "optionalRoyaltyPct";
                type: {
                    option: "u16";
                };
            }];
        } & {
            name: "buy";
        })>;
        tx: {
            ixs: TransactionInstruction[];
            extraSigners: never[];
        };
        listState: PublicKey;
        treeAuthority: PublicKey;
        tcomp: PublicKey;
        creators: Creator[];
        proofPath: {
            pubkey: PublicKey;
            isSigner: boolean;
            isWritable: boolean;
        }[];
    }>;
    buySpl({ merkleTree, proof, root, metaHash, creators, sellerFeeBasisPoints, nonce, index, maxAmount, currency, makerBroker, takerBroker, optionalRoyaltyPct, owner, buyer, payer, rentPayer, rentDest, compute, priorityMicroLamports, canopyDepth, }: {
        merkleTree: PublicKey;
        proof: Buffer[];
        root: number[];
        metaHash: Buffer;
        creators: Creator[];
        sellerFeeBasisPoints: number;
        nonce?: BN;
        index: number;
        maxAmount: BN;
        currency: PublicKey;
        makerBroker: PublicKey | null;
        takerBroker?: PublicKey | null;
        optionalRoyaltyPct?: number | null;
        owner: PublicKey;
        buyer: PublicKey;
        payer?: PublicKey | null;
        rentPayer?: PublicKey | null;
        rentDest: PublicKey;
        compute?: number | null;
        priorityMicroLamports?: number | null;
        canopyDepth?: number;
    }): Promise<{
        builder: import("@coral-xyz/anchor/dist/cjs/program/namespace/methods").MethodsBuilder<TcompIDL, {
            name: "buySpl";
            accounts: [{
                name: "tcomp";
                isMut: true;
                isSigner: false;
            }, {
                name: "tcompAta";
                isMut: true;
                isSigner: false;
            }, {
                name: "treeAuthority";
                isMut: false;
                isSigner: false;
            }, {
                name: "merkleTree";
                isMut: true;
                isSigner: false;
            }, {
                name: "logWrapper";
                isMut: false;
                isSigner: false;
            }, {
                name: "compressionProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "bubblegumProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "tcompProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "tokenProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "associatedTokenProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "listState";
                isMut: true;
                isSigner: false;
            }, {
                name: "buyer";
                isMut: false;
                isSigner: false;
            }, {
                name: "payer";
                isMut: false;
                isSigner: true;
            }, {
                name: "payerSource";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: false;
                isSigner: false;
            }, {
                name: "ownerDest";
                isMut: true;
                isSigner: false;
            }, {
                name: "currency";
                isMut: false;
                isSigner: false;
            }, {
                name: "takerBroker";
                isMut: true;
                isSigner: false;
                isOptional: true;
            }, {
                name: "takerBrokerAta";
                isMut: true;
                isSigner: false;
                isOptional: true;
            }, {
                name: "makerBroker";
                isMut: true;
                isSigner: false;
                isOptional: true;
            }, {
                name: "makerBrokerAta";
                isMut: true;
                isSigner: false;
                isOptional: true;
            }, {
                name: "rentDest";
                isMut: true;
                isSigner: false;
            }, {
                name: "rentPayer";
                isMut: true;
                isSigner: true;
            }];
            args: [{
                name: "nonce";
                type: "u64";
            }, {
                name: "index";
                type: "u32";
            }, {
                name: "root";
                type: {
                    array: ["u8", 32];
                };
            }, {
                name: "metaHash";
                type: {
                    array: ["u8", 32];
                };
            }, {
                name: "creatorShares";
                type: "bytes";
            }, {
                name: "creatorVerified";
                type: {
                    vec: "bool";
                };
            }, {
                name: "sellerFeeBasisPoints";
                type: "u16";
            }, {
                name: "maxAmount";
                type: "u64";
            }, {
                name: "optionalRoyaltyPct";
                type: {
                    option: "u16";
                };
            }];
        } & {
            name: "buySpl";
        }>;
        tx: {
            ixs: TransactionInstruction[];
            extraSigners: never[];
        };
        listState: PublicKey;
        treeAuthority: PublicKey;
        tcomp: PublicKey;
        creators: Creator[];
        proofPath: {
            pubkey: PublicKey;
            isSigner: boolean;
            isWritable: boolean;
        }[];
    }>;
    bid({ target, targetId, bidId, field, fieldId, quantity, owner, amount, expireInSec, currency, makerBroker, privateTaker, compute, priorityMicroLamports, margin, cosigner, rentPayer, }: {
        target: Target;
        targetId: PublicKey;
        bidId?: PublicKey;
        field?: Field | null;
        fieldId?: PublicKey | null;
        quantity?: number;
        owner: PublicKey;
        amount: BN;
        expireInSec?: BN | null;
        currency?: PublicKey | null;
        makerBroker?: PublicKey | null;
        privateTaker?: PublicKey | null;
        compute?: number | null;
        priorityMicroLamports?: number | null;
        margin?: PublicKey | null;
        cosigner?: PublicKey | null;
        rentPayer?: PublicKey | null;
    }): Promise<{
        builder: import("@coral-xyz/anchor/dist/cjs/program/namespace/methods").MethodsBuilder<TcompIDL, ({
            name: "bid";
            accounts: [{
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "tcompProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "bidState";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "marginAccount";
                isMut: true;
                isSigner: false;
            }, {
                name: "cosigner";
                isMut: false;
                isSigner: true;
            }, {
                name: "rentPayer";
                isMut: true;
                isSigner: true;
            }];
            args: [{
                name: "bidId";
                type: "publicKey";
            }, {
                name: "target";
                type: {
                    defined: "Target";
                };
            }, {
                name: "targetId";
                type: "publicKey";
            }, {
                name: "field";
                type: {
                    option: {
                        defined: "Field";
                    };
                };
            }, {
                name: "fieldId";
                type: {
                    option: "publicKey";
                };
            }, {
                name: "amount";
                type: "u64";
            }, {
                name: "quantity";
                type: "u32";
            }, {
                name: "expireInSec";
                type: {
                    option: "u64";
                };
            }, {
                name: "currency";
                type: {
                    option: "publicKey";
                };
            }, {
                name: "privateTaker";
                type: {
                    option: "publicKey";
                };
            }, {
                name: "makerBroker";
                type: {
                    option: "publicKey";
                };
            }];
        } & {
            name: "bid";
        }) | ({
            name: "bid";
            accounts: [{
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "tcompProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "bidState";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "marginAccount";
                isMut: true;
                isSigner: false;
            }, {
                name: "cosigner";
                isMut: false;
                isSigner: true;
            }];
            args: [{
                name: "bidId";
                type: "publicKey";
            }, {
                name: "target";
                type: {
                    defined: "Target";
                };
            }, {
                name: "targetId";
                type: "publicKey";
            }, {
                name: "field";
                type: {
                    option: {
                        defined: "Field";
                    };
                };
            }, {
                name: "fieldId";
                type: {
                    option: "publicKey";
                };
            }, {
                name: "amount";
                type: "u64";
            }, {
                name: "quantity";
                type: "u32";
            }, {
                name: "expireInSec";
                type: {
                    option: "u64";
                };
            }, {
                name: "currency";
                type: {
                    option: "publicKey";
                };
            }, {
                name: "privateTaker";
                type: {
                    option: "publicKey";
                };
            }, {
                name: "makerBroker";
                type: {
                    option: "publicKey";
                };
            }];
        } & {
            name: "bid";
        }) | ({
            name: "bid";
            accounts: [{
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "tcompProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "bidState";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "marginAccount";
                isMut: true;
                isSigner: false;
            }, {
                name: "cosigner";
                isMut: false;
                isSigner: true;
            }];
            args: [{
                name: "bidId";
                type: "publicKey";
            }, {
                name: "target";
                type: {
                    defined: "Target";
                };
            }, {
                name: "targetId";
                type: "publicKey";
            }, {
                name: "field";
                type: {
                    option: {
                        defined: "Field";
                    };
                };
            }, {
                name: "fieldId";
                type: {
                    option: "publicKey";
                };
            }, {
                name: "amount";
                type: "u64";
            }, {
                name: "quantity";
                type: "u32";
            }, {
                name: "expireInSec";
                type: {
                    option: "u64";
                };
            }, {
                name: "currency";
                type: {
                    option: "publicKey";
                };
            }, {
                name: "privateTaker";
                type: {
                    option: "publicKey";
                };
            }, {
                name: "makerBroker";
                type: {
                    option: "publicKey";
                };
            }];
        } & {
            name: "bid";
        }) | ({
            name: "bid";
            accounts: [{
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "tcompProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "bidState";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "marginAccount";
                isMut: true;
                isSigner: false;
            }];
            args: [{
                name: "bidId";
                type: "publicKey";
            }, {
                name: "target";
                type: {
                    defined: "Target";
                };
            }, {
                name: "targetId";
                type: "publicKey";
            }, {
                name: "field";
                type: {
                    option: {
                        defined: "Field";
                    };
                };
            }, {
                name: "fieldId";
                type: {
                    option: "publicKey";
                };
            }, {
                name: "amount";
                type: "u64";
            }, {
                name: "quantity";
                type: "u32";
            }, {
                name: "expireInSec";
                type: {
                    option: "u64";
                };
            }, {
                name: "currency";
                type: {
                    option: "publicKey";
                };
            }, {
                name: "privateTaker";
                type: {
                    option: "publicKey";
                };
            }, {
                name: "makerBroker";
                type: {
                    option: "publicKey";
                };
            }];
        } & {
            name: "bid";
        }) | ({
            name: "bid";
            accounts: [{
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "tcompProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "bidState";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "marginAccount";
                isMut: true;
                isSigner: false;
            }];
            args: [{
                name: "bidId";
                type: "publicKey";
            }, {
                name: "target";
                type: {
                    defined: "Target";
                };
            }, {
                name: "targetId";
                type: "publicKey";
            }, {
                name: "field";
                type: {
                    option: {
                        defined: "Field";
                    };
                };
            }, {
                name: "fieldId";
                type: {
                    option: "publicKey";
                };
            }, {
                name: "amount";
                type: "u64";
            }, {
                name: "quantity";
                type: "u32";
            }, {
                name: "expireInSec";
                type: {
                    option: "u64";
                };
            }, {
                name: "currency";
                type: {
                    option: "publicKey";
                };
            }, {
                name: "privateTaker";
                type: {
                    option: "publicKey";
                };
            }, {
                name: "makerBroker";
                type: {
                    option: "publicKey";
                };
            }];
        } & {
            name: "bid";
        }) | ({
            name: "bid";
            accounts: [{
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "tcompProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "bidState";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "marginAccount";
                isMut: true;
                isSigner: false;
            }];
            args: [{
                name: "bidId";
                type: "publicKey";
            }, {
                name: "target";
                type: {
                    defined: "Target";
                };
            }, {
                name: "targetId";
                type: "publicKey";
            }, {
                name: "field";
                type: {
                    option: {
                        defined: "Field";
                    };
                };
            }, {
                name: "fieldId";
                type: {
                    option: "publicKey";
                };
            }, {
                name: "amount";
                type: "u64";
            }, {
                name: "quantity";
                type: "u32";
            }, {
                name: "expireInSec";
                type: {
                    option: "u64";
                };
            }, {
                name: "currency";
                type: {
                    option: "publicKey";
                };
            }, {
                name: "privateTaker";
                type: {
                    option: "publicKey";
                };
            }, {
                name: "makerBroker";
                type: {
                    option: "publicKey";
                };
            }];
        } & {
            name: "bid";
        })>;
        tx: {
            ixs: TransactionInstruction[];
            extraSigners: never[];
        };
        bidState: PublicKey;
    }>;
    cancelBid({ bidId, owner, rentDest, compute, priorityMicroLamports, }: {
        bidId: PublicKey;
        owner: PublicKey;
        rentDest: PublicKey;
        compute?: number | null;
        priorityMicroLamports?: number | null;
    }): Promise<{
        builder: import("@coral-xyz/anchor/dist/cjs/program/namespace/methods").MethodsBuilder<TcompIDL, ({
            name: "cancelBid";
            accounts: [{
                name: "bidState";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "tcompProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "rentDest";
                isMut: true;
                isSigner: false;
            }];
            args: [];
        } & {
            name: "cancelBid";
        }) | ({
            name: "cancelBid";
            accounts: [{
                name: "bidState";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "tcompProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [];
        } & {
            name: "cancelBid";
        }) | ({
            name: "cancelBid";
            accounts: [{
                name: "bidState";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "tcompProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [];
        } & {
            name: "cancelBid";
        }) | ({
            name: "cancelBid";
            accounts: [{
                name: "bidState";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [];
        } & {
            name: "cancelBid";
        }) | ({
            name: "cancelBid";
            accounts: [{
                name: "bidState";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false; /** owner is the rent payer when this is PublicKey.default */
            }, {
                name: "tcompProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [];
        } & {
            name: "cancelBid";
        }) | ({
            name: "cancelBid";
            accounts: [{
                name: "bidState";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false; /** owner is the rent payer when this is PublicKey.default */
            }, {
                name: "tcompProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [];
        } & {
            name: "cancelBid";
        })>;
        tx: {
            ixs: TransactionInstruction[];
            extraSigners: never[];
        };
        bidState: PublicKey;
    }>;
    closeExpiredBid({ bidId, owner, rentDest, compute, priorityMicroLamports, }: {
        bidId: PublicKey;
        owner: PublicKey;
        rentDest: PublicKey;
        compute?: number | null;
        priorityMicroLamports?: number | null;
    }): Promise<{
        builder: import("@coral-xyz/anchor/dist/cjs/program/namespace/methods").MethodsBuilder<TcompIDL, ({
            name: "closeExpiredBid";
            accounts: [{
                name: "bidState";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: false;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "tcompProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "rentDest";
                isMut: true;
                isSigner: false;
            }];
            args: [];
        } & {
            name: "closeExpiredBid";
        }) | ({
            name: "closeExpiredBid";
            accounts: [{
                name: "bidState";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: false;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "tcompProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [];
        } & {
            name: "closeExpiredBid";
        }) | ({
            name: "closeExpiredBid";
            accounts: [{
                name: "bidState";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: false;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "tcompProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [];
        } & {
            name: "closeExpiredBid";
        }) | ({
            name: "closeExpiredBid";
            accounts: [{
                name: "bidState";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: false;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [];
        } & {
            name: "closeExpiredBid";
        }) | ({
            name: "closeExpiredBid";
            accounts: [{
                name: "bidState";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: false;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "tcompProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [];
        } & {
            name: "closeExpiredBid";
        }) | ({
            name: "closeExpiredBid";
            accounts: [{
                name: "bidState";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: false;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "tcompProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [];
        } & {
            name: "closeExpiredBid";
        })>;
        tx: {
            ixs: TransactionInstruction[];
            extraSigners: never[];
        };
        bidState: PublicKey;
    }>;
    closeExpiredListing({ merkleTree, owner, rentDest, proof, root, dataHash, creatorsHash, nonce, index, compute, priorityMicroLamports, canopyDepth, }: {
        merkleTree: PublicKey;
        owner: PublicKey;
        rentDest: PublicKey;
        proof: Buffer[];
        root: number[];
        dataHash: Buffer;
        creatorsHash: Buffer;
        nonce?: BN;
        index: number;
        compute?: number | null;
        priorityMicroLamports?: number | null;
        canopyDepth?: number;
    }): Promise<{
        builder: import("@coral-xyz/anchor/dist/cjs/program/namespace/methods").MethodsBuilder<TcompIDL, ({
            name: "closeExpiredListing";
            accounts: [{
                name: "listState";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: false;
                isSigner: false;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "tcompProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "treeAuthority";
                isMut: false;
                isSigner: false;
            }, {
                name: "merkleTree";
                isMut: true;
                isSigner: false;
            }, {
                name: "logWrapper";
                isMut: false;
                isSigner: false;
            }, {
                name: "compressionProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "bubblegumProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "rentDest";
                isMut: true;
                isSigner: false;
            }];
            args: [{
                name: "nonce";
                type: "u64";
            }, {
                name: "index";
                type: "u32";
            }, {
                name: "root";
                type: {
                    array: ["u8", 32];
                };
            }, {
                name: "dataHash";
                type: {
                    array: ["u8", 32];
                };
            }, {
                name: "creatorHash";
                type: {
                    array: ["u8", 32];
                };
            }];
        } & {
            name: "closeExpiredListing";
        }) | ({
            name: "closeExpiredListing";
            accounts: [{
                name: "listState";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: false;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "tcompProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "treeAuthority";
                isMut: false;
                isSigner: false;
            }, {
                name: "merkleTree";
                isMut: true;
                isSigner: false;
            }, {
                name: "logWrapper";
                isMut: false;
                isSigner: false;
            }, {
                name: "compressionProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "bubblegumProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "nonce";
                type: "u64";
            }, {
                name: "index";
                type: "u32";
            }, {
                name: "root";
                type: {
                    array: ["u8", 32];
                };
            }, {
                name: "dataHash";
                type: {
                    array: ["u8", 32];
                };
            }, {
                name: "creatorHash";
                type: {
                    array: ["u8", 32];
                };
            }];
        } & {
            name: "closeExpiredListing";
        }) | ({
            name: "closeExpiredListing";
            accounts: [{
                name: "listState";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: false;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "tcompProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "treeAuthority";
                isMut: false;
                isSigner: false;
            }, {
                name: "merkleTree";
                isMut: true;
                isSigner: false;
            }, {
                name: "logWrapper";
                isMut: false;
                isSigner: false;
            }, {
                name: "compressionProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "bubblegumProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "nonce";
                type: "u64";
            }, {
                name: "index";
                type: "u32";
            }, {
                name: "root";
                type: {
                    array: ["u8", 32];
                };
            }, {
                name: "dataHash";
                type: {
                    array: ["u8", 32];
                };
            }, {
                name: "creatorHash";
                type: {
                    array: ["u8", 32];
                };
            }];
        } & {
            name: "closeExpiredListing";
        }) | ({
            name: "closeExpiredListing";
            accounts: [{
                name: "listState";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: false;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [];
        } & {
            name: "closeExpiredListing";
        }) | ({
            name: "closeExpiredListing";
            accounts: [{
                name: "listState";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: false;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "tcompProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [];
        } & {
            name: "closeExpiredListing";
        }) | ({
            name: "closeExpiredListing";
            accounts: [{
                name: "listState";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: false;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "tcompProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "treeAuthority";
                isMut: false;
                isSigner: false;
            }, {
                name: "merkleTree";
                isMut: true;
                isSigner: false;
            }, {
                name: "logWrapper";
                isMut: false;
                isSigner: false;
            }, {
                name: "compressionProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "bubblegumProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "nonce";
                type: "u64";
            }, {
                name: "index";
                type: "u32";
            }, {
                name: "root";
                type: {
                    array: ["u8", 32];
                };
            }, {
                name: "dataHash";
                type: {
                    array: ["u8", 32];
                };
            }, {
                name: "creatorHash";
                type: {
                    array: ["u8", 32];
                };
            }];
        } & {
            name: "closeExpiredListing";
        })>;
        tx: {
            ixs: TransactionInstruction[];
            extraSigners: never[];
        };
        treeAuthority: PublicKey;
        assetId: PublicKey;
        listState: PublicKey;
        proofPath: {
            pubkey: PublicKey;
            isSigner: boolean;
            isWritable: boolean;
        }[];
    }>;
    takeBid({ targetData, bidId, merkleTree, proof, root, nonce, index, minAmount, currency, makerBroker, takerBroker, optionalRoyaltyPct, owner, rentDest, seller, delegate, margin, compute, priorityMicroLamports, canopyDepth, whitelist, delegateSigner, cosigner, }: {
        targetData: {
            target: "assetIdOrFvcWithoutField";
            data: {
                metaHash: Buffer;
                creators: Creator[];
                sellerFeeBasisPoints: number;
            };
        } | {
            target: "rest";
            data: {
                metadata: MetadataArgs;
            };
        };
        bidId: PublicKey;
        merkleTree: PublicKey;
        proof: Buffer[];
        root: number[];
        nonce?: BN;
        index: number;
        minAmount: BN;
        currency?: PublicKey | null;
        makerBroker: PublicKey | null;
        takerBroker?: PublicKey | null;
        optionalRoyaltyPct?: number | null;
        owner: PublicKey;
        rentDest: PublicKey;
        seller: PublicKey;
        delegate?: PublicKey;
        margin?: PublicKey | null;
        compute?: number | null;
        priorityMicroLamports?: number | null;
        canopyDepth?: number;
        whitelist?: PublicKey | null;
        delegateSigner?: boolean;
        cosigner?: PublicKey | null;
    }): Promise<{
        builder: any;
        tx: {
            ixs: TransactionInstruction[];
            extraSigners: never[];
        };
        bidState: PublicKey;
        treeAuthority: PublicKey;
        tcomp: PublicKey;
        creators: Creator[];
        proofPath: {
            pubkey: PublicKey;
            isSigner: boolean;
            isWritable: boolean;
        }[];
    }>;
    takeBidLegacy({ bidId, nftMint, nftSellerAcc, owner, rentDest, seller, minAmount, tokenProgram, currency, makerBroker, takerBroker, optionalRoyaltyPct, margin, whitelist, 
    /** pnft args */
    meta, authData, compute, // pnfts are expensive
    ruleSetAddnCompute, priorityMicroLamports, cosigner, }: {
        bidId: PublicKey;
        nftMint: PublicKey;
        nftSellerAcc: PublicKey;
        owner: PublicKey;
        rentDest: PublicKey;
        seller: PublicKey;
        minAmount: BN;
        tokenProgram: PublicKey;
        currency?: PublicKey | null;
        makerBroker: PublicKey | null;
        takerBroker?: PublicKey | null;
        optionalRoyaltyPct?: number | null;
        margin?: PublicKey | null;
        whitelist?: PublicKey | null;
        cosigner?: PublicKey | null;
    } & PnftArgs): Promise<{
        builder: any;
        tx: {
            ixs: TransactionInstruction[];
            extraSigners: PublicKey[];
        };
        bidState: PublicKey;
        tcomp: PublicKey;
        creators: Creator[];
        ownerAtaAcc: PublicKey;
    }>;
    withdrawFees({ lamports, destination, owner, cosigner, }: {
        owner?: PublicKey;
        cosigner?: PublicKey;
        lamports: BN;
        destination: PublicKey;
    }): Promise<{
        builder: import("@coral-xyz/anchor/dist/cjs/program/namespace/methods").MethodsBuilder<TcompIDL, ({
            name: "withdrawFees";
            accounts: [{
                name: "tswap";
                isMut: true;
                isSigner: false;
            }, {
                name: "tcomp";
                isMut: true;
                isSigner: false;
            }, {
                name: "cosigner";
                isMut: false;
                isSigner: true;
                docs: ["We ask also for a signature just to make sure this wallet can actually sign things"];
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "destination";
                isMut: true;
                isSigner: false;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "amount";
                type: "u64";
            }];
        } & {
            name: "withdrawFees";
        }) | ({
            name: "withdrawFees";
            accounts: [{
                name: "tswap";
                isMut: true;
                isSigner: false;
            }, {
                name: "tcomp";
                isMut: true;
                isSigner: false;
            }, {
                name: "cosigner";
                isMut: false;
                isSigner: true;
                docs: ["We ask also for a signature just to make sure this wallet can actually sign things"];
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "destination";
                isMut: true;
                isSigner: false;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "amount";
                type: "u64";
            }];
        } & {
            name: "withdrawFees";
        }) | ({
            name: "withdrawFees";
            accounts: [{
                name: "tswap";
                isMut: true;
                isSigner: false;
            }, {
                name: "tcomp";
                isMut: true;
                isSigner: false;
            }, {
                name: "cosigner";
                isMut: false;
                isSigner: true;
                docs: ["We ask also for a signature just to make sure this wallet can actually sign things"];
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "destination";
                isMut: true;
                isSigner: false;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "amount";
                type: "u64";
            }];
        } & {
            name: "withdrawFees";
        }) | ({
            name: "withdrawFees";
            accounts: [{
                name: "tswap";
                isMut: true;
                isSigner: false;
            }, {
                name: "tcomp";
                isMut: true;
                isSigner: false;
            }, {
                name: "cosigner";
                isMut: false;
                isSigner: true;
                docs: ["We ask also for a signature just to make sure this wallet can actually sign things"];
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "destination";
                isMut: true;
                isSigner: false;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "amount";
                type: "u64";
            }];
        } & {
            name: "withdrawFees";
        }) | ({
            name: "withdrawFees";
            accounts: [{
                name: "tswap";
                isMut: true;
                isSigner: false;
            }, {
                name: "tcomp";
                isMut: true;
                isSigner: false;
            }, {
                name: "cosigner";
                isMut: false;
                isSigner: true;
                docs: ["We ask also for a signature just to make sure this wallet can actually sign things"];
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "destination";
                isMut: true;
                isSigner: false;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "amount";
                type: "u64";
            }];
        } & {
            name: "withdrawFees";
        }) | ({
            name: "withdrawFees";
            accounts: [{
                name: "tswap";
                isMut: true;
                isSigner: false;
            }, {
                name: "tcomp";
                isMut: true;
                isSigner: false;
            }, {
                name: "cosigner";
                isMut: false;
                isSigner: true;
                docs: ["We ask also for a signature just to make sure this wallet can actually sign things"];
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "destination";
                isMut: true;
                isSigner: false;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "amount";
                type: "u64";
            }];
        } & {
            name: "withdrawFees";
        })>;
        tx: {
            ixs: TransactionInstruction[];
            extraSigners: never[];
        };
    }>;
    takeBidT22({ bidId, nftMint, nftSellerAcc, owner, rentDest, seller, minAmount, currency, makerBroker, takerBroker, margin, whitelist, compute, // pnfts are expensive
    priorityMicroLamports, cosigner, }: {
        bidId: PublicKey;
        nftMint: PublicKey;
        nftSellerAcc: PublicKey;
        owner: PublicKey;
        rentDest: PublicKey;
        seller: PublicKey;
        minAmount: BN;
        currency?: PublicKey | null;
        makerBroker: PublicKey | null;
        takerBroker?: PublicKey | null;
        margin?: PublicKey | null;
        whitelist?: PublicKey | null;
        compute?: number | null | undefined;
        priorityMicroLamports?: number | null | undefined;
        cosigner?: PublicKey | null;
    }): Promise<{
        builder: import("@coral-xyz/anchor/dist/cjs/program/namespace/methods").MethodsBuilder<TcompIDL, {
            name: "takeBidT22";
            accounts: [{
                name: "tcomp";
                isMut: true;
                isSigner: false;
            }, {
                name: "seller";
                isMut: true;
                isSigner: true;
            }, {
                name: "bidState";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: false;
            }, {
                name: "takerBroker";
                isMut: true;
                isSigner: false;
                isOptional: true;
            }, {
                name: "makerBroker";
                isMut: true;
                isSigner: false;
                isOptional: true;
            }, {
                name: "marginAccount";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftSellerAcc";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "ownerAtaAcc";
                isMut: true;
                isSigner: false;
            }, {
                name: "tokenProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "associatedTokenProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "tcompProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "tensorswapProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "cosigner";
                isMut: false;
                isSigner: true;
            }, {
                name: "mintProof";
                isMut: false;
                isSigner: false;
                docs: ["intentionally not deserializing, it would be dummy in the case of VOC/FVC based verification"];
            }, {
                name: "rentDest";
                isMut: true;
                isSigner: false;
            }];
            args: [{
                name: "minAmount";
                type: "u64";
            }];
        } & {
            name: "takeBidT22";
        }>;
        tx: {
            ixs: TransactionInstruction[];
            extraSigners: never[];
        };
        bidState: PublicKey;
        tcomp: PublicKey;
        ownerAtaAcc: PublicKey;
    }>;
    takeBidWns({ bidId, nftMint, nftSellerAcc, owner, rentDest, seller, minAmount, collectionMint, currency, makerBroker, takerBroker, margin, whitelist, compute, // pnfts are expensive
    priorityMicroLamports, cosigner, }: {
        bidId: PublicKey;
        nftMint: PublicKey;
        nftSellerAcc: PublicKey;
        owner: PublicKey;
        rentDest: PublicKey;
        seller: PublicKey;
        minAmount: BN;
        collectionMint: PublicKey;
        currency?: PublicKey | null;
        makerBroker: PublicKey | null;
        takerBroker?: PublicKey | null;
        margin?: PublicKey | null;
        whitelist?: PublicKey | null;
        compute?: number | null | undefined;
        priorityMicroLamports?: number | null | undefined;
        cosigner?: PublicKey | null;
    }): Promise<{
        builder: import("@coral-xyz/anchor/dist/cjs/program/namespace/methods").MethodsBuilder<TcompIDL, {
            name: "takeBidWns";
            accounts: [{
                name: "tcomp";
                isMut: true;
                isSigner: false;
            }, {
                name: "seller";
                isMut: true;
                isSigner: true;
            }, {
                name: "bidState";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: false;
            }, {
                name: "takerBroker";
                isMut: true;
                isSigner: false;
                isOptional: true;
            }, {
                name: "makerBroker";
                isMut: true;
                isSigner: false;
                isOptional: true;
            }, {
                name: "marginAccount";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftSellerAcc";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "ownerAtaAcc";
                isMut: true;
                isSigner: false;
            }, {
                name: "tokenProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "associatedTokenProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "tcompProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "tensorswapProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "cosigner";
                isMut: false;
                isSigner: true;
            }, {
                name: "mintProof";
                isMut: false;
                isSigner: false;
                docs: ["intentionally not deserializing, it would be dummy in the case of VOC/FVC based verification"];
            }, {
                name: "rentDest";
                isMut: true;
                isSigner: false;
            }, {
                name: "approveAccount";
                isMut: true;
                isSigner: false;
            }, {
                name: "distribution";
                isMut: true;
                isSigner: false;
            }, {
                name: "wnsProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "distributionProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "extraMetas";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "minAmount";
                type: "u64";
            }];
        } & {
            name: "takeBidWns";
        }>;
        tx: {
            ixs: TransactionInstruction[];
            extraSigners: never[];
        };
        bidState: PublicKey;
        tcomp: PublicKey;
        ownerAtaAcc: PublicKey;
    }>;
    getBidStateRent(): Promise<number>;
    getListStateRent(): Promise<number>;
    getError(name: (typeof IDL_latest)["errors"][number]["name"]): (typeof IDL_latest)["errors"][number];
    getErrorCodeHex(name: (typeof IDL_latest)["errors"][number]["name"]): string;
    parseIxs(tx: TransactionResponse): ParsedTCompIx[];
    getEvent(ix: ParsedTCompIx): TakeEvent | MakeEvent | null;
    getAccountByName(ix: ParsedTCompIx, name: AccountSuffix): ParsedAccount | undefined;
}
export type MakeEvent = {
    type: "maker";
    maker: PublicKey;
    bidId: PublicKey | null;
    target: Target;
    targetId: PublicKey;
    field: Field | null;
    fieldId: PublicKey | null;
    amount: BN;
    quantity: number;
    currency: PublicKey | null;
    expiry: BN;
    privateTaker: PublicKey | null;
    assetId: PublicKey | null;
};
declare class MakeEventRaw {
    maker: PublicKey;
    bidId: PublicKey | null;
    target: number;
    targetId: PublicKey;
    field: number | null;
    fieldId: PublicKey | null;
    amount: BN;
    quantity: number;
    currency: PublicKey | null;
    expiry: BN;
    privateTaker: PublicKey | null;
    assetId: PublicKey | null;
    constructor(fields?: Partial<MakeEventRaw>);
}
export declare const makeEventSchema: Map<typeof MakeEventRaw, {
    kind: string;
    fields: ((string | number[])[] | (string | {
        kind: string;
        type: number[];
    })[] | (string | {
        kind: string;
        type: string;
    })[])[];
}>;
export type TakeEvent = {
    type: "taker";
    taker: PublicKey;
    bidId: PublicKey | null;
    target: Target;
    targetId: PublicKey;
    field: Field | null;
    fieldId: PublicKey | null;
    amount: BN;
    quantity: number;
    tcompFee: BN;
    takerBrokerFee: BN;
    makerBrokerFee: BN;
    creatorFee: BN;
    currency: PublicKey | null;
    assetId: PublicKey | null;
};
export declare class TakeEventRaw {
    taker: PublicKey;
    bidId: PublicKey | null;
    target: number;
    targetId: PublicKey;
    field: number | null;
    fieldId: PublicKey | null;
    amount: BN;
    quantity: number;
    tcompFee: BN;
    takerBrokerFee: BN;
    makerBrokerFee: BN;
    creatorFee: BN;
    currency: PublicKey | null;
    assetId: PublicKey | null;
    constructor(fields?: Partial<TakeEventRaw>);
}
export declare const takeEventSchema: Map<typeof TakeEventRaw, {
    kind: string;
    fields: ((string | number[])[] | (string | {
        kind: string;
        type: number[];
    })[] | (string | {
        kind: string;
        type: string;
    })[])[];
}>;
export type TCompIxName = (typeof IDL_latest)["instructions"][number]["name"];
export type TCompIx = Omit<Instruction, "name"> & {
    name: TCompIxName;
};
export declare const TCOMP_DISC_MAP: Record<"tcompNoop" | "withdrawFees" | "buy" | "buySpl" | "list" | "delist" | "edit" | "bid" | "cancelBid" | "closeExpiredBid" | "closeExpiredListing" | "takeBidMetaHash" | "takeBidFullMeta" | "takeBidLegacy" | "takeBidT22" | "takeBidWns", string>;
export declare function deserializeTcompEvent(data: Buffer): TakeEvent | MakeEvent;
export declare const getTcompRentPayer: ({ rentPayer, owner, }: {
    rentPayer: PublicKey;
    owner: PublicKey;
}) => PublicKey;
export {};
//# sourceMappingURL=sdk.d.ts.map