const express = require('express');
const { verifyToken } = require('../middleware/authMiddleware');
const {
    createEnrollment,
    getAllEnrollments,
    getEnrollmentById,
    updateEnrollment,
    deleteEnrollment,
    enrollInCourses
} = require('../controllers/enrollmentController');

const router = express.Router();

// Admin routes
router.post('/', verifyToken('admin'), createEnrollment);  // Admin can create enrollments
router.get('/', verifyToken('admin'), getAllEnrollments);  // Admin can view all enrollments
router.get('/:id', verifyToken('admin'), getEnrollmentById);  // Admin can view a single enrollment
router.put('/:id', verifyToken('admin'), updateEnrollment);  // Admin can update an enrollment
router.delete('/:id', verifyToken('admin'), deleteEnrollment);  // Admin can delete an enrollment

// Student route
router.post('/enroll', verifyToken('student'), enrollInCourses);  // Students can enroll in courses

module.exports = router;
