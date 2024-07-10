import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
;
dotenv.config();


import InventoryRoutes from "./routes/inventory.routes.js"
import ComboRoutes from "./routes/combo.routes.js";
import s3Router from "./routes/s3.routes.js";

const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(function (req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*");
  const allowedOrigins = process.env.CORS_ORIGIN;
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-credentials", false);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE, PATCH");
  next();
});

app.use("/api/v1/inventory", InventoryRoutes);
app.use("/api/v1/combo", ComboRoutes);
app.use("/api/v1/s3", s3Router);

app.get("/", (req, res) => {
  res.json({ success: true, message: "sever is running ✅" });
});

app.listen(process.env.PORT || 8080, () => {
  console.log("server is running ... on http://localhost:8080 ✅🔥");
});