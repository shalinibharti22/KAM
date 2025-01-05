const Lead = require('../models/leadModel');
const multer = require('multer');
const path = require('path');

// Set up multer storage for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Folder where files are stored
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`); // Unique filename with timestamp
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // Limit file size to 2MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf/;
    const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = allowedTypes.test(file.mimetype);

    if (extName && mimeType) {
      return cb(null, true);
    } else {
      cb(new Error('Only .jpeg, .jpg, .png, and .pdf files are allowed!'));
    }
  }
});

// Create a new lead with file upload
const createLead = async (req, res) => {
  try {
    const newLead = new Lead({
      restaurant_name: req.body.restaurant_name,
      contact_name: req.body.contact_name,
      contact_info: req.body.contact_info,
      call_frequency: req.body.call_frequency,
      last_call_date: req.body.last_call_date,
      next_call_date: req.body.next_call_date,
      status: req.body.status || 'New',
      status_history: [{
        status: req.body.status || 'New',
        updatedAt: Date.now(),
        updatedBy: req.body.updatedBy || 'System'
      }],
      file: req.file ? req.file.path : null
    });
   


    await newLead.save();
    res.status(201).json({ message: 'Lead created successfully', lead: newLead });
  } catch (error) {
    res.status(400).json({ message: 'Error creating lead', error: error.message });
  }
};

// Update lead status and file
const updateLeadStatusAndFile = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses = ['New', 'In Progress', 'Follow-up', 'Closed'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  try {
    const lead = await Lead.findById(id);
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    lead.status = status;
    lead.status_history.push({
      status: status,
      updatedAt: Date.now(),
      updatedBy: req.user ? req.user.username : 'System'
    });
    lead.lastUpdated = Date.now();

    if (req.file) {
      lead.file = req.file.path;
    }

    await lead.save();
    res.status(200).json({ message: 'Lead status and file updated successfully', lead });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Get all leads
const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find();
    res.status(200).json({ leads });
  } catch (error) {
    res.status(400).json({ message: 'Error fetching leads', error: error.message });
  }
};

// Assign lead to a KAM (Key Account Manager)
const assignLeadToKAM = async (req, res) => {
  const { id } = req.params;
  const { assignedTo } = req.body;

  if (!assignedTo) {
    return res.status(400).json({ message: 'AssignedTo field is required' });
  }

  try {
    const lead = await Lead.findById(id);
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    lead.assignedTo = assignedTo;
    lead.lastUpdated = Date.now();

    await lead.save();
    res.status(200).json({ message: 'Lead assigned successfully', lead });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

const assignLead = async (req, res) => {
  const { id } = req.params;  // Get lead ID from URL parameters
  const { assignedTo } = req.body;  // Get KAM ID or username from the request body

  try {
    // Find the lead by its ID
    const lead = await Lead.findById(id);

    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    // Check if the user is already assigned
    if (lead.assignedTo === assignedTo) {
      return res.status(400).json({ message: 'Lead is already assigned to this KAM' });
    }

    // Assign the lead to the specified KAM
    lead.assignedTo = assignedTo;

    // Save the updated lead
    await lead.save();

    res.status(200).json({ message: 'Lead assigned successfully', lead });
  } catch (error) {
    res.status(500).json({ message: 'Error assigning lead', error: error.message });
  }
};
// Get call history of a specific lead
const getCallHistory = async (req, res) => {
  const { id } = req.params; // Extract the lead ID from the request parameters

  try {
    const lead = await Lead.findById(id); // Find the lead by ID
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' }); // Handle case where the lead doesn't exist
    }

    res.status(200).json({ call_history: lead.call_history }); // Return the call history
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message }); // Handle any other errors
  }
};


module.exports = {
  createLead,
  getLeads,
  updateLeadStatusAndFile,
  assignLeadToKAM,
  assignLead,
  getCallHistory,
  upload
};

