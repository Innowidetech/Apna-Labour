const express = require('express');
const { protect, authorize } = require('../middleware/auth.middleware');
const { addToCart, removeFromCart, getCartItems, bookService, bookLabourer, searchServices } = require('../controllers/customer.controller')
const router = express.Router();

router.post('/cart', protect, authorize('Customer'), addToCart);
router.delete('/cart/remove/:serviceId', protect, authorize('Customer'), removeFromCart);
router.get('/cart', protect, authorize('Customer'), getCartItems);
router.post('/book-service', protect, authorize('Customer'), bookService);
router.post('/book-labourer', protect, authorize('Customer'), bookLabourer);
router.get('/search-services', protect, authorize('Customer'), searchServices);
module.exports = router;

