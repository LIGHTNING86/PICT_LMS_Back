const express = require('express');
const cors = require('cors');
const { registerUser, loginUser, getProfile, logoutUser, deleteUser } = require('../controllers/authController');
const router = express.Router();

// Middleware
router.use(
    cors({
        credentials: true,
        origin: 'https://stupendous-torrone-c85e13.netlify.app',
    })
);

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', getProfile);
router.post('/logout', logoutUser);
router.delete('/:userType/:_id', deleteUser); // Ensure this is correctly defined

module.exports = router;
