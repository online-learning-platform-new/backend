const express = require('express');
const { registerStudent, loginStudent, loginAdmin } = require('../controllers/authController');

const router = express.Router();

router.post('/register', registerStudent);  // Route for student registration
router.post('/login/student', loginStudent);  // Route for student login
router.post('/login/admin', loginAdmin);  // Route for admin login

module.exports = router;
