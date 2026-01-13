const Job = require("../models/Job");

// Create a new job
exports.createJob = async (req, res) => {
    try {
        const { title, company, location, description, salary } = req.body;

        if (!title || !company || !location || !description) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const job = await Job.create({
            title,
            company,
            location,
            description,
            salary,
            createdBy: req.user._id,
        });

        res.status(201).json({ message: 'Job created successfully', job });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ createdBy: req.user._id });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    console.error("GET JOBS ERROR:", error);
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
};
