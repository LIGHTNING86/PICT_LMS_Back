const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'pictleavemanagementsystem@gmail.com', // replace with your email
    pass: 'lkfb jldh vgfj scmb'   // replace with your email password
  }
});

const sendRegistrationEmailFaculty = (facultyData) => {
  const mailOptions = {
    from: 'pictleavemanagementsystem@gmail.com',
    to: facultyData.email,
    subject: 'PICT Student Leave Management System - Registration Successful (Faculty)',
    html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <p style="color: #0056b3;">Hello ${facultyData.name},</p>
        <p style="color: #0056b3;">You have been successfully registered for the <b>PICT Student Leave Management System</b> as a Faculty.</p>
        <p>Here are your details:</p>
        <ul>
          <li><strong>Name:</strong> ${facultyData.name}</li>
          <li><strong>Email:</strong> ${facultyData.email}</li>
          <li><strong>Password:</strong><i>Your password is your first name (all in lowercase)</i></li>
          <li><strong>Department:</strong> ${facultyData.department}</li>
          <li><strong>Class:</strong> ${facultyData.cc_class}</li>
          <li><strong>CC ID:</strong> ${facultyData.facultyID}</li>
          <li><strong>Mentor ID:</strong> ${facultyData.mentorID}</li>
          <li><strong>Date of Birth:</strong> ${facultyData.dateOfBirth}</li>
          <li><strong>Contact No:</strong> ${facultyData.contactNo}</li>
          <li><strong>Address:</strong> ${facultyData.address}</li>
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

module.exports = { sendRegistrationEmailFaculty };
