const express = require('express')
const router = express.Router()
const Note = require('../models/NoteSchema')



//Create a note

router.post('/newnote', async (req, res) => {
    const note = req.body
    const newNote = await Note.create(note)
    if (newNote) {
        res.json(newNote)
    } else {
        res.status(404).send({message: 'error'})
    }
})

// retrive all notes

router.get('/allnotes', async (req, res) => {
    const allNote = await Note.find()
    if (allNote) {
        res.json(allNote)
    } else {
        res.status(404).send({ message: 'no note founded' })
        
    }
})

// retrive a single note

router.get("/:id", async (req, res) => {
  const noteId = req.params.id;
  const singlenote = await Note.findById(noteId);
  if (singlenote) {
    res.json(singlenote);
  } else {
    res.status(404).send({ message: "note not found" });
  }
});

module.exports = router;

