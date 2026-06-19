const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Temporary Storage (No MongoDB crash!)
const enquiries = [];

// POST Endpoint jaisa company ne manga tha
app.post('/api/enquiry', (req, res) => {
  const { name, email, phone } = req.body;

  // 1. Server-side Validation
  if (!name || !email || !phone) {
    return res.status(400).json({ 
      success: false, 
      message: 'Validation failed. All fields (name, email, phone) are required.' 
    });
  }

  // 2. Data store karna
  const newEnquiry = { id: enquiries.length + 1, name, email, phone, createdAt: new Date() };
  enquiries.push(newEnquiry);

  // 3. Success response status 201
  return res.status(201).json({
    success: true,
    message: 'Enquiry data registered successfully!',
    data: newEnquiry
  });
});

// Root API hit check karne ke liye
app.get('/api/enquiry', (req, res) => {
  res.send('Kidrove Express Backend status: ACTIVE & RUNNING!');
});

module.exports = app;
