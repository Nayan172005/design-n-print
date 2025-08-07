// utils/sendMail.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // or use SMTP details for other services
  auth: {
    user: process.env.EMAIL_USER,     // your sender email
    pass: process.env.EMAIL_PASS      // app password (not your real password)
  }
});

const sendAcknowledgementMail = async (toEmail, name) => {
  const mailOptions = {
    from: `"Design N Print" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: 'We received your message!',
    html: `
      <h3>Hi ${name},</h3>
      <p>Thank you for contacting Design N Print. We have received your message and will get back to you shortly.</p>
      <p>Best regards,<br/>The DNP Team</p>
    `
  };

  return transporter.sendMail(mailOptions);
};

module.exports = sendAcknowledgementMail;
