const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');


router.get('/profile', protect, (req, res) => {
    res.json({ message: 'This is a protected profile route', user: req.user });
});

router.get('/recruiter', protect, authorize('recruiter'), (req, res) => {
    res.json({ message: 'Recruiter access granted'});
});

module.exports = router;