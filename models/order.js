const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  restaurant_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  items: [{ type: String, required: true }],  // List of ordered items
  total_amount: { type: Number, required: true },
  order_date: { type: Date, default: Date.now },
  status: { type: String, default: 'Pending' },  // Default status
  status_history: [
    {
      status: { type: String, required: true },
      updatedAt: { type: Date, default: Date.now }
    }
  ]
});
Order.find({ restaurant_id: restaurantId }).populate('restaurant_id').exec((err, orders) => {
  if (err) return res.status(500).json({ message: err.message });
  res.status(200).json({ orders });
});


module.exports = mongoose.model('Order', orderSchema);
