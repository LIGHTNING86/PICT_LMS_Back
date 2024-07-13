const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  contactNo: {
    type: String,
    required: true
  },
  leaveType: {
    type: String,
    required: true,
    enum: ['fullDay', 'halfDay']
  },
  studentName: {
    type: String,
    required: true,
  },
  registrationNo: {
    type: String,
    required: true,
  },
  studentClass: {
    type: String,
    required: true,
  },
  studentFacultyID: {
    type: String,
    required: true,
  },
  studentMentorID: {
    type: String,
    required: true,
  },
  approvedMentor: {
    type: Boolean,
    default: null,
  },
  approvedMentorAt: {
    type: Date,
    default: null
  },
  approvedFaculty: {
    type: Boolean,
    default: null,
  },
  approvedFacultyAt: {
    type: Date,
    default: null
  },
  discussMentor: {
    type: Boolean,
    default: false
  },
  discussMentorAt: {
    type: Date,
    default: null
  },
  discussFaculty: {
    type: Boolean,
    default: false
  },
  discussFacultyAt: {
    type: Date,
    default: null
  },
  cancelled: {
    type: Boolean,
    default: false
  },
  cancelledAt: {
    type: Date,
    default: null
  },
  remarkFaculty: {
    type: String,
    default: ''
  },
  remarkMentor: {
    type: String,
    default: ''
  },
});

const StudentLeave = mongoose.model('StudentLeave', leaveSchema);
const FacultyLeave = mongoose.model('FacultyLeave', leaveSchema);

module.exports = { StudentLeave, FacultyLeave };
