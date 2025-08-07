// routes/contact.js or in the controller if you have one
const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const sendAcknowledgementMail = require('../utils/sendMail');

router.post('/', async (req, res) => {
  const { name, email, phone, message } = req.body;

  try {
    const contact = await Contact.create({ name, email, phone, message });

    // Send acknowledgement mail
    await sendAcknowledgementMail(email, name);

    res.status(201).json({ message: 'Message received and email sent.' });
  } catch (err) {
    console.error('Contact form error:', err);
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

module.exports = router;
