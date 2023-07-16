const express = require('express');
const { createNote, deleteNote, updateNote, getNotes } = require('../controllers/nodeController');
const auth = require('../middlewares/auth');
const nodeRouter = express.Router();

nodeRouter.get('/',auth ,getNotes);

nodeRouter.post('/',auth , createNote);

nodeRouter.delete('/:id',auth, deleteNote);

nodeRouter.put('/:id',auth , updateNote);

module.exports = nodeRouter;