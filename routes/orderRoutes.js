const express = require('express');
const router = express.Router();
const { addOrder, getOrdersByRestaurant } = require('../controllers/orderController');

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Add a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               restaurant_id:
 *                 type: string
 *               customer_name:
 *                 type: string
 *               total_price:
 *                 type: number
 *                 format: float
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Order added successfully.
 *       400:
 *         description: Bad request.
 */
router.post('/', addOrder);

/**
 * @swagger
 * /api/orders/{restaurant_id}:
 *   get:
 *     summary: Get all orders for a specific restaurant
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: restaurant_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the restaurant to fetch orders for.
 *     responses:
 *       200:
 *         description: A list of orders.
 *       404:
 *         description: Restaurant not found.
 */
router.get('/:restaurant_id', getOrdersByRestaurant);

module.exports = router;
