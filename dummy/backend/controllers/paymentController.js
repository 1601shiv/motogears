const PaymentMethod = require('../models/PaymentMethod');

const getMethods = async (req, res) => {
  try {
    const methods = await PaymentMethod.find({});
    res.json(methods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createMethod = async (req, res) => {
  try {
    // This passes the frontend data { provider, details } to the DB
    const method = await PaymentMethod.create(req.body);
    res.status(201).json(method);
  } catch (error) {
    res.status(400).json({ message: "Error adding payment method", error: error.message });
  }
};

const deleteMethod = async (req, res) => {
  try {
    await PaymentMethod.findByIdAndDelete(req.params.id);
    res.json({ message: 'Method deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getMethods, createMethod, deleteMethod };