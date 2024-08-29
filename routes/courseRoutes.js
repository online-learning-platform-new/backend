const express = require('express');
const { verifyToken } = require('../middleware/authMiddleware');
const {
    createCourse,
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse
} = require('../controllers/courseController');

const router = express.Router();

// Apply authentication middleware to these routes
router.post('/', verifyToken('admin'), createCourse);  // Only admin can create a course
router.get('/', getAllCourses);  // Anyone can view all courses
router.get('/:id', getCourseById);  // Anyone can view a single course
router.put('/:id', verifyToken('admin'), updateCourse);  // Only admin can update a course
router.delete('/:id', verifyToken('admin'), deleteCourse);  // Only admin can delete a course

module.exports = router;
