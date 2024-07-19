const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Send a message
router.post('/', async (req, res) => {
  const { sender, recipient, content } = req.body;
  try {
    const newMessage = new Message({ sender, recipient, content });
    await newMessage.save();
    res.status(201).send('Message sent successfully');
  } catch (error) {
    res.status(400).send('Error sending message');
  }
});

// Get messages by recipient
router.get('/:recipient', async (req, res) => {
  try {
    const messages = await Message.find({ recipient: req.params.recipient }).populate('sender recipient');
    res.status(200).json(messages);
  } catch (error) {
    res.status(400).send('Error fetching messages');
  }
});

module.exports = router;
