const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Lead = require('./models/productModels');
const Interaction = require('./models/interaction.js');
const User = require('./models/userModel');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./utlis/swagger');

console.log(process.env.JWT_SECRET); 
require('dotenv').config();

// Importing Routes
const leadRoutes = require('./routes/leadRoutes.js');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(express.json());
app.use(cors());
app.options('*', cors());


app.use(cors({
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow these methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
}));
// Swagger UI Setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // Serve Swagger UI

// Register Routes
app.use('/auth', authRoutes);
app.use('/leads', leadRoutes);
app.use('/users',userRoutes);


  // Login Route
app.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log(process.env.JWT_SECRET); 
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
  
      // Check password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
  
      // Generate JWT token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.status(200).json({
        message: "Login successful",
        token,
        user: { id: user._id, username: user.username, email: user.email }
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  


//Middleware to  Protect Routes
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Expecting "Bearer <token>"

    if (!token) {
        return res.status(401).json({ message: 'Access denied, no token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user data (ID) to the request
        next(); // Continue to the next middleware or route handler
    } catch (error) {
        return res.status(400).json({ message: 'Invalid token' });
    }
};

// Protected Route Example
app.get('/leads', authenticateToken, async (req, res) => {
    try {
        const leads = await Lead.find({});
        res.status(200).json(leads);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//access the user from token
app.get('/leads', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id; // Access the user ID from the token
        const leads = await Lead.find({ userId }); // Filter leads by the user
        res.status(200).json(leads);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


//Routes
app.get('/',(req,res)=>{
    res.send("Welcome to the KAM Lead Mangement System API");
})


//Lead Routes

app.post('/leads',async(req,res)=>{
    try{
        const leads = await Lead.create(req.body)
        res.status(200).json(leads);

    }catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});

app.get('/leads',async(req,res) =>{
    try{
        console.log(req.user);
        const leads = await Lead.find({userId:req.user.id});
        res.status(200).json(leads);
    }catch(error){
        res.status(500).json({message:error.message})
    }
});

app.get('/leads/:id',async(req,res) => {
    try{
        const {id} = req.params;
        const lead = await Lead.findById(id);
        if (!lead) return res.status(404).json({ message: "Lead not found" });
        res.status(200).json(lead);
    }catch(error){
        res.status(500).json({message:error.message})
    }
});


app.put('/leads/:id',async(req,res)=>{
    try{
        const {id} = req.params;
        const lead = await Lead.findByIdAndUpdate(id,req.body);
        if(!lead){
            return res.status(404),json({message:`cannot find any prduct to update${id}`})
        }
        const updatedProduct = await Lead.findById(id);
        res.status(200).json(updatedProduct);
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
});


app.delete('/leads/:id', async (req, res) => {
    try {
      const lead = await Lead.findByIdAndDelete(req.params.id);
      if (!lead) return res.status(404).json({ message: "Lead not found" });
      res.status(200).json({ message: "Lead deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
//interaction Routes
app.post('/interactions', async (req, res) => {
    try {
      const interaction = await Interaction.create(req.body);
      res.status(201).json(interaction);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });


  app.get('/interactions/:leadId', async (req, res) => {
    try {
      const interactions = await Interaction.find({ leadId: req.params.leadId });
      res.status(200).json(interactions);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });


app.get('/calls-today', async (req, res) => {
    try {
      const today = new Date();
      const leads = await Lead.find({
        lastCallDate: { $lte: new Date(today.setDate(today.getDate() - 'callFrequency')) }
      });
      res.status(200).json(leads);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  const MONGO_URI = process.env.MONGO_URI;
  mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.log('MongoDB connection error: ', err));

// Export mongoose instance to use in other files
module.exports = mongoose;
app.use((err, req, res, next) => {
  if (err) {
    console.error(err); // Log the error
    res.status(500).json({
      status: 500,
      error: 'Internal Server Error',
      message: err.message || 'Something went wrong'
    });
  } else {
    next();
  }
})
module.exports = app;


app.listen(process.env.PORT ,() =>{
    console.log(`server running on port ${process.env.PORT}`);
});