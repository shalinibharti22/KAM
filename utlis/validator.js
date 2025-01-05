const Joi = require('joi');

// Define the validation schema for Lead
const leadSchema = Joi.object({
  name: Joi.string().required().min(3).max(50),
  email: Joi.string().email().required(),
  status: Joi.string().valid('new', 'contacted', 'interested', 'converted', 'closed').default('new'),
  priority: Joi.string().valid('low', 'medium', 'high').optional(),
  lastInteraction: Joi.date().optional(),
  orderHistory: Joi.array().items(Joi.object({
    date: Joi.date().required(),
    amount: Joi.number().required(),
  })).optional(),
});

// Function to validate incoming lead data
const validateLead = (data) => {
  const { error } = leadSchema.validate(data);
  if (error) {
    return error.details.map((detail) => detail.message).join(', ');
  }
  return null;
};

module.exports = { validateLead };
