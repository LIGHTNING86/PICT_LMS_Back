const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const leaveRoutes = require('./routes/leaveRoutes');
const studentLeaveRoutes = require('./routes/studentLeaveRoutes'); // Adjust the path as necessary
const { mongoose } = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();

const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const facultyRoutes = require('./routes/facultyRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Database connection
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database Connected...'))
    .catch((err) => console.log('Database not connected!!!', err));

// Middleware
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/faculties', facultyRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/leave', leaveRoutes);
app.use('/api/leave', studentLeaveRoutes);

const port = 8000;
app.listen(port, () => console.log('Server is running on port: ' + port));