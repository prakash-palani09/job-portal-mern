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

exports.getJobs = async (req, res) => {
    try {
        const jobs = (await Job.find().populate('createdBy', 'name email')).sort({ createdAt: -1 });

        res.json(jobs)
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};