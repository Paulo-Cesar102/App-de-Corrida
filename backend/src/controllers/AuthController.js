const authService = require('../services/AuthService');

class AuthController {
  async register(req, res) {
    try {
      const user = await authService.register(req.body);
      return res.status(201).json({
        message: 'Usuário registrado com sucesso!',
        user,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async login(req, res) {
    try {
      const { identifier, password } = req.body;
      const { token, user } = await authService.login(identifier, password);
      return res.status(200).json({
        message: 'Login bem-sucedido!',
        token,
        user
      });
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }
}

module.exports = new AuthController();
