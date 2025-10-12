"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendValidationError = sendValidationError;
/**
 * Normalizes error details to an array of objects { field, issue }.
 * Accepts:
 *  - { field: 'limit', issue: 'must be an integer' }
 *  - [{ field: 'limit', issue: '...' }, { field: 'offset', issue: '...' }]
 *  - simple strings (becomes generic issue)
 */
function normalizeDetails(details) {
    if (!details)
        return [];
    // If it's a string, convert to default object
    if (typeof details === "string") {
        return [{ field: null, issue: details }];
    }
    // If it's a single object with field/issue, put in array
    if (!Array.isArray(details) && typeof details === "object") {
        const { field = null, issue = "invalid" } = details;
        return [{ field, issue }];
    }
    // If it's an array, map ensuring the shape
    if (Array.isArray(details)) {
        return details.map((d) => {
            if (typeof d === "string") {
                return { field: null, issue: d };
            }
            if (typeof d === "object") {
                const { field = null, issue = "invalid" } = d;
                return { field, issue };
            }
            return { field: null, issue: "invalid" };
        });
    }
    return [];
}
/**
 * Sends a standardized validation response.
 * @param res - Express Response
 * @param details - Error details
 * @param message - Main message
 * @param status - HTTP status code (default 400)
 */
function sendValidationError(res, details, message = "Invalid data provided.", status = 400) {
    const normalized = normalizeDetails(details);
    return res.status(status).json({
        success: false,
        error: {
            code: "VALIDATION_ERROR",
            message,
            details: normalized,
        },
    });
}
//# sourceMappingURL=validationErrorResponse.js.map