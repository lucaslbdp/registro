const { Router } = require("express");
const router = Router()

const { renderNoteForm,
    creatNewNote,
    renderNotes,
    deleteNote,
    renderEditForm,
    updateNotes } = require("../controllers/notes.controllers");


//new note 
router.get("/notes/add", renderNoteForm);

router.post("/notes/new-note", creatNewNote)

//get all notes
router.get("/notes", renderNotes)

//edit notes
router.get("/notes/edit/:id", renderEditForm)

router.put("/notes/edit/:id", updateNotes)

// delete notes
router.delete("/notes/delete/:id", deleteNote)




module.exports = router;