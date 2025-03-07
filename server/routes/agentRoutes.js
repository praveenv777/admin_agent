const express = require('express');
const { registerAgent, loginAgent, getAgents, getAgentById, updateAgent, deleteAgent } = require('../controllers/agentController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

// Public Routes
router.post('/register', registerAgent);
router.post('/login', loginAgent);

// Protected Routes (Require Authentication)
router.get('/', authenticate, getAgents);
router.get('/:id', authenticate, getAgentById);
router.put('/:id', authenticate, updateAgent);
router.delete('/:id', authenticate, deleteAgent);

module.exports = router;
