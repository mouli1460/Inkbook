const express = require('express');
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require('express-validator');

// Get notes
router.get('/mov', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Add note
router.post(
    '/addnote', 
    fetchuser,
    [
        body('title', 'Enter a valid title').notEmpty(),
        body('description', 'Enter a valid description').isLength({ min: 3 }),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { title, description, tag } = req.body;
            const note = new Notes({
                title, description, tag, user: req.user.id
            });
            const savedNote = await note.save(); // ✅ Renamed variable
            res.json(savedNote);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
);

// Update note
router.put('/update/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    const newNote = {};
    if (title) newNote.title = title;
    if (description) newNote.description = description;
    if (tag) newNote.tag = tag;

    try {
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found"); // ✅ Updated status code
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(403).send("Not Allowed"); // ✅ Updated status code
        }

        note = await Notes.findByIdAndUpdate(
            req.params.id, 
            { $set: newNote }, 
            { new: true }
        );
        
        res.json({ note });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// Delete note
router.delete('/delete/:id', fetchuser, async (req, res) => {
    try {
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found"); // ✅ Updated status code
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(403).send("Not Allowed"); // ✅ Updated status code
        }

        await Notes.findByIdAndDelete(req.params.id);

        res.json({ message: "Successfully deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
