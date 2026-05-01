const express = require('express');
const announcementController = require('../controllers/AnnouncementController');

const router = express.Router();

router.get('/active', announcementController.listActive);
router.post('/admin/create', announcementController.create);

module.exports = router;
