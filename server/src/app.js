import express from "express";
import cors from "cors";
import signalRoutes from "./routes/signal.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Running...");
});

app.use("/api/signals", signalRoutes);

export default app;
