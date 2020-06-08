const express = require("express");
const router = express.Router();
const Note = require("../models/NoteSchema");
const User = require("../models/UserSchema");

//Create a note

router.post("/newnote", async (req, res) => {
  const note = req.body;
  const newNote = await Note.create(note);
  if (newNote) {
    res.json(newNote);
  } else {
    res.status(404).send({ message: "error" });
  }
});

// retrive all notes

router.get("/allnotes", async (req, res) => {
  const allNote = await Note.find();
  if (allNote) {
    res.json(allNote);
  } else {
    res.status(404).send({ message: "no note founded" });
  }
});

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

// create a user for test purpose (no singin auth)
router.post("/newuser", async (req, res) => {
  const user = req.body;
  const newUser = await User.create(user);
  if (newUser) {
    res.json(newUser);
  } else {
    res.status(404).send({ message: "error creating user" });
  }
});

// Add specific note to a user from note id, or it can be done whit the id of the user

router.post("/addtofav/:id", async (req, res) => {
      const favoritenoteId = req.params.id;

  const userId = req.body.id;

    const addNoteToFav = await User.findByIdAndUpdate(userId, {
      $push: { favorites: favoritenoteId },
    });
    if (addNoteToFav) {
         res.json(addNoteToFav);
      } else {
        res.status(404).send({ message: "error add to note to fav" });
          }
});

//retrive  favs notes from user
router.post("/fav/:id", async (req, res) => {
    const userId = req.params.id;

    const favnoteuser = await User.findById(userId).populate("favorites");
    if (favnoteuser) {
      res.json(favnoteuser);
    } else {
      res.status(404).send({ message: "error retrive notes" });
    }
})



module.exports = router;
