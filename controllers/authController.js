const Student = require('../models/student');
const Faculty = require('../models/faculty');
const Admin = require('../models/admin');
const { hashPassword, comparePassword } = require('../helpers/auth');
const jwt = require('jsonwebtoken');
const { sendRegistrationEmail } = require('../helpers/emailService');
const { sendRegistrationEmailAdmin } = require('../helpers/emailServiceAdmin');
const { sendRegistrationEmailFaculty } = require('../helpers/emailServiceFaculty');

const registerUser = async (req, res) => {
  const { name, email, password, userType, ...otherData } = req.body;

  try {
    const hashedPassword = await hashPassword(password);

    let newUser;
    if (userType === 'student') {
      newUser = new Student({ name, email, password: hashedPassword, ...otherData });
      await newUser.save();
      await sendRegistrationEmail(newUser);
    } else if (userType === 'faculty') {
      newUser = new Faculty({ name, email, password: hashedPassword, ...otherData });
      await newUser.save();
      await sendRegistrationEmailFaculty(newUser);
    } else if (userType === 'admin') {
      newUser = new Admin({ name, email, password: hashedPassword });
      await newUser.save();
      await sendRegistrationEmailAdmin(newUser);
    } else {
      return res.status(400).json({ error: 'Invalid user type' });
    }

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password, userType } = req.body;

    let User;
    switch (userType) {
      case 'student':
        User = Student;
        break;
      case 'faculty':
        User = Faculty;
        break;
      case 'admin':
        User = Admin;
        break;
      default:
        console.error('Invalid User Type:', userType);
        return res.status(400).json({ error: 'Invalid User Type' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.error('User not found:', email);
      return res.status(404).json({ error: 'User not found!' });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      console.error('Invalid Password for user:', email);
      return res.status(400).json({ error: 'Invalid Password! Passwords do not match!' });
    }

    const token = jwt.sign({ email: user.email, id: user._id, name: user.name, userType }, process.env.JWT_SECRET, {});
    res.cookie('token', token).json({ ...user.toObject(), userType });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const getProfile = async (req, res) => {
  try {
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    let User;
    switch (decoded.userType) {
      case 'student':
        User = Student;
        break;
      case 'faculty':
        User = Faculty;
        break;
      case 'admin':
        User = Admin;
        break;
      default:
        return res.status(400).json({ error: 'Invalid User Type' });
    }

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const logoutUser = (req, res) => {
  res.clearCookie('token');
  return res.json({ message: 'Logout successful' });
};

const deleteUser = async (req, res) => {
  const { userType, _id } = req.params;
  console.log(`Deleting user of type ${userType} with ID ${_id}`);

  try {
    let User;
    switch (userType) {
      case 'students':
        User = require('../models/student'); // Adjust path if necessary
        break;
      case 'faculties':
        User = require('../models/faculty'); // Adjust path if necessary
        break;
      case 'admins':
        User = require('../models/admin'); // Adjust path if necessary
        break;
      default:
        console.log('Invalid user type:', userType);
        return res.status(400).json({ error: 'Invalid user type' });
    }

    const user = await User.findByIdAndDelete(_id);
    if (!user) {
      console.log('User not found with ID:', _id);
      return res.status(404).json({ error: 'User not found' });
    }

    console.log('User deleted successfully:', user);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
  
module.exports = {
  registerUser,
  loginUser,
  getProfile,
  logoutUser,
  deleteUser,
};
