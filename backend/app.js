import express from "express";
import aiRoutes from "./src/routes/ai.route.js";
import cors from "cors"
const app = express();

app.get("/", (req, res) => {
  res.send("hello world!");
});
app.use(cors())
app.use(express.json());
app.use("/api", aiRoutes);

export default app;
