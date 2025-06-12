import express from "express";
import router from "./routes/noteRoutes.js";
import { connectDB } from "./config/db.js";
import Note from "./models/Note.js";
import dotenv from "dotenv";

dotenv.config();
console.log(process.env.MONGO_URI);

const app = express();
const PORT = process.env.PORT || 3001;

connectDB();
app.use(express.json());

app.use("/api/notes", router);

app.get("/api/notes", async (req, res) => {
  console.log(req.body); // this line code
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/notes", async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title: title, content: content });
    await newNote.save();
    res.status(201).json({ message: "Note created successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.put("/api/notes", async (req, res) => {
  res.status(200).json({ message: "Post updated successfully" });
});

app.delete("/api/notes", async (req, res) => {
  res.status(200).json({ message: "Post deleted successfully" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
