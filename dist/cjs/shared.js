"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAtaWithProgramId = exports.findAta = exports.evalMathExpr = exports.DEFAULT_RULESET_ADDN_COMPUTE_UNITS = exports.DEFAULT_MICRO_LAMPORTS = exports.DEFAULT_XFER_COMPUTE_UNITS = exports.DEFAULT_COMPUTE_UNITS = void 0;
const spl_token_1 = require("@solana/spl-token");
const math_expression_evaluator_1 = __importDefault(require("math-expression-evaluator"));
exports.DEFAULT_COMPUTE_UNITS = 200000;
exports.DEFAULT_XFER_COMPUTE_UNITS = 400000; // cNFT xfers eg in sell now w/ margin more expensive
exports.DEFAULT_MICRO_LAMPORTS = 5000;
exports.DEFAULT_RULESET_ADDN_COMPUTE_UNITS = 400000;
const evalMathExpr = (str) => {
    const mexp = new math_expression_evaluator_1.default();
    return mexp.eval(str, [], {});
};
exports.evalMathExpr = evalMathExpr;
//todo: move to common
const findAta = (mint, owner) => {
    return (0, exports.findAtaWithProgramId)(mint, owner, spl_token_1.TOKEN_PROGRAM_ID);
};
exports.findAta = findAta;
const findAtaWithProgramId = (mint, owner, programId) => {
    return (0, spl_token_1.getAssociatedTokenAddressSync)(mint, owner, true, programId);
};
exports.findAtaWithProgramId = findAtaWithProgramId;
//# sourceMappingURL=shared.js.map