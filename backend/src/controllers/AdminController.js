const adminService = require('../services/AdminService');

class AdminController {
  async getStats(req, res) {
    try {
      const stats = await adminService.getDashboardStats();
      return res.json(stats);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new AdminController();
