const Order = require('../models/order');

// Add a new order
const addOrder = async (req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all orders for a restaurant
const getOrdersByRestaurant = async (req, res) => {
    try {
        const orders = await Order.find({ restaurant_id: req.params.restaurant_id });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Update Order Status
const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  // Validate status
  const validStatuses = ['Pending', 'Delivered', 'Cancelled'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  try {
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Update status and status history
    order.status = status;
    order.status_history.push({ status, updatedAt: Date.now() });

    await order.save();
    res.status(200).json({ message: 'Order status updated successfully', order });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Get Order History by Restaurant
const getOrderHistoryByRestaurant = async (req, res) => {
  const { restaurant_id } = req.params;

  try {
    const orders = await Order.find({ restaurant_id });
    if (orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this restaurant' });
    }

    res.status(200).json({ message: 'Order history retrieved successfully', orders });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};




module.exports = {
    addOrder,
    getOrdersByRestaurant,
    updateOrderStatus,
    getOrderHistoryByRestaurant
};
