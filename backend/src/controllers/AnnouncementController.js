const announcementService = require('../services/AnnouncementService');

class AnnouncementController {
  async listActive(req, res) {
    try {
      const announcements = await announcementService.getActiveAnnouncements();
      return res.json(announcements);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async create(req, res) {
    try {
      const { message } = req.body;
      const announcement = await announcementService.createAnnouncement({ message });
      return res.status(201).json(announcement);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new AnnouncementController();
