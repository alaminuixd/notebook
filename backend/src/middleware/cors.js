import dotenv from "dotenv";
// CORS stands for Cross-Origin Resource Sharing.
dotenv.config();
const customCors = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.CLIENT_ORIGIN);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200); // For preflight requests
  }

  next();
};
export default customCors;
