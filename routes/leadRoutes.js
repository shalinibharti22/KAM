const express = require('express');
const router = express.Router();
const { protect, checkRole } = require('../middleware/authMiddleware');
const { assignLead } = require('../controllers/lead');


const {
  createLead,
  getLeads,
  updateLeadStatusAndFile,
  assignLeadToKAM,
  getCallHistory,
  upload
} = require('../controllers/lead');

// Swagger Documentation and Route Handlers

/**
 * @swagger
 * /api/leads:
 *   post:
 *     summary: Create a new lead with file upload
 *     description: Create a new lead in the system with optional file upload.
 *     tags:
 *       - Leads
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               restaurant_name:
 *                 type: string
 *               contact_name:
 *                 type: string
 *               contact_info:
 *                 type: string
 *               call_frequency:
 *                 type: string
 *               last_call_date:
 *                 type: string
 *                 format: date
 *               next_call_date:
 *                 type: string
 *                 format: date
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Lead created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/api/leads', upload.single('file'), createLead);

/**
 * @swagger
 * /api/leads/{id}/status:
 *   put:
 *     summary: Update lead status and optionally upload a file
 *     description: Update the status of a lead and upload a file if necessary.
 *     tags:
 *       - Leads
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Lead ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: ['New', 'In Progress', 'Follow-up', 'Closed']
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Lead status and file updated successfully
 *       404:
 *         description: Lead not found
 *       400:
 *         description: Invalid input
 */
router.put('/api/leads/:id/status', upload.single('file'), updateLeadStatusAndFile);

/**
 * @swagger
 * /api/leads:
 *   get:
 *     summary: Get all leads
 *     description: Retrieve a list of all leads in the system.
 *     tags:
 *       - Leads
 *     responses:
 *       200:
 *         description: List of leads
 */
router.get('/api/leads', getLeads);


/**
 * @swagger
 * /api/leads/{id}/assign:
 *   put:
 *     summary: Assign a lead to a Key Account Manager (KAM)
 *     description: Assign a specific lead to a KAM using their identifier.
 *     tags:
 *       - Leads
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Lead ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               assignedTo:
 *                 type: string
 *                 example: KAM123
 *     responses:
 *       200:
 *         description: Lead assigned successfully
 *       400:
 *         description: AssignedTo field is required
 *       404:
 *         description: Lead not found
 *       500:
 *         description: Internal server error
 */
router.put('/api/leads/:id/assign', assignLeadToKAM);

/**
 * @swagger
 * /api/leads/{id}/assign:
 *   put:
 *     summary: Assign a lead to a Key Account Manager (KAM)
 *     description: Assign a specific lead to a KAM using their identifier.
 *     tags:
 *       - Leads
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Lead ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               assignedTo:
 *                 type: string
 *                 example: "kam_username_or_id"
 *                 description: The username or ID of the Key Account Manager to whom the lead will be assigned.
 *     responses:
 *       200:
 *         description: Lead assigned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Lead assigned successfully"
 *                 lead:
 *                   type: object
 *                   properties:
 *                     restaurant_name:
 *                       type: string
 *                       example: "Sample Restaurant"
 *                     contact_name:
 *                       type: string
 *                       example: "John Doe"
 *                     assignedTo:
 *                       type: string
 *                       example: "kam_username_or_id"
 *                     status:
 *                       type: string
 *                       example: "New"
 *                     call_frequency:
 *                       type: string
 *                       example: "Weekly"
 *                     last_call_date:
 *                       type: string
 *                       example: "2025-01-01T00:00:00Z"
 *                     next_call_date:
 *                       type: string
 *                       example: "2025-01-08T00:00:00Z"
 *                     status_history:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           status:
 *                             type: string
 *                             example: "New"
 *                           updatedAt:
 *                             type: string
 *                             example: "2025-01-05T00:00:00Z"
 *                           updatedBy:
 *                             type: string
 *                             example: "Admin"
 *                     lastUpdated:
 *                       type: string
 *                       example: "2025-01-05T00:00:00Z"
 *                     _id:
 *                       type: string
 *                       example: "lead_id"
 *       400:
 *         description: Bad request, for example, if the lead is already assigned
 *       404:
 *         description: Lead not found
 *       403:
 *         description: Forbidden, if the user does not have the required permissions
 *       500:
 *         description: Internal server error
 */
router.put('/api/leads/:id/assign', protect, checkRole(['Admin', 'KAM']), assignLead);
/**
 * @swagger
 * /api/leads/{id}/calls:
 *   get:
 *     summary: Get call history of a specific lead
 *     description: Retrieve the call history of a specific lead by providing the lead ID.
 *     tags:
 *       - Leads
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Lead ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved call history
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 call_history:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       call_date:
 *                         type: string
 *                         format: date
 *                       duration:
 *                         type: string
 *                       call_by:
 *                         type: string
 *                       purpose:
 *                         type: string
 *                       notes:
 *                         type: string
 *       404:
 *         description: Lead not found
 *       500:
 *         description: Internal server error
 */
router.get('/api/leads/:id/calls', protect, checkRole(['Admin', 'KAM', 'Viewer']), getCallHistory); 



module.exports = router;
