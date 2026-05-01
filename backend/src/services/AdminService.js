const adminRepository = require('../repositories/AdminRepository');

class AdminService {
  async getDashboardStats() {
    const [totalUsers, totalParticipants, adminProfit] = await Promise.all([
      adminRepository.getTotalUsers(),
      adminRepository.getTotalParticipants(),
      adminRepository.getAdminProfit()
    ]);

    return {
      totalUsers,
      totalParticipants,
      adminProfit: parseFloat(adminProfit.toFixed(2))
    };
  }
}

module.exports = new AdminService();
