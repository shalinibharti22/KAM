const express = require('express');
const router = express.Router();
const { addRestaurant, getRestaurantById } = require('../controllers/restaurantController');

/**
 * @swagger
 * /api/restaurants:
 *   post:
 *     summary: Add a new restaurant
 *     tags: [Restaurants]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               owner:
 *                 type: string
 *     responses:
 *       201:
 *         description: Restaurant added successfully.
 *       400:
 *         description: Bad request.
 */
router.post('/', addRestaurant);

/**
 * @swagger
 * /api/restaurants/{restaurant_id}:
 *   get:
 *     summary: Get a restaurant by ID
 *     tags: [Restaurants]
 *     parameters:
 *       - in: path
 *         name: restaurant_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the restaurant to fetch.
 *     responses:
 *       200:
 *         description: A restaurant.
 *       404:
 *         description: Restaurant not found.
 */
router.get('/:restaurant_id', getRestaurantById);

module.exports = router;
