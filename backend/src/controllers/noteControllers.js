export const getAllNotes = (req, res) => {
  res
    .status(200)
    .send(`<h1 style="text-align:center">Hello there! how are you?</h1>`);
};

export const createNote = (req, res) => {
  res.status(201).json({ message: "Post created successfully" });
};

export const updateNote = (req, res) => {
  res.status(200).json({ message: "Post updated successfully" });
};

export const deleteNote = (req, res) => {
  res.status(200).json({ message: "Post deleted successfully" });
};
