const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String },
  contactInfo: { type: String }
});

const productSchema = mongoose.Schema({
  restaurantName: { type: String, required: true },
  address: { type: String },
  contacts: [contactSchema],
  status: { type: String, enum: ['new', 'in-progress', 'closed'], default: 'new' },
  lastInteraction: { type: Date },
  callFrequency: { type: Number, default: 7 },  // Days between calls
    lastCallDate: { type: Date }
}, {
  timestamps: true
});


const product = mongoose.model('Product',productSchema);
module.exports = product;