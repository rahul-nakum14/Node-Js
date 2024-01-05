const noteModel = require('../models/noteModel');

// const getAllNotes = async (req, res) => {
//     try {
//         const results = await noteModel.find({userID: req.userId });
//         return res.json({ results });
//     } catch (error) {
//         return res.status(500).json({ error: error.message });
//     }
// }
const getAllNotes = async (req, res) => {
    try {
      const notes = await noteModel.find({ userID: req.userId   });
      res.status(200).json(notes);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };


  const getAllNotesAdmin = async (req, res) => {
    try {
      const notes = await noteModel.find({});
      res.status(200).json(notes);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };
// const createNote = async (req,res) =>{
//     const data = req.body;
//     try{
//         const result = await noteModel.create({
//             title:data.title,
//             description:data.description,
//             userID: req.userId
//         });

//         await result.save();
//         return res.status(201).json(result);
//     }
//     catch(error){
//         return res.json(error)
//     }
// }

const createNote = async (req,res)=>{
    const {title,description} = req.body;

    console.log(req.userId);

    const newNote = new noteModel({
        title: title,
        description: description,
        userID: req.userId
    });
    try {
        await newNote.save();
        res.status(201).json(newNote);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Something Went Wrong'});
    }
}


// const updateNote = async(req,res) =>{
//     const id = req.params.id;
//     const data = req.body;

//     try{
//         const dataToBeUpdated = {
//             title: data.title,
//             description: data.description,
//             userID: req.userId
//         };

//         await noteModel.findByIdAndUpdate(id,dataToBeUpdated,{new : true});
//         res.status(200).json(dataToBeUpdated);

//     }catch(error){
//         console.log(error.message);
//     }
// }


const updateNote = async (req, res) => {
    const id = req.params.id;

    const { title, description } = req.body;
  
    try {
      const note = await noteModel.findById(id);

      if (!note) {
        return res.status(404).json({ message: 'Note not found' });
      }
      
      if (note.userID.toString() !== req.userId) {
        return res.status(403).json({ message: 'Unauthorized to update this note' });
      }

 
        const updatedNote = {
          title: title,
          description: description,
          userId: req.userId
        };
        
      const updatedResult = await noteModel.findByIdAndUpdate(id, updatedNote, { new: true });
      res.status(200).json(updatedResult);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  };

// const deleteNote = async (req, res) => {
//     const id = req.params.id;
//     const userId = req.userId; // Assuming this is set by your authentication middleware

//     try {
//         // Find the note by ID
//         const note = await noteModel.findById(id);

//         if (!note) {
//             return res.status(404).json({ error: 'Note not found' });
//         }

//         // Check if the authenticated user is the owner of the note
//         if (String(note.user) !== userId) {
//             return res.status(403).json({ error: 'Unauthorized access to delete this note' });
//         }

//         // User is authorized, proceed with deletion
//         await noteModel.findByIdAndDelete(id);
//         res.status(200).json({ success: 'Note Deleted' });

//     } catch (error) {
//         console.log(error.message);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };

const deleteNote = async (req, res) => {
    const id = req.params.id;
    try {
      const note = await noteModel.findById(id);
  
      if (!note) {
        return res.status(404).json({ message: 'Note not found' });
      }
  
      
      // Check if the note belongs to the authenticated user
      if (note.userID.toString() !== req.userId) {
        return res.status(403).json({ message: 'Unauthorized to update this note' });
      }
      
      const deletedNote = await noteModel.findByIdAndDelete(id);
      res.status(202).json(deletedNote);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  };


// const deleteNote = async(req,res) =>{
//     const id = req.params.id;

//     try{

//         const note = await noteModel.findOneAndDelete(id);
//         // await noteModel.findByIdAndRemove(id);
//         res.status(200).json({Success:'Note Deleted'});

//     }catch(error){
//         console.log(error.message);
//     }
// }



module.exports ={
    getAllNotes,
    createNote,
    updateNote,
    deleteNote,
    getAllNotesAdmin
}