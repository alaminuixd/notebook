import express from "express";
import dotenv from "dotenv";

import router from "./routes/noteRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import customCors from "./middleware/cors.js";

dotenv.config();
console.log(process.env.MONGO_URI);
const app = express();
const PORT = process.env.PORT || 3001;

// middlewares
app.use(customCors); // use this if you don't use "cors"
// app.use(cors()); // use this if you don't use customCors
app.use(express.json()); // middleware to parse JSON body: / req.body
app.use(rateLimiter);
app.use("/api/notes", router); // routing middleware

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
