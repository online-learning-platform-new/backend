const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Student = require('../models/student');
const Admin = require('../models/admin');
const { generateToken } = require('../config/jwt');

// Helper function to generate JWT token
const createToken = (user) => {
    return generateToken({
        id: user.id,
        role: user.role
    });
};

// Student Registration
const registerStudent = async (req, res) => {
    const { first_name, last_name, email, password } = req.body;

    try {
        // Check if the email already exists
        const existingStudent = await Student.findOne({ where: { email } });
        if (existingStudent) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new student
        const newStudent = await Student.create({
            first_name,
            last_name,
            email,
            password: hashedPassword,
        });

        // Generate JWT token
        const token = createToken({ id: newStudent.id, role: 'student' });

        res.status(201).json({
            message: 'Student registered successfully',
            token,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Student Login
const loginStudent = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the student
        const student = await Student.findOne({ where: { email } });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = createToken({ id: student.id, role: 'student' });

        res.status(200).json({
            message: 'Login successful',
            token,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Admin Login
const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the admin
        const admin = await Admin.findOne({ where: { email } });
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        // Compare password
        // const isMatch = await bcrypt.compare(password, admin.password);
        // const isMatch = password.localeCompare(admin.password);
        if (password != admin.password) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = createToken({ id: admin.id, role: 'admin' });

        res.status(200).json({
            message: 'Login successful',
            token,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = {
    registerStudent,
    loginStudent,
    loginAdmin,
};
