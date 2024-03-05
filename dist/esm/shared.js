import { getAssociatedTokenAddressSync, TOKEN_PROGRAM_ID, } from "@solana/spl-token";
import Mexp from "math-expression-evaluator";
export const DEFAULT_COMPUTE_UNITS = 200000;
export const DEFAULT_XFER_COMPUTE_UNITS = 400000; // cNFT xfers eg in sell now w/ margin more expensive
export const DEFAULT_MICRO_LAMPORTS = 5000;
export const DEFAULT_RULESET_ADDN_COMPUTE_UNITS = 400000;
export const evalMathExpr = (str) => {
    const mexp = new Mexp();
    return mexp.eval(str, [], {});
};
//todo: move to common
export const findAta = (mint, owner) => {
    return findAtaWithProgramId(mint, owner, TOKEN_PROGRAM_ID);
};
export const findAtaWithProgramId = (mint, owner, programId) => {
    return getAssociatedTokenAddressSync(mint, owner, true, programId);
};
//# sourceMappingURL=shared.js.map