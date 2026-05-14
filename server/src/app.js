import express from "express";
import cors from "cors";
import signalRoutes from "./routes/signal.routes.js";

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Running...");
});

app.use("/api/signals", signalRoutes);

export default app;
