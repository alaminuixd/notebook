import Note from "../models/Note.js";

export const getAllNotes = async (req, res) => {
  console.log(req.body);
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

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

export const updateNote = async (req, res) => {
  res.status(200).json({ message: "Post updated successfully" });
};

export const deleteNote = async (req, res) => {
  res.status(200).json({ message: "Post deleted successfully" });
};
