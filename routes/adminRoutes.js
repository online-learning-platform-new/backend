const express = require('express');
const { verifyToken } = require('../middleware/authMiddleware');
const {
    getAllAdmins,
    getAdminById
} = require('../controllers/adminController');

const router = express.Router();

// Apply authentication middleware to these routes
router.get('/', verifyToken('admin'), getAllAdmins);  // Only admin can view all admins
router.get('/:id', verifyToken('admin'), getAdminById);  // Only admin can view a single admin

module.exports = router;
