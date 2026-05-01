const announcementRepository = require('../repositories/AnnouncementRepository');

class AnnouncementService {
  async getActiveAnnouncements() {
    return await announcementRepository.findActive();
  }

  async createAnnouncement(data) {
    if (!data.message) {
      throw new Error('A mensagem do aviso é obrigatória.');
    }
    return await announcementRepository.create(data);
  }
}

module.exports = new AnnouncementService();
