const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { isTokenRevoked } = require('../utils/tokens');


exports.protect = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(400).json({ message: 'No token found' })
        }

        if (isTokenRevoked(token)) {
            return res.status(401).json({ message: "Already logged-out" })
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decodedToken.userId);
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        req.user = {
            id: user._id,
            role: user.role
        };
        next();
    }
    catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.message })
    }
};

// Middleware to restrict to specific roles (admin, etc.)
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access denied: Not authorized' });
        }
        next();
    };
};

