const express = require('express');
const { verifyToken } = require('../middleware/authMiddleware');
const {
    createEnrollment,
    getAllEnrollments,
    getEnrollmentById,
    updateEnrollment,
    deleteEnrollment,
    enrollInCourses,
    getEnrollmentsByStudentId,
    getNonEnrollmentsByStudentId
} = require('../controllers/enrollmentController');

const router = express.Router();

// Admin routes
router.post('/', verifyToken('admin'), createEnrollment);  
router.get('/', verifyToken('admin'), getAllEnrollments);  
router.get('/:id', verifyToken('admin'), getEnrollmentById);  
router.put('/:id', verifyToken('admin'), updateEnrollment);  
router.delete('/:id', verifyToken('admin'), deleteEnrollment); 
router.get('/student/:student_id', verifyToken('admin'), getEnrollmentsByStudentId);  // Admin can view all enrollments for a student
router.get('/non-enrollments/:student_id', verifyToken('admin'), getNonEnrollmentsByStudentId);
// Student route
router.post('/enroll', verifyToken('student'), enrollInCourses);  

module.exports = router;
