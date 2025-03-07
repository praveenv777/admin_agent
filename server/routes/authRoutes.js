const express = require('express');
const { login } = require('../controllers/authController');

const router = express.Router();

// ✅ Improved: Added a health check endpoint (optional)
router.get('/health', (req, res) => {
    res.status(200).json({ message: 'Auth service is running!' });
});

// ✅ Improved: Standardized error handling
router.post('/login', async (req, res, next) => {
    try {
        await login(req, res);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
