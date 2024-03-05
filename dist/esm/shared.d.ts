import { PublicKey } from "@solana/web3.js";
export declare const DEFAULT_COMPUTE_UNITS = 200000;
export declare const DEFAULT_XFER_COMPUTE_UNITS = 400000;
export declare const DEFAULT_MICRO_LAMPORTS = 5000;
export declare const DEFAULT_RULESET_ADDN_COMPUTE_UNITS = 400000;
export type AccountSuffix = "Bid State" | "List State" | "Owner" | "Buyer" | "Seller" | "Delegate" | "Payer" | "Margin Account" | "Taker Broker" | "Maker Broker" | "Whitelist";
export declare const evalMathExpr: (str: string) => number;
export declare const findAta: (mint: PublicKey, owner: PublicKey) => PublicKey;
export declare const findAtaWithProgramId: (mint: PublicKey, owner: PublicKey, programId: PublicKey) => PublicKey;
//# sourceMappingURL=shared.d.ts.map