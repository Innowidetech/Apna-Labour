const express = require('express');
const { protect, authorize } = require('../middleware/auth.middleware');
const { getAllUsers, approveLabourerRegistrationAndSendTrainingDetails, getTrainingDetailsAndLabourers, setTrainingCompleted,
    createOrAddCategory, createOrAddSubcategory, createOrAddServiceType, getCategory, getSubCategory, getServiceType,
    delServiceType, getAllLabourers, acceptApplicant, getAcceptedLabourers
} = require('../controllers/admin.controller');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

router.get('/users', protect, authorize('Admin'), getAllUsers);
router.post('/approve-registration/:id', protect, authorize('Admin'), approveLabourerRegistrationAndSendTrainingDetails);
router.get('/training-details', protect, authorize('Admin'), getTrainingDetailsAndLabourers);
router.patch('/training-status/:id', protect, authorize('Admin'), setTrainingCompleted);

// router.post('/service', protect, upload.fields([{ name: 'categoryImage', maxCount: 1 }, { name: 'subCategoryImage', maxCount: 1 }, { name: 'serviceTypeImage', maxCount: 1 }]), createOrAddService);

router.post('/category', protect, authorize('Admin'), upload.fields([{ name: 'categoryImage', maxCount: 1 }]), createOrAddCategory);
router.post('/sub-category', protect, authorize('Admin'), upload.fields([{ name: 'subCategoryImage', maxCount: 1 }]), createOrAddSubcategory);
router.post('/service-type', protect, authorize('Admin'), upload.fields([{ name: 'serviceTypeImage', maxCount: 1 }]), createOrAddServiceType);

router.get('/category', protect, authorize('Admin', 'Customer'), getCategory);
router.get('/sub-category', protect, authorize('Admin', 'Customer'), getSubCategory);
router.get('/service-type', protect, authorize('Admin', 'Customer'), getServiceType);
router.delete('/service-type/:id', protect, authorize('Admin'), delServiceType);

router.get('/labourers', protect, authorize('Admin'), getAllLabourers);
router.patch('/accept-applicant/:id', protect, authorize('Admin'), acceptApplicant);
router.get('/labourers/accepted', protect, authorize('Admin'), getAcceptedLabourers);


module.exports = router;
