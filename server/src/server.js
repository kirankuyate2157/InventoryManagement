import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json({ limit: "16kb" }));


app.get("/", (req, res) => {
    res.json({ success: true, message: "sever is running ✅" });
  });

  app.listen(process.env.PORT || 8080, () => {
    console.log("server is running ... on http://localhost:8080 ✅🔥");
  });