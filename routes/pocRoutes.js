const express = require('express');
const router = express.Router();
const { addPOC, getPOCsByRestaurant, getPOCById, updatePOC, deletePOC } = require('../controllers/pocController');

/**
 * @swagger
 * /api/pocs:
 *   post:
 *     summary: Add a new Point of Contact (POC) for a restaurant
 *     tags: [Points of Contact (POCs)]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               restaurant_id:
 *                 type: string
 *                 description: The ID of the restaurant the POC is associated with.
 *               name:
 *                 type: string
 *                 description: The name of the POC.
 *               role:
 *                 type: string
 *                 description: The role of the POC (e.g., Manager, Sales Rep).
 *               contact_info:
 *                 type: string
 *                 description: The contact information (phone, email, etc.) of the POC.
 *     responses:
 *       201:
 *         description: POC added successfully.
 *       400:
 *         description: Bad request.
 */
router.post('/', addPOC);

/**
 * @swagger
 * /api/pocs/{restaurant_id}:
 *   get:
 *     summary: Get all POCs for a specific restaurant
 *     tags: [Points of Contact (POCs)]
 *     parameters:
 *       - in: path
 *         name: restaurant_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the restaurant to fetch POCs for.
 *     responses:
 *       200:
 *         description: A list of POCs.
 *       404:
 *         description: Restaurant not found.
 */
router.get('/:restaurant_id', getPOCsByRestaurant);

/**
 * @swagger
 * /api/pocs/{poc_id}:
 *   get:
 *     summary: Get a specific POC by ID
 *     tags: [Points of Contact (POCs)]
 *     parameters:
 *       - in: path
 *         name: poc_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the POC to fetch.
 *     responses:
 *       200:
 *         description: A specific POC.
 *       404:
 *         description: POC not found.
 */
router.get('/:poc_id', getPOCById);

/**
 * @swagger
 * /api/pocs/{poc_id}:
 *   put:
 *     summary: Update contact details of a specific POC
 *     tags: [Points of Contact (POCs)]
 *     parameters:
 *       - in: path
 *         name: poc_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the POC to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               role:
 *                 type: string
 *               contact_info:
 *                 type: string
 *     responses:
 *       200:
 *         description: POC details updated successfully.
 *       400:
 *         description: Bad request.
 */
router.put('/:poc_id', updatePOC);

/**
 * @swagger
 * /api/pocs/{poc_id}:
 *   delete:
 *     summary: Delete a specific POC
 *     tags: [Points of Contact (POCs)]
 *     parameters:
 *       - in: path
 *         name: poc_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the POC to delete.
 *     responses:
 *       200:
 *         description: POC deleted successfully.
 *       404:
 *         description: POC not found.
 */
router.delete('/:poc_id', deletePOC);

module.exports = router;
