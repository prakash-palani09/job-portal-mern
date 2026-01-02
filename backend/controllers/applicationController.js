const Application = require('../models/Application');
const Job = require('../models/Job');
const cloudinary = require('../config/cloudinary');
const fs = require('fs');

exports.applyJob = async (req, res) => {
    try {
        const  jobId  = req.params.jobId;

        const alreadyApplied = await Application.findOne({
            job: jobId,
            applicant: req.user._id,
        });

        if (alreadyApplied) {
            return res.status(400).json({ message: 'You have already applied for this job' });
        }

        const application = await Application.create({
            job: jobId,
            applicant: req.user._id,
        });

        res.status(201).json({ message: 'Application submitted successfully', application });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.getApplicationsByJob = async (req, res) => {
    try {
        const  jobId  = req.params.jobId;

        const applications = await Application.find({ job: jobId })
            .populate('applicant', 'name email role')
            .populate('job', 'title company');

        res.json({ applications });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.updateApplicationStatus = async (req, res) => {
    try {
        const { status } = req.body;    

        const application = await Application.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );  

        res.json({
            message: 'Application status updated successfully',
            application,
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};


exports.uploadResume = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // Upload to Cloudinary as PUBLIC RAW
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "raw",
      folder: "job_portal_resumes",
      type: "upload",        // 🔥 THIS REMOVES 401
      access_mode: "public", // 🔥
      use_filename: true,
      unique_filename: false,
    });

    // Delete temp file
    fs.unlinkSync(req.file.path);

    application.resume = result.secure_url;
    await application.save();

    res.json({
      message: "Resume uploaded successfully",
      resume: result.secure_url,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
