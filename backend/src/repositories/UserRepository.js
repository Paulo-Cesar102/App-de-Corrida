const prisma = require('../../database/index');

class UserRepository {
  async findById(id) {
    return await prisma.user.findUnique({
      where: { id },
      include: {
        runs: true,
      }
    });
  }

  async update(id, data) {
    return await prisma.user.update({
      where: { id },
      data
    });
  }
}

module.exports = new UserRepository();
