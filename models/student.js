const mongoose = require('mongoose');
const { Schema } = mongoose;

const studentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  rollNo: {
    type: String,
    unique: true,
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
  facultyID: {
    type: String,
    required: true,
  },
  mentorID: {
    type: String,
    required: true,
  },
  registrationNo: {
    type: String,
    unique: true,
    required: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  }
});

const StudentModel = mongoose.model('Student', studentSchema);

module.exports = StudentModel;
