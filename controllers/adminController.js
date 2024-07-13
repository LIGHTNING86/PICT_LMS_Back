const AdminModel = require('../models/admin');
const { hashPassword } = require('../helpers/auth');

exports.createAdmin = async (req, res) => {
  try {
    const hashedPassword = await hashPassword(req.body.password);
    const newAdmin = await AdminModel.create({ ...req.body, password: hashedPassword });
    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAdmins = async (req, res) => {
  try {
    const admins = await AdminModel.find();
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAdminById = async (req, res) => {
  try {
    const admin = await AdminModel.findById(req.params._id); // Make sure this matches the route parameter
    if (!admin) {
      return res.status(404).send({ message: 'Admin not found' });
    }
    res.status(200).send(admin);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.updateAdmin = async (req, res) => {
  try {
    const hashedPassword = await hashPassword(req.body.password);
    const updatedAdmin = await AdminModel.findOneAndUpdate(
      { _id: req.params._id },
      {...req.body, password: hashedPassword}, 
      { new: true }
    );
    if (!updatedAdmin) {
      return res.status(404).json({ message: 'Faculty not found' });
    }
    res.status(200).json(updatedAdmin);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
