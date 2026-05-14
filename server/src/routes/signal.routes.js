import express from "express";
import {
  createSignal,
  getAllSignals,
  getSignalById,
  deleteSignal,
  getSignalStatus,
} from "../controllers/signal.controller.js";

const router = express.Router();

router.post("/", createSignal);
router.get("/", getAllSignals);
router.get("/:id/status", getSignalStatus);
router.get("/:id", getSignalById);
router.delete("/:id", deleteSignal);

export default router;
