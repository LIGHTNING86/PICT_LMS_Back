const express = require('express');
const router = express.Router();
const leaveController = require('../controllers/leaveController');
const studentLeaveRoutes = require('./studentLeaveRoutes'); // Import studentLeaveRoutes

// Routes for Student leave
router.use('/leave/student', studentLeaveRoutes);

// Routes for Student leave
router.post('/student', leaveController.createStudentLeave);
router.get('/student', leaveController.getStudentLeaves);
router.get('/student/:id', leaveController.getStudentLeaveById);
router.patch('/student/cancel/:id', leaveController.cancelStudentLeave); 

// Routes for Faculty leave
router.post('/faculty', leaveController.createFacultyLeave);
router.get('/faculty', leaveController.getFacultyLeaves);

// Approve and Decline student leave
router.patch('/student/approve/:id', leaveController.approveStudentLeave);
router.patch('/student/decline/:id', leaveController.declineStudentLeave);
router.patch('/student/discuss/:id', leaveController.discussStudentLeave);

// Approve and Decline mentor-specific student leave
router.patch('/student/mentor/approve/:id', leaveController.approveMentorStudentLeave);
router.patch('/student/mentor/decline/:id', leaveController.declineMentorStudentLeave);
router.patch('/student/mentor/discuss/:id', leaveController.discussMentorStudentLeave);

module.exports = router;
