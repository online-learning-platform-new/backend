const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (user) => {
    return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '1h', // Token expiration time
    });
};

const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            throw new Error('Invalid token');
        }
        return decoded;
    });
};

module.exports = {
    generateToken,
    verifyToken,
};
