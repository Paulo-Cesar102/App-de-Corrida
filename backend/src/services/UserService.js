const userRepository = require('../repositories/UserRepository');

class UserService {
  async getUserStats(userId) {
    const user = await userRepository.findById(userId);
    if (!user) throw new Error("Usuário não encontrado.");

    const totalDistance = user.runs.reduce((acc, run) => acc + run.distance, 0);
    const totalDuration = user.runs.reduce((acc, run) => acc + run.duration, 0);
    const totalRuns = user.runs.length;

    return {
      name: user.name,
      avatarUrl: user.avatarUrl,
      bio: user.bio,
      balance: user.balance,
      role: user.role,
      stats: {
        totalDistanceKm: parseFloat((totalDistance / 1000).toFixed(2)),
        totalDurationHrs: parseFloat((totalDuration / 3600).toFixed(2)),
        totalRuns,
        averagePace: totalDistance > 0 ? parseFloat(((totalDuration / 60) / (totalDistance / 1000)).toFixed(2)) : 0
      }
    };
  }
}

module.exports = new UserService();
