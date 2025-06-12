import express from "express";
import router from "./routes/noteRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();
console.log(process.env.MONGO_URI);

const app = express();
const PORT = process.env.PORT || 3001;

connectDB();
app.use(express.json());

app.use("/api/notes", router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
