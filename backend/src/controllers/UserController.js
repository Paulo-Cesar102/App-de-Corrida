const userService = require('../services/UserService');

class UserController {
  async getStats(req, res) {
    try {
      const { userId } = req.params;
      const stats = await userService.getUserStats(parseInt(userId, 10));
      return res.status(200).json({ success: true, data: stats });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }
}

module.exports = new UserController();
