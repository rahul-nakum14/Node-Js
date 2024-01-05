const express = require('express');

const { getAllNotes,createNote,updateNote,deleteNote } = require("../controllers/noteController");

const noteRouter = express.Router();


noteRouter.get('/',getAllNotes);
noteRouter.post('/',createNote);
noteRouter.put('/:id',updateNote);
noteRouter.delete('/:id',deleteNote);

module.exports = noteRouter;