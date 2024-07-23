const Announcement = require('../models/Announcement'); 

 async function getAnnouncements(){
    try {
        const announcements = await Announcement.find().sort({ date: -1 });
        return announcements;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

module.exports={getAnnouncements}