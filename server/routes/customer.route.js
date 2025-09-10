const express = require('express');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const { protect, authorize } = require('../middleware/auth.middleware');
const { addToCart, getCart, removeFromCart, bookService, bookLabourer, searchServices, getProfile, updateCustomerProfile,
    updateUserStatus, getCategories, getSubCategoriesByCategory, getAppliancesBySubCategory, getServiceTypesByAppliance,
    getSpecificServicesByServiceType, getUnitsBySpecificService, createBooking, verifyPayment } = require('../controllers/customer.controller')

const router = express.Router();

router.post('/cart', protect, addToCart);
router.delete('/cart/remove/:unitId', protect, removeFromCart);
router.get('/cart', protect, getCart);
router.post('/book-service', protect, authorize('Customer'), bookService);
router.post('/book-labourer', protect, authorize('Customer'), bookLabourer);
router.get('/search-services', protect, authorize('Customer'), searchServices);
router.get('/profile', protect, authorize('Customer'), getProfile);

router.get("/categories", protect, authorize('Customer'), getCategories);
router.get("/categories/:categoryId/subcategories", protect, getSubCategoriesByCategory);
router.get("/subcategories/:subCategoryId/appliances", protect, getAppliancesBySubCategory);
router.get("/appliances/:applianceId/services", protect, getServiceTypesByAppliance);
router.get("/services/:serviceTypeId/specific-services", protect, getSpecificServicesByServiceType);
router.get("/specific-services/:specificServiceId/units", protect, getUnitsBySpecificService);

router.put("/profile", protect, authorize("Customer"), upload.single("image"), updateCustomerProfile);
router.patch("/:id/status", protect, authorize("Customer"), updateUserStatus);

// Step 1: Create booking or Razorpay order
router.post("/bookings/create", protect, createBooking);
// Step 2: Verify payment for Razorpay
router.post("/bookings/verify", protect, verifyPayment);
module.exports = router;

