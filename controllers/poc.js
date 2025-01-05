const POC = require('../models/pocModel'); // Your POC model (adjust according to your DB setup)

// Add a new POC
const addPOC = async (req, res) => {
  try {
    const { restaurant_id, name, role, contact_info } = req.body;

    const newPOC = new POC({
      restaurant_id,
      name,
      role,
      contact_info
    });

    await newPOC.save();
    res.status(201).json({ message: 'POC added successfully', poc: newPOC });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all POCs for a specific restaurant
const getPOCsByRestaurant = async (req, res) => {
  try {
    const { restaurant_id } = req.params;
    const pocs = await POC.find({ restaurant_id });
    
    if (pocs.length === 0) {
      return res.status(404).json({ message: 'No POCs found for this restaurant' });
    }

    res.status(200).json(pocs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a specific POC by ID
const getPOCById = async (req, res) => {
  try {
    const { poc_id } = req.params;
    const poc = await POC.findById(poc_id);

    if (!poc) {
      return res.status(404).json({ message: 'POC not found' });
    }

    res.status(200).json(poc);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a specific POC
const updatePOC = async (req, res) => {
  try {
    const { poc_id } = req.params;
    const { name, role, contact_info } = req.body;

    const updatedPOC = await POC.findByIdAndUpdate(
      poc_id,
      { name, role, contact_info },
      { new: true }
    );

    if (!updatedPOC) {
      return res.status(404).json({ message: 'POC not found' });
    }

    res.status(200).json({ message: 'POC updated successfully', poc: updatedPOC });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a specific POC
const deletePOC = async (req, res) => {
  try {
    const { poc_id } = req.params;
    const deletedPOC = await POC.findByIdAndDelete(poc_id);

    if (!deletedPOC) {
      return res.status(404).json({ message: 'POC not found' });
    }

    res.status(200).json({ message: 'POC deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { addPOC, getPOCsByRestaurant, getPOCById, updatePOC, deletePOC };
