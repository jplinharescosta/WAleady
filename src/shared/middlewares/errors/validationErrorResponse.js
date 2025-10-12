// src/middlewares/errors/validationErrorResponse.js

/**
 * Normaliza os detalhes do erro para um array de objetos { field, issue }.
 * Aceita:
 *  - { field: 'limit', issue: 'must be an integer' }
 *  - [{ field: 'limit', issue: '...' }, { field: 'offset', issue: '...' }]
 *  - strings simples (vira issue genérica)
 */
function normalizeDetails(details) {
  if (!details) return [];

  // Se for string, converte para objeto padrão
  if (typeof details === "string") {
    return [{ field: null, issue: details }];
  }

  // Se for um objeto único com field/issue, coloca em array
  if (!Array.isArray(details) && typeof details === "object") {
    const { field = null, issue = "invalid" } = details;
    return [{ field, issue }];
  }

  // Se for array, mapeia garantindo o shape
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
 * Envia uma resposta padronizada de validação.
 * @param {object} res - Express Response
 * @param {Array|Object|String} details - Detalhes de erro
 * @param {String} message - Mensagem principal
 * @param {Number} status - HTTP status code (default 400)
 */
function sendValidationError(
  res,
  details,
  message = "Invalid data provided.",
  status = 400
) {
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

module.exports = {
  sendValidationError,
};
