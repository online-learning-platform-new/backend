const Admin = require('../models/admin');
const { verifyToken } = require('../middleware/authMiddleware');

// Controller to View All Admins
const getAllAdmins = async (req, res) => {
    try {
        // Fetch all admins
        const admins = await Admin.findAll();

        res.status(200).json({
            message: 'Admins retrieved successfully',
            admins,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Controller to View a Single Admin by ID
const getAdminById = async (req, res) => {
    const { id } = req.params;

    try {
        // Fetch the admin by ID
        const admin = await Admin.findByPk(id);
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        res.status(200).json({
            message: 'Admin retrieved successfully',
            admin,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = {
    getAllAdmins,
    getAdminById,
};
