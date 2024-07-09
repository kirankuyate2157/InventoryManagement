import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
;
dotenv.config();


import InventoryRoutes from "./routes/inventory.routes.js"
import ComboRoutes from "./routes/combo.routes.js"
const app = express();

app.use(express.json({ limit: "16kb" }));


app.use("/api/v1/inventory", InventoryRoutes)
app.use("/api/v1/combo", ComboRoutes)

app.get("/", (req, res) => {
  res.json({ success: true, message: "sever is running ✅" });
});

app.listen(process.env.PORT || 8080, () => {
  console.log("server is running ... on http://localhost:8080 ✅🔥");
});