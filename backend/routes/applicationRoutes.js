const express = require('express');
const router = express.Router();
const {
    applyJob,
    getApplicationsByJob,
    updateApplicationStatus,
} = require('../controllers/applicationController');
const { protect, authorize } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const {uploadResume} = require('../controllers/applicationController');

//Jobseeker applies for a job
router.post(
    "/apply/:jobId",
    protect,
    authorize('jobseeker'),
    applyJob
);

//Recruiter views applications for their job
router.get(
    '/job/:jobId',
    protect,
    authorize('recruiter'),
    getApplicationsByJob
);

//Recruiter updates application status
router.patch(
    '/:id/status',
    protect,
    authorize('recruiter'),
    updateApplicationStatus
);

//Jobseeker uploads resume
router.post(
    "/:id/resume",
    protect,
    authorize('jobseeker'),
    upload.single('resume'),
    uploadResume
);

module.exports = router;