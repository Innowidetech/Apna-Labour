const express = require('express');
const { protect } = require('../middleware/auth.middleware');
const { getAllUsers, approveLabourerRegistrationAndSendTrainingDetails, getTrainingDetailsAndLabourers, setTrainingCompleted, createOrAddService } = require('../controllers/admin.controller');
const multer = require('multer');
const upload = multer({storage:multer.memoryStorage()});
const router = express.Router();

router.get('/users', protect, getAllUsers);
router.post('/approve-registration/:id', protect, approveLabourerRegistrationAndSendTrainingDetails);
router.get('/training-details', protect, getTrainingDetailsAndLabourers);
router.patch('/training-status/:id', protect, setTrainingCompleted);

router.post('/service', protect, upload.fields([{ name: 'categoryImage', maxCount: 1 }, { name: 'subCategoryImage', maxCount: 1 }, { name: 'serviceTypeImage', maxCount: 1 }]), createOrAddService);


module.exports = router;
