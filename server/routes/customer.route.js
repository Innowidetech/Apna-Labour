const express = require('express');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const { protect, authorize } = require('../middleware/auth.middleware');
const { addToCart, getCart, removeFromCart, bookService, bookLabourer, searchServices, getProfile, updateCustomerProfile,
    updateUserStatus, getCategories, getSubCategoriesByCategory, getAppliancesBySubCategory, getServiceTypesByAppliance,
    getSpecificServicesByServiceType, getUnitsBySpecificService, createBooking, verifyPayment, markNotificationAsRead,
    markAllNotificationsAsRead, addUnitReview, editUnitReview, deleteUnitReview, getUnitReviews, cancelBooking,
    deleteNotification } = require('../controllers/customer.controller')

const router = express.Router();

router.post('/cart', protect, addToCart);
router.delete('/cart/remove/:unitId', protect, removeFromCart);
router.get('/cart', protect, getCart);
router.post('/book-service', protect, authorize('Customer'), bookService);
router.post('/book-labourer', protect, authorize('Customer'), bookLabourer);
router.get('/search-services', protect, authorize('Customer'), searchServices);

router.get("/categories", getCategories);
router.get("/categories/subcategories/:id", getSubCategoriesByCategory);
router.get("/subcategories/appliances/:id", getAppliancesBySubCategory);
router.get("/appliances/services/:id", getServiceTypesByAppliance);
router.get("/services/specific-services/:id", getSpecificServicesByServiceType);
router.get("/specific-services/units/:id", getUnitsBySpecificService);

router.get('/profile', protect, authorize('Customer'), getProfile);
router.put("/profile", protect, authorize("Customer"), upload.single("image"), updateCustomerProfile);
router.patch("/:id/status", protect, authorize("Customer"), updateUserStatus);

router.post("/bookings/create", protect, createBooking);
router.post("/bookings/verify", protect, verifyPayment);

router.put("/:id/read", protect, authorize("Customer"), markNotificationAsRead);
router.put("/mark-all-read", protect, authorize("Customer"), markAllNotificationsAsRead);
router.delete("/notifications/:id", protect, authorize("Customer"), deleteNotification);

router.post("/unit/:unitId", protect, authorize("Customer"), addUnitReview);
router.put("/unit/:reviewId", protect, authorize("Customer"), editUnitReview);
router.delete("/unit/:reviewId", protect, authorize("Customer"), deleteUnitReview);
router.get("/unit/:unitId", protect, authorize("Customer"), getUnitReviews);

router.post("/cancellation/:id", protect, authorize("Customer"), cancelBooking);

module.exports = router;

