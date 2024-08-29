const jwt = require('jsonwebtoken');
require('dotenv').config();
const Admin = require('../models/admin');
const Student = require('../models/student');

// Middleware to verify JWT token and user role
const verifyToken = (role) => {
    return async (req, res, next) => {
        const token = req.headers['authorization'];

        if (!token) {
            return res.status(401).json({ message: 'Access Denied: No Token Provided' });
        }

        try {
            const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
            req.user = decoded;

            // Check role-based access
            if (role && decoded.role !== role) {
                return res.status(403).json({ message: 'Access Denied: Insufficient Permissions' });
            }

            // Fetch the user from the database if necessary
            if (role === 'admin') {
                req.userData = await Admin.findByPk(decoded.id);
            } else if (role === 'student') {
                req.userData = await Student.findByPk(decoded.id);
            }

            if (!req.userData) {
                return res.status(401).json({ message: 'Invalid Token: User does not exist' });
            }

            next();
        } catch (err) {
            return res.status(401).json({ message: 'Invalid Token' });
        }
    };
};

module.exports = {
    verifyToken
};
