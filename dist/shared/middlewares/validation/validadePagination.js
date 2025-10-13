"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePagination = validatePagination;
const validationErrorResponse_1 = require("../errors/validationErrorResponse");
function validatePagination(req, res, next) {
  const page = req.query.page !== undefined ? Number(req.query.page) : 1;
  const limit = req.query.limit !== undefined ? Number(req.query.limit) : 10;
  const errors = [];
  if (!Number.isInteger(page) || page < 1) {
    errors.push({
      field: "page",
      issue: "Page must be a positive integer.",
    });
  }
  if (!Number.isInteger(limit) || limit < 1 || limit > 100) {
    errors.push({
      field: "limit",
      issue: "Limit must be an integer between 1 and 100.",
    });
  }
  if (errors.length > 0) {
    (0, validationErrorResponse_1.sendValidationError)(res, errors);
    return;
  }
  req.pagination = { page, limit };
  next();
}
//# sourceMappingURL=validadePagination.js.map
