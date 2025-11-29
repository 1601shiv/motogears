const Order = require('../models/Order');

const addOrderItems = async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;

  if (orderItems && orderItems.length === 0) {
    return res.status(400).json({ message: 'No order items' });
  }

  const order = new Order({
    user: req.user._id, // Comes from authMiddleware
    orderItems,
    shippingAddress,
    paymentMethod,
    totalPrice
  });

  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
};

const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
};

module.exports = { addOrderItems, getMyOrders };