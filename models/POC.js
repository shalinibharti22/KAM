const mongoose = require('mongoose');

// Define POC Schema
const POCSchema = new mongoose.Schema({
    restaurant_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    name: { type: String, required: true },
    role: { type: String },
    phone_number: { type: String },
    email: { type: String }
});

const POC = mongoose.model('POC', POCSchema);
POC.find({ lead_id: leadId }).populate('lead_id').exec((err, pocs) => {
    if (err) return res.status(500).json({ message: err.message });
    res.status(200).json({ pocs });
  });
  

module.exports = POC;
