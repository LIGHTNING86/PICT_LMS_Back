const mongoose = require('mongoose');
const { Schema } = mongoose;

const facultySchema = new Schema({
  name: {
    type: String,
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
  department: {
    type: String,
    required: true,
  },
  cc_class: {
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
  contactNo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  }
});

const FacultyModel = mongoose.model('Faculty', facultySchema);

module.exports = FacultyModel;
