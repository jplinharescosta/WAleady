const {
  sendValidationError,
} = require("../../middlewares/errors/validationErrorResponse");

function validatePagination(req, res, next) {
  let limit = req.query.limit !== undefined ? Number(req.query.limit) : 10;
  let offset = req.query.offset !== undefined ? Number(req.query.offset) : 0;
  let errors = [];

  if (!Number.isInteger(limit) || limit < 1 || limit > 100) {
    errors.push({
      field: "limit",
      issue: "Limit must be an integer between 1 and 100.",
    });
  }

  if (!Number.isInteger(offset) || offset < 0) {
    errors.push({
      field: "page",
      issue: "Page must be a non-negative integer.",
    });
  }

  if (errors.length > 0) {
    return sendValidationError(res, errors);
  }

  req.pagination = { limit, offset };
  next();
}

module.exports = validatePagination;
