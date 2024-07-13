const express = require('express');
const { StudentLeave } = require('../models/leaveModel');
const router = express.Router();

// Approve student leave application
router.patch('/approve/:id', async (req, res) => {
  try {
    const { remarkFaculty } = req.body;
    const application = await StudentLeave.findByIdAndUpdate(req.params.id, {
      approvedFaculty: true,
      remarkFaculty,
      approvedFacultyAt: new Date()
    }, { new: true });
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({ message: 'Error approving application', error });
  }
});

// Decline student leave application
router.patch('/decline/:id', async (req, res) => {
  try {
    const { remarkFaculty } = req.body;
    const application = await StudentLeave.findByIdAndUpdate(req.params.id, {
      approvedFaculty: false,
      remarkFaculty,
      approvedFacultyAt: new Date()
    }, { new: true });
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({ message: 'Error declining application', error });
  }
});

// Discuss student leave application
router.patch('/discuss/:id', async (req, res) => {
  try {
    const application = await StudentLeave.findByIdAndUpdate(req.params.id, {
      discuss: true,
      discussAt: new Date()
    }, { new: true });
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({ message: 'Error setting "Discuss": ', error });
  }
});

module.exports = router;
