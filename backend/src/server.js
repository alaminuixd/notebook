import express from "express";
import router from "./routes/noteRoutes.js";

const app = express();
const PORT = 3001;

app.use("/api/notes", router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
