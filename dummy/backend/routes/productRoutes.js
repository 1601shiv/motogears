const express = require('express');
const { getProducts, createProduct, deleteProduct } = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', getProducts);
router.post('/', protect, admin, createProduct);
router.delete('/:id', protect, admin, deleteProduct);

module.exports = router;