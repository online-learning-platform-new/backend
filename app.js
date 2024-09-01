const express = require('express');
const { verifyToken } = require('./middleware/authMiddleware');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const enrollmentRoutes = require('./routes/enrollmentRoutes');
const studentRoutes = require('./routes/studentRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// Middleware
app.use(cors());  // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json());  // Parse JSON bodies

// Apply middlewares to routes
app.use('/api/admin', adminRoutes); // Protect admin routes
app.use('/api/students', studentRoutes); // Protect student routes

// Routes
app.use('/api/auth', authRoutes);  // Authentication routes (register, login)
app.use('/api/courses', courseRoutes);  // Course routes
app.use('/api/enrollments', enrollmentRoutes);  // Enrollment routes
// app.use('/api/students', studentRoutes);  // Student routes

// Error handling middleware
app.use(notFound); 
app.use(errorHandler);  

module.exports = app;
