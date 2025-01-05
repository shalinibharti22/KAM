const mongoose = require('mongoose');

// Define Restaurant Schema
const RestaurantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String },
    city: { type: String },
    status: { type: String, enum: ['New', 'Active', 'Closed'], default: 'New' },
    created_at: { type: Date, default: Date.now }
});

const Restaurant = mongoose.model('Restaurant', RestaurantSchema);

module.exports = Restaurant;
