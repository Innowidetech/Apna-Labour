const express = require('express');
const { getServices, getProfessionalLabourers, getAllSpecificServices } = require('../controllers/user.controller');
const router = express.Router();



router.get('/services', getServices);
router.get('/professional', getProfessionalLabourers);
router.get("/specific-services", getAllSpecificServices);


module.exports = router;
