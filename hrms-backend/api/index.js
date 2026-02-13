import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/test", (req, res) => {
  res.json({ message: "Backend Working ✅" });
});

// IMPORTANT
export default app;