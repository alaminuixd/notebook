import express from "express";
import dotenv from "dotenv";
import path from "path";

import router from "./routes/noteRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import customCors from "./middleware/cors.js";

dotenv.config();
console.log(process.env.MONGO_URI);
const app = express();
const PORT = process.env.PORT || 3001;
const __dirname = path.resolve();
// console.log(__dirname);

// middlewares
if (process.env.NODE_ENV !== "production") {
  app.use(customCors); // use this if you don't use "cors"
}
// app.use(cors("http://localhost:5174/")); // use this if you don't use customCors
app.use(express.json()); // middleware to parse JSON body: / req.body
app.use(rateLimiter);
app.use("/api/notes", router); // routing middleware
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
