const mongoose = require('mongoose');

// Announcement schema
const announcementSchema = new mongoose.Schema({
    title: String,
    message: String,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Announcement', announcementSchema);
