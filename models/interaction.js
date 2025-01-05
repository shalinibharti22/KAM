const mongoose = require('mongoose');

const interactionSchema = mongoose.Schema({
  leadId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lead', required: true },
  interactionType: { type: String, enum: ['call', 'order'], required: true },
  date: { type: Date, default: Date.now },
  notes: { type: String }
});

const Interaction = mongoose.model('Interaction', interactionSchema);
module.exports = Interaction;
