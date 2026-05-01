/**
 * Middleware de Logger
 * 
 * Intercepta as requisições HTTP antes de chegarem aos controllers.
 * Útil para autenticação, logs, validações globais, etc.
 */
const loggerMiddleware = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next(); // Passa o controle para o próximo middleware ou controller
};

module.exports = loggerMiddleware;
