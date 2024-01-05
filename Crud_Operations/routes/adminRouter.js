const express = require('express');

const { getAllNotesAdmin} = require("../controllers/noteController");

const adminRouter = express.Router();


adminRouter.get('/',getAllNotesAdmin);


module.exports = adminRouter;