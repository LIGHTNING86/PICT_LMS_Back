const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'pictleavemanagementsystem@gmail.com', // replace with your email
    pass: 'lkfb jldh vgfj scmb'   // replace with your email password
  }
});

const sendRegistrationEmailAdmin = (adminData) => {
  const mailOptions = {
    from: 'pictleavemanagementsystem@gmail.com',
    to: adminData.email,
    subject: 'PICT Student Leave Management System - Registration Successful (Admin)',
    html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <p style="color: #0056b3;">Hello ${adminData.name},</p>
        <p style="color: #0056b3;">You have been successfully registered for the <b>PICT Student Leave Management System</b> as an Admin!</p>
        <p>Here are your details:</p>
        <ul>
          <li><strong>Name:</strong> ${adminData.name}</li>
          <li><strong>Email:</strong> ${adminData.email}</li>
          <li><strong>Password:</strong><i>Your password is your first name (all in lowercase)</i></li>
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

module.exports = { sendRegistrationEmailAdmin };
