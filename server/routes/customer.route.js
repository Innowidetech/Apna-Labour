const express = require('express');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const { protect, authorize, optionalAuth } = require('../middleware/auth.middleware');
const { addToCart, getCart, removeFromCart, bookService, bookLabourer, searchServices, getUserProfile, updateCustomerProfile,
    updateUserStatus, getCategories, getSubCategoriesByCategory, getAppliancesBySubCategory, getServiceTypesByAppliance,
    getSpecificServicesByServiceType, getUnitsBySpecificService, createBooking, verifyPayment, markNotificationAsRead,
    markAllNotificationsAsRead, addUnitReview, editUnitReview, deleteUnitReview, getUnitReviews,
    deleteNotification, getHeroByCategory, getSpecificServiceDetails, addToCartItem, getLabourersByType, addLabourerReview,
    createLabourBooking, getLabourBookings, saveSlot, getSpecificLabourDetails, getUserProfileName, deleteAccount,
    getUserBookings, getUserPayments, getUserReviews, getUserNotifications, getAllHelpCenters, getHelpCenterByHeading,
    createRefundRequest, cancelBooking, getBookingDetails
} = require('../controllers/customer.controller')

const router = express.Router();

// router.post('/cart', protect, addToCart);
// router.delete('/cart/remove/:id', protect, removeFromCart);
// router.get('/cart', protect, getCart);
router.post("/cart/:unitId", optionalAuth, addToCart);
router.delete("/cart/remove/:unitId", optionalAuth, removeFromCart);
router.get("/cart", optionalAuth, getCart);
// router.post("/cart/add/:unitId", addToCartItem);
// router.post('/book-service', protect, authorize('Customer'), bookService);
// router.post('/book-labourer', protect, authorize('Customer'), bookLabourer);
router.get('/search-services', protect, authorize('Customer'), searchServices);

router.get("/categories", getCategories);
router.get("/categories/subcategories/:id", getSubCategoriesByCategory);
router.get("/subcategories/appliances/:id", getAppliancesBySubCategory);
router.get("/appliances/services/:id", getServiceTypesByAppliance);
router.get("/services/specific-services/:id", getSpecificServicesByServiceType);
router.get("/specific-services/units/:id", getUnitsBySpecificService);
router.get('/hero/:id', getHeroByCategory);

router.get('/profile', protect, authorize('Customer'), getUserProfile);
router.get("/bookings", protect, authorize('Customer'), getUserBookings);
router.get("/payments", protect, authorize('Customer'), getUserPayments);
router.get("/details/:bookingId", protect, getBookingDetails);
router.get("/reviews", protect, authorize('Customer'), getUserReviews);
router.get("/notifications", protect, authorize('Customer'), getUserNotifications);
router.delete("/delete-account", protect, authorize('Customer'), deleteAccount);

router.get('/profile/name', protect, authorize('Customer'), getUserProfileName);
router.put("/profile", protect, authorize("Customer"), upload.single("image"), updateCustomerProfile);
router.patch("/status", protect, authorize("Customer"), updateUserStatus);

router.post("/bookings/create", protect, createBooking);
router.post("/bookings/slot", protect, saveSlot);
//router.post("/bookings/verify", protect, verifyPayment);

router.put("/:id/read", protect, authorize("Customer"), markNotificationAsRead);
router.put("/mark-all-read", protect, authorize("Customer"), markAllNotificationsAsRead);
router.delete("/notifications/:id", protect, authorize("Customer"), deleteNotification);

router.post("/unit/:unitId", protect, authorize("Customer"), addUnitReview);
router.post('/labourers/:labourerId', protect, authorize('Customer'), addLabourerReview);
router.put("/unit/:reviewId", protect, authorize("Customer"), editUnitReview);
router.delete("/unit/:reviewId", protect, authorize("Customer"), deleteUnitReview);
router.get("/unit/:unitId", protect, authorize("Customer"), getUnitReviews);
router.get("/specific-serviceDetails/:id", getSpecificServiceDetails);
router.get("/specific-labourerDetails/:id", getSpecificLabourDetails);


router.post("/cancellation/:id", protect, authorize("Customer"), cancelBooking);
router.get('/labourers/type/:type', optionalAuth, getLabourersByType);

router.post('/labour-booking', protect, authorize('Customer'), createLabourBooking);
router.get('/labour-booking/my-bookings', protect, authorize('Customer'), getLabourBookings);

router.get("/accordian", protect, getAllHelpCenters);
router.get('/get-help-center/:heading', getHelpCenterByHeading);
router.put("/cancel/:bookingId", protect, cancelBooking);
router.post("/refund/create", protect, createRefundRequest);

module.exports = router;

