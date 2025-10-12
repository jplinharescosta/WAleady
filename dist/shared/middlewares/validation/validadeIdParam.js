"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateIdParam = validateIdParam;
const validationErrorResponse_1 = require("../errors/validationErrorResponse");
function validateIdParam(req, res, next) {
    const id = req.params.id;
    // For TypeScript migration, we'll keep IDs as strings (UUIDs are common in modern apps)
    if (!id || typeof id !== 'string' || id.trim().length === 0) {
        (0, validationErrorResponse_1.sendValidationError)(res, [
            { field: "id", issue: "ID must be a non-empty string." },
        ]);
        return;
    }
    next();
}
//# sourceMappingURL=validadeIdParam.js.map