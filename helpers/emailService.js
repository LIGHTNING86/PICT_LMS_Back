// emailService.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'pictleavemanagementsystem@gmail.com', // replace with your email
    pass: 'lkfb jldh vgfj scmb'   // replace with your email password
  }
});

const sendRegistrationEmail = (studentData) => {
  const mailOptions = {
    from: 'pictleavemanagementsystem@gmail.com',
    to: studentData.email,
    subject: 'PICT Student Leave Management System - Registration Successful (Student)',
    html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <p style="color: #0056b3;">Hello ${studentData.name},</p>
        <p style="color: #0056b3;">You have been successfully registered for the <b>PICT Student Leave Management System!</b></p>
        <p>Here are your details:</p>
        <ul>
          <li><strong>Name:</strong> ${studentData.name}</li>
          <li><strong>Email:</strong> ${studentData.email}</li>
          <li><strong>Password:</strong><i>Your password is your first name (all in lowercase)</i></li>
          <li><strong>Roll No:</strong> ${studentData.rollNo}</li>
          <li><strong>Class:</strong> ${studentData.class}</li>
          <li><strong>CC ID:</strong> ${studentData.facultyID}</li>
          <li><strong>Mentor ID:</strong> ${studentData.mentorID}</li>
          <li><strong>Registration No:</strong> ${studentData.registrationNo}</li>
          <li><strong>Date of Birth:</strong> ${studentData.dateOfBirth}</li>
          <li><strong>Contact No:</strong> ${studentData.contactNo}</li>
          <li><strong>Address:</strong> ${studentData.address}</li>
        </ul>
        <p style="color: #0056b3;">You can always change your details in your<span style="color: #FF0000;"><b> Update Profile</b></span> section.</p>
        <p style="color: #0056b3;">Thank you for registering!</p>
        <p style="color: #0056b3;"><strong>Regards,</strong></p>
        <p style="color: #0056b3;"><strong>Pune Institute of Computer Technology (PICT), Pune</strong></p>
      </div>
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

module.exports = { sendRegistrationEmail };
