const Agent = require('../models/Agent');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new agent
exports.registerAgent = async (req, res) => {
    try {
        const { name, email, mobileNumber, password } = req.body;

        // Check if agent already exists
        const existingAgent = await Agent.findOne({ email });
        if (existingAgent) {
            return res.status(400).json({ message: 'Agent already exists' });
        }

        // Create a new agent
        const newAgent = new Agent({ name, email, mobileNumber, password });
        await newAgent.save();

        res.status(201).json({ message: 'Agent registered successfully', agent: newAgent });
    } catch (error) {
        res.status(500).json({ message: 'Error registering agent', error: error.message });
    }
};

// Agent login
exports.loginAgent = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if agent exists
        const agent = await Agent.findOne({ email });
        if (!agent) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, agent.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: agent._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(200).json({ message: 'Login successful', token, agent });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};

// Get all agents
exports.getAgents = async (req, res) => {
    try {
        const agents = await Agent.find();
        res.status(200).json(agents);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching agents', error: error.message });
    }
};

// Get an agent by ID
exports.getAgentById = async (req, res) => {
    try {
        const agent = await Agent.findById(req.params.id);
        if (!agent) return res.status(404).json({ message: 'Agent not found' });

        res.status(200).json(agent);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching agent', error: error.message });
    }
};

// Update an agent
exports.updateAgent = async (req, res) => {
    try {
        const { name, email, mobileNumber } = req.body;

        const updatedAgent = await Agent.findByIdAndUpdate(req.params.id, { name, email, mobileNumber }, { new: true });
        if (!updatedAgent) return res.status(404).json({ message: 'Agent not found' });

        res.status(200).json({ message: 'Agent updated successfully', agent: updatedAgent });
    } catch (error) {
        res.status(500).json({ message: 'Error updating agent', error: error.message });
    }
};

// Delete an agent
exports.deleteAgent = async (req, res) => {
    try {
        const deletedAgent = await Agent.findByIdAndDelete(req.params.id);
        if (!deletedAgent) return res.status(404).json({ message: 'Agent not found' });

        res.status(200).json({ message: 'Agent deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting agent', error: error.message });
    }
};
