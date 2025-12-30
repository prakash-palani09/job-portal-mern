const express = require("express");
const router = express.Router();
const { createJob, getJobs } = require("../controllers/jobController");
const { protect, authorize } = require("../middleware/authMiddleware");

//public

router.get("/", getJobs);

//recruiter only
router.post("/", protect, authorize("recruiter"), createJob);

module.exports = router;