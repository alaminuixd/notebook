import express from "express";
import router from "./routes/noteRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();
console.log(process.env.MONGO_URI);
const app = express();
const PORT = process.env.PORT || 3001;

connectDB();

// middlewares
app.use(express.json()); // middleware to parse JSON body: / req.body
app.use(rateLimiter);
app.use("/api/notes", router); // routing middleware

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
