const prisma = require('../../database/index');

class AuthRepository {
  async findByEmail(email) {
    return await prisma.user.findUnique({ where: { email } });
  }

  async findByPhone(phone) {
    return await prisma.user.findUnique({ where: { phone } });
  }

  async findByIdentifier(identifier) {
    return await prisma.user.findFirst({
      where: {
        OR: [
          { email: identifier },
          { phone: identifier }
        ]
      }
    });
  }

  async createUser(data) {
    return await prisma.user.create({ data });
  }
}

module.exports = new AuthRepository();
