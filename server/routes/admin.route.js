const express = require('express');
const { protect, authorize } = require('../middleware/auth.middleware');
const { getAllUsers, approveLabourerRegistrationAndSendTrainingDetails, getTrainingDetailsAndLabourers, setTrainingCompleted,
    createCategory, createSubCategory, createAppliance, createServiceType, createSpecificService, createUnit, getCategories,
    getSubCategoriesByCategory, getAppliancesBySubCategory, getServiceTypesByAppliance, getSpecificServicesByServiceType, getUnitsBySpecificService,
    delServiceType, getAllLabourers, acceptApplicant, getAcceptedLabourers, createNotificationForAll, getContacts, createHeroSection,
    createHeroAppliance, markTrainingCompleted, createHelpCenter, getAllHelpCenters, updateUnit, deleteUnit, createNotificationForUser
} = require('../controllers/admin.controller');
const multer = require('multer');
const { route } = require('./customer.route');
const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

router.get('/users', protect, authorize('Admin'), getAllUsers);
router.post('/approve-registration/:id', protect, authorize('Admin'), approveLabourerRegistrationAndSendTrainingDetails);
router.get('/training-details', protect, authorize('Admin'), getTrainingDetailsAndLabourers);
router.patch('/training-status/:id', protect, authorize('Admin'), setTrainingCompleted);

// router.post('/service', protect, upload.fields([{ name: 'categoryImage', maxCount: 1 }, { name: 'subCategoryImage', maxCount: 1 }, { name: 'serviceTypeImage', maxCount: 1 }]), createOrAddService);

router.post('/category', protect, authorize('Admin'), upload.fields([{ name: 'image', maxCount: 1 }]), createCategory);
router.post('/sub-category', protect, authorize('Admin'), upload.fields([{ name: 'image', maxCount: 1 }]), createSubCategory);
router.post('/appliances', protect, authorize('Admin'), upload.fields([{ name: 'image', maxCount: 1 }]), createAppliance);
router.post('/service-type', protect, authorize('Admin'), upload.fields([{ name: 'image', maxCount: 1 }]), createServiceType);
router.post('/specific-services', protect, authorize('Admin'), upload.fields([{ name: 'image', maxCount: 1 }]), createSpecificService);
router.post("/units", protect, authorize("Admin"), upload.fields([{ name: "image", maxCount: 1 }]), createUnit);

router.put('/update-unit/:unitId', protect, authorize("Admin"), upload.fields([{ name: "image", maxCount: 1 }]), updateUnit);

router.delete('/delete-unit/:unitId', protect, authorize("Admin"), deleteUnit);

router.post('/hero', protect, authorize('Admin'), upload.fields([{ name: 'image', maxCount: 1 }]), createHeroSection);
router.post("/hero-appliance", protect, authorize("Admin"), upload.fields([{ name: "image", maxCount: 1 }]), createHeroAppliance);

router.post('/notifications', protect, authorize('Admin'), createNotificationForAll);
router.post('/notifications/send', protect, authorize('Admin'), createNotificationForUser);

router.delete('/service-type/:id', protect, authorize('Admin'), delServiceType);

router.get('/labourers', protect, authorize('Admin'), getAllLabourers);
router.patch('/accept-applicant/:id', protect, authorize('Admin'), acceptApplicant);
router.patch('/training-completed/:id', protect, authorize('Admin'), markTrainingCompleted);
router.get('/labourers/accepted', protect, authorize('Admin'), getAcceptedLabourers);

router.post("/accordian", protect, authorize('Admin'), createHelpCenter);

router.get("/contacts", protect, authorize("Admin"), getContacts);
module.exports = router;
