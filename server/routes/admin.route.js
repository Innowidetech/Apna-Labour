const express = require('express');
const { protect, authorize } = require('../middleware/auth.middleware');
const { getAllUsers, approveLabourerTraining, completeTraining,
    createCategory, createSubCategory, createAppliance, createServiceType, createSpecificService, createUnit, getCategories,
    getSubCategoriesByCategory, getAppliancesBySubCategory, getServiceTypesByAppliance, getSpecificServicesByServiceType, getUnitsBySpecificService,
    delServiceType, getAllLabourers, getAcceptedLabourers, createNotificationForAll, getContacts, createHeroSection,
    createHeroAppliance, createHelpCenter, getAllHelpCenters, updateUnit, deleteUnit, createNotificationForUser,
    getAdminDashboard, getAdminProfile, getBookingsByDate, getTop4DemandingServicesByMonth, getCustomerDetailsByUserId,
    getFilteredCustomers, getProfessionalLabourers, getIndividualLabourers, getTeamLabourers, getProfessionalLabourerDetails,
    getIndividualTeamLabourerDetails, getSuspendedAccounts, suspendLabour, rejectTraining, filterLabourers, getPendingLabourers,
    getPendingLabourRequests, getCounts, getAllSpecificServices, getSpecificServiceDetails, getGeneralEnquiries,
    getAccountBillingEnquiries, getFeedbacks, replyToContact, markAsRead, getAllRefunds, getBookingDetailsById
} = require('../controllers/admin.controller');
const multer = require('multer');
const { route } = require('./customer.route');
const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

router.get('/users', protect, authorize('Admin'), getAllUsers);
// router.post('/service', protect, upload.fields([{ name: 'categoryImage', maxCount: 1 }, { name: 'subCategoryImage', maxCount: 1 }, { name: 'serviceTypeImage', maxCount: 1 }]), createOrAddService);

router.post('/category', protect, authorize('Admin'), upload.fields([{ name: 'image', maxCount: 1 }]), createCategory);
router.post('/sub-category', protect, authorize('Admin'), upload.fields([{ name: 'image', maxCount: 1 }]), createSubCategory);
router.post('/appliances', protect, authorize('Admin'), upload.fields([{ name: 'image', maxCount: 1 }]), createAppliance);
router.post('/service-type', protect, authorize('Admin'), upload.fields([{ name: 'image', maxCount: 1 }]), createServiceType);
router.post('/specific-services', protect, authorize('Admin'), upload.fields([{ name: 'image', maxCount: 1 }]), createSpecificService);
router.post("/units", protect, authorize("Admin"), upload.fields([{ name: "image", maxCount: 1 }]), createUnit);


router.delete('/delete-unit/:unitId', protect, authorize("Admin"), deleteUnit);

router.post('/hero', protect, authorize('Admin'), upload.fields([{ name: 'image', maxCount: 1 }]), createHeroSection);
router.post("/hero-appliance", protect, authorize("Admin"), upload.fields([{ name: "image", maxCount: 1 }]), createHeroAppliance);

router.post('/notifications', protect, authorize('Admin'), createNotificationForAll);
router.post('/notifications/send', protect, authorize('Admin'), createNotificationForUser);

router.delete('/service-type/:id', protect, authorize('Admin'), delServiceType);



router.post("/accordian", protect, authorize('Admin'), createHelpCenter);

router.get("/contacts", protect, authorize("Admin"), getContacts);

// admin

router.get("/dashboard", protect, authorize("Admin"), getAdminDashboard);
router.get('/profile', protect, getAdminProfile);
router.get("/bookings/by-date", protect, authorize("Admin"), getBookingsByDate);
router.get("/:bookingId/details", protect, authorize("Admin"), getBookingDetailsById)
router.get('/booking/:userId/details', protect, authorize('Admin'), getCustomerDetailsByUserId);
router.get("/most-demanding-services", protect, authorize("Admin"), getTop4DemandingServicesByMonth);
router.get("/all/customers/filter", protect, authorize("Admin"), getFilteredCustomers); //?city=Karimnagar&status=Active
router.get("/labourers/professional/:userId", protect, authorize("Admin"), getProfessionalLabourerDetails);
router.get("/labourer/individual-team/:userId", protect, authorize("Admin"), getIndividualTeamLabourerDetails);
router.get("/suspended-accounts", protect, authorize("Admin"), getSuspendedAccounts);
router.put("/toggle-suspend/:userId", protect, authorize("Admin"), suspendLabour);

router.get("/professional", getProfessionalLabourers);
router.get("/individual", getIndividualLabourers);
router.get("/team", getTeamLabourers);

// Training Management
router.post('/approve-registration/:id', protect, authorize('Admin'), approveLabourerTraining);
router.patch('/training-completed/:id', protect, authorize('Admin'), completeTraining);
router.patch('/reject-training/:id', protect, authorize('Admin'), rejectTraining);
router.get('/labourers', protect, authorize('Admin'), getAllLabourers);
router.get('/labourers/accepted', protect, authorize('Admin'), getAcceptedLabourers);
router.get('/New-Labourer-Registration/pending', getPendingLabourers);//? serviceCity=Nagpur&registrationType=Individual
router.get("/Assigned-Training/filter", protect, authorize("Admin"), filterLabourers);// ?registrationType=Team&serviceCity=Mumbai&trainingStatus=Completed
router.get("/pending-labour-requests", protect, authorize("Admin"), getPendingLabourRequests);


// Service Management
router.get('/sevices/count', protect, authorize('Admin'), getCounts);
router.get('/specific-services/info', protect, authorize('Admin'), getAllSpecificServices);// ?categoryId=68ce4005590c8b52ff28d84e&minRating=0&page=1&limit=10
router.get('/specific-services/unit/info/:specificServiceId', protect, authorize('Admin'), getSpecificServiceDetails);
router.put('/update-unit/:unitId', protect, authorize("Admin"), upload.fields([{ name: "image", maxCount: 1 }]), updateUnit);




// Reports and Analytics
// Refund Management
// Queries
router.get('/contact/general-enquiry', protect, authorize("Admin"), getGeneralEnquiries);
router.get('/contact/account-billing-enquiry', getAccountBillingEnquiries);
router.get('/contact/feedback', getFeedbacks);
router.post("/contact/:id/reply", protect, authorize("Admin"), replyToContact);
router.put("/contact/:id/read", protect, authorize("Admin"), markAsRead);

router.get("/refund", getAllRefunds);



module.exports = router;
