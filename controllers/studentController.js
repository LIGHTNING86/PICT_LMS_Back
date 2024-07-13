const StudentModel = require('../models/student');
const { hashPassword } = require('../helpers/auth');

exports.createStudent = async (req, res) => {
  try {
    const hashedPassword = await hashPassword(req.body.password);
    const newStudent = await StudentModel.create({ ...req.body, password: hashedPassword });
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getStudents = async (req, res) => {
  try {
    const students = await StudentModel.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getStudentById = async (req, res) => {
  try {
    const student = await StudentModel.findOne({ registrationNo: req.params.registrationNo });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const hashedPassword = await hashPassword(req.body.password);
    const updatedStudent = await StudentModel.findOneAndUpdate(
      { registrationNo: req.params.registrationNo },
      { ...req.body, password: hashedPassword },
      { new: true }
    );
    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const deletedStudent = await StudentModel.findOneAndDelete({ registrationNo: req.params.registrationNo });
    if (!deletedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json({ message: 'Student deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
