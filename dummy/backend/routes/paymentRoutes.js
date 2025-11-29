const express = require('express');
const router = express.Router();
const { getMethods, createMethod, deleteMethod } = require('../controllers/paymentController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/', getMethods);
router.post('/', protect, admin, createMethod);
router.delete('/:id', protect, admin, deleteMethod);

module.exports = router;