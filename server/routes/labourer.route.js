const express = require('express');
const { protect } = require('../middleware/auth.middleware');
const { getProfile, registerLabourer, createContact, addTeamMember } = require('../controllers/labourer.controller');
const router = express.Router();

router.get('/profile', protect, getProfile);
router.post('/register', registerLabourer);
router.post('/contact', createContact);
router.post('/add-team-member', addTeamMember);

module.exports = router;