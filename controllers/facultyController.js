const FacultyModel = require('../models/faculty');
const { hashPassword } = require('../helpers/auth');

exports.createFaculty = async (req, res) => {
  try {
    const hashedPassword = await hashPassword(req.body.password);
    const newFaculty = await FacultyModel.create({ ...req.body, password: hashedPassword });
    res.status(201).json(newFaculty);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getFaculties = async (req, res) => {
  try {
    const faculties = await FacultyModel.find();
    res.status(200).json(faculties);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getFacultyById = async (req, res) => {
  try {
    const faculty = await FacultyModel.findOne({ facultyID: req.params.facultyID });
    if (!faculty) {
      return res.status(404).json({ message: 'Faculty not found' });
    }
    res.status(200).json(faculty);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateFaculty = async (req, res) => {
  try {
    const hashedPassword = await hashPassword(req.body.password);
    const updatedFaculty = await FacultyModel.findOneAndUpdate(
      { facultyID: req.params.facultyID },
      {...req.body, password: hashedPassword}, 
      { new: true }
    );
    if (!updatedFaculty) {
      return res.status(404).json({ message: 'Faculty not found' });
    }
    res.status(200).json(updatedFaculty);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteFaculty = async (req, res) => {
  try {
    const deletedFaculty = await FacultyModel.findOneAndDelete({ facultyID: req.params.facultyID });
    if (!deletedFaculty) {
      return res.status(404).json({ message: 'Faculty not found' });
    }
    res.status(200).json({ message: 'Faculty deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
