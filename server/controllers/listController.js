const List = require("../models/List");
const Agent = require("../models/Agent");
const csvParser = require("../utils/csvParser");

// Upload and distribute lists
exports.uploadAndDistribute = async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        // Parse CSV from buffer (handling in-memory storage properly)
        const parsedData = await csvParser.parseCSV(file.buffer.toString());
        if (!parsedData || parsedData.length === 0) {
            return res.status(400).json({ message: "Invalid or empty CSV file" });
        }

        const agents = await Agent.find();
        if (agents.length === 0) {
            return res.status(400).json({ message: "No agents available for distribution" });
        }

        const agentCount = agents.length;
        const distribution = new Map();

        // Distribute items among agents
        parsedData.forEach((item, index) => {
            const agentId = agents[index % agentCount]._id.toString();
            if (!distribution.has(agentId)) {
                distribution.set(agentId, []);
            }
            distribution.get(agentId).push(item);
        });

        // Prepare bulk insert array
        const listsToInsert = [];
        distribution.forEach((items, agentId) => {
            listsToInsert.push({ agent: agentId, items });
        });

        // Bulk insert into MongoDB
        await List.insertMany(listsToInsert);

        res.status(200).json({ message: "File uploaded and lists distributed successfully" });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get distributed lists for an agent
exports.getDistributedLists = async (req, res) => {
    try {
        const { agentId } = req.params;
        const lists = await List.find({ agent: agentId });

        if (lists.length === 0) {
            return res.status(404).json({ message: "No lists found for this agent" });
        }

        res.status(200).json(lists);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
