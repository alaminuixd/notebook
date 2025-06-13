import Note from "../models/Note.js";

// get all notes
export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// get a single note by id
export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found!" });
    res.status(200).json(note);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error retrieving the note." });
  }
};
// create a new note
export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = new Note({ title: title, content: content });
    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// update a note
export const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
      },
      { new: true }
    );
    if (!updatedNote)
      return res.status(404).json({ message: "Note not found!" });
    res
      .status(200)
      .json([updatedNote, { message: "Note updated successfully." }]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error in note updating." });
  }
};
// delete a note
export const deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote)
      return res.status(404).json({ message: "Not not found!" });
    res.status(404).json({ message: "Note deleted successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error in note deleting." });
  }
};
