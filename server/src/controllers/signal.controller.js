import {
  createSignalService,
  getAllSignalsService,
  getSignalByIdService,
  deleteSignalService,
} from "../services/signal.service.js";
import { validateSignal } from "../validations/signal.validation.js";
import { getLivePrice } from "../services/binance.service.js";
import { calculateROI } from "../utils/roi.util.js";
import { calculateStatus } from "../utils/status.util.js";

export const createSignal = async (req, res) => {
  try {
    const error = validateSignal(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error,
      });
    }

    const signal = await createSignalService(req.body);

    return res.status(201).json({
      success: true,
      data: signal,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getAllSignals = async (req, res) => {
  try {
    const data = await getAllSignalsService();

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getSignalById = async (req, res) => {
  try {
    const signal = await getSignalByIdService(req.params.id);

    if (!signal) {
      return res.status(404).json({
        success: false,
        message: "Signal not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: signal,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const deleteSignal = async (req, res) => {
  try {
    const deletedSignal = await deleteSignalService(req.params.id);

    if (!deletedSignal) {
      return res.status(404).json({
        success: false,
        message: "Signal not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Signal deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getSignalStatus = async (req, res) => {
  try {
    const signal = await getSignalByIdService(req.params.id);

    if (!signal) {
      return res.status(404).json({
        success: false,
        message: "Signal not found",
      });
    }

    // Binance live price
    const currentPrice = await getLivePrice(signal.symbol);

    // Status
    const status = calculateStatus(signal, currentPrice);

    // ROI
    const roi = calculateROI(
      signal.direction,
      Number(signal.entryPrice),
      currentPrice,
    );

    return res.status(200).json({
      success: true,
      data: {
        ...signal,
        currentPrice,
        status,
        roi,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
