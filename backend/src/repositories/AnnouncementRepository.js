const prisma = require('../../database/index');

class AnnouncementRepository {
  async findActive() {
    return await prisma.announcement.findMany({
      where: { active: true },
      orderBy: { createdAt: 'desc' }
    });
  }

  async create(data) {
    return await prisma.announcement.create({
      data
    });
  }
}

module.exports = new AnnouncementRepository();
