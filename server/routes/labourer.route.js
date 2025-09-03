const express = require('express');
const { protect } = require('../middleware/auth.middleware');
const { getProfile, registerLabourer } = require('../controllers/labourer.controller');
const router = express.Router();

router.get('/profile', protect, getProfile);
router.post('/register', registerLabourer);
module.exports = router