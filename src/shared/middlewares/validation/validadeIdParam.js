const {
  sendValidationError,
} = require("../../middlewares/errors/validationErrorResponse");

function validateIdParam(req, res, next) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return sendValidationError(res, [
      { field: "id", issue: "ID must be a positive integer." },
    ]);
  }

  req.params.id = id;
  next();
}

module.exports = validateIdParam;
