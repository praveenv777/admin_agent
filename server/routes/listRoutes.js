const express = require("express");
const multer = require("multer");
const {
    uploadAndDistribute,
    getDistributedLists,
} = require("../controllers/listController");
const { authenticate } = require("../middleware/authMiddleware");

const router = express.Router();

// Multer setup for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route to upload CSV and distribute lists (Requires Authentication)
router.post("/upload", authenticate, upload.single("file"), uploadAndDistribute);

// Route to get distributed lists for a specific agent
router.get("/:agentId", authenticate, getDistributedLists);

module.exports = router;
