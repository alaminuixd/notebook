import mongoose from "mongoose";

export const connectDB = async () => {
  const DB_URI = process.env.MONGO_URI;
  try {
    await mongoose.connect(DB_URI);
    console.log("MongoDB connected successfully.");
  } catch (error) {
    console.error("Error connecting MongoDB", error);
    process.exit(1); // 1 = exit with failior -> 0 means exit with success
  }
};

/* 
--root
  --node_modules
  --src
    --cofig
      db.js
    --controllers
      noteCOntrollers.js
    --models
      Note.js
    --routes
      noteRoutes.js
    server.js
  .env
  package.json
*/
