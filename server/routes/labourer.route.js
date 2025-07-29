const express = require('express');
const {protect} = require('../middleware/auth.middleware');
const { getProfile } = require('../controllers/labourer.controller');
const router = express.Router();

router.get('/profile', protect, getProfile);

module.exports = router