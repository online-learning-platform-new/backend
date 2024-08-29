const express = require('express');
const { verifyToken } = require('../middleware/authMiddleware');
const {
    createStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent
} = require('../controllers/studentController');

const router = express.Router();

// Apply authentication middleware to these routes
router.post('/', verifyToken('admin'), createStudent);  // Only admin can create a student
router.get('/', verifyToken('admin'), getAllStudents);  // Only admin can view all students
router.get('/:id', verifyToken('admin'), getStudentById);  // Only admin can view a single student
router.put('/:id', verifyToken('admin'), updateStudent);  // Only admin can update a student
router.delete('/:id', verifyToken('admin'), deleteStudent);  // Only admin can delete a student

module.exports = router;
