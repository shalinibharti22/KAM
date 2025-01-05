const Interaction = require('../models/interaction');

// Add a new interaction
const addInteraction = async (req, res) => {
    try {
        const interaction = new Interaction(req.body);
        await interaction.save();
        res.status(201).json(interaction);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all interactions for a restaurant
const getInteractionsByRestaurant = async (req, res) => {
    try {
        const interactions = await Interaction.find({ restaurant_id: req.params.restaurant_id });
        res.status(200).json(interactions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    addInteraction,
    getInteractionsByRestaurant
};
