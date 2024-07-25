const express = require('express');
const router = express.Router();
const Announcement = require('../models/Announcement');

router.get('/', async (req, res) => {
    try {
        const announcements = await Announcement.find();
        res.json(announcements);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post('/', async (req, res) => {
    const announcement = new Announcement({
        title: req.body.title,
        message: req.body.message
    });

    try {
        const savedAnnouncement = await announcement.save();
        res.redirect(req.get('referer'))
    } catch (err) {
        res.status(400).send(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const removedAnnouncement = await Announcement.findByIdAndRemove(req.params.id);
        res.json(removedAnnouncement);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;