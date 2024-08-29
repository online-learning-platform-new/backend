const Student = require('../models/student');
const { verifyToken } = require('../middleware/authMiddleware');
const bcrypt = require('bcrypt');

// Controller to Create a Student
const createStudent = async (req, res) => {
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

        res.status(201).json({
            message: 'Student created successfully',
            student: newStudent,
        });
    } catch (error) {
        console.error('Error creating student:', error); // Log the error details
        res.status(500).json({ message: 'Server error', error: error.message || error });
    }
};

// Controller to View All Students
const getAllStudents = async (req, res) => {
    try {
        // Fetch all students
        const students = await Student.findAll();

        res.status(200).json({
            message: 'Students retrieved successfully',
            students,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Controller to View a Single Student
const getStudentById = async (req, res) => {
    const { id } = req.params;

    try {
        // Fetch the student by ID
        const student = await Student.findByPk(id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.status(200).json({
            message: 'Student retrieved successfully',
            student,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Controller to Update a Student
const updateStudent = async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, email, password } = req.body;

    try {
        // Fetch the student by ID
        const student = await Student.findByPk(id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Optionally hash the password if it's being updated
        const updatedData = { first_name, last_name, email };
        if (password) {
            updatedData.password = await bcrypt.hash(password, 10);
        }

        // Update student details
        await student.update(updatedData);

        res.status(200).json({
            message: 'Student updated successfully',
            student,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Controller to Remove a Student
const deleteStudent = async (req, res) => {
    const { id } = req.params;

    try {
        // Fetch the student by ID
        const student = await Student.findByPk(id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Delete the student
        await student.destroy();

        res.status(200).json({
            message: 'Student removed successfully',
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = {
    createStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent,
};
