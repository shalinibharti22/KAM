const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  restaurant_name: { type: String, required: true },
  contact_name: { type: String, required: true },
  contact_info: { type: String, required: true },
  call_frequency: { type: String, required: true },
  last_call_date: { type: Date, required: true },
  next_call_date: { type: Date, required: true },
  score: { type: Number, default: 0 },
  status: { type: String, enum: ['New', 'In Progress', 'Follow-up', 'Closed'], default: 'New' },
  status_history: [{
    status: { type: String, enum: ['New', 'In Progress', 'Follow-up', 'Closed'], default: 'New' },
    updatedAt: { type: Date, default: Date.now },
    updatedBy: { type: String, default: 'System' }
  }],
  file: { type: String }, 
  assignedTo: { type: String, required: false },
  lastUpdated: { type: Date, default: Date.now },
  call_history: [{ // New field for call history
    call_date: { type: Date, required: true }, // Date of call
    duration: { type: Number, required: true }, // Duration in seconds
    call_by: { type: String, required: true }, // Name of person making the call
    purpose: { type: String, required: true }, // Purpose of the call
    notes: { type: String } // Additional notes from the call
  }]
}, { timestamps: true });

module.exports = mongoose.model('Lead', leadSchema);
