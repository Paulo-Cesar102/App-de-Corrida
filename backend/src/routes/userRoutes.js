const express = require('express');
const userController = require('../controllers/UserController');

const router = express.Router();

router.get('/:userId/stats', userController.getStats);

module.exports = router;
