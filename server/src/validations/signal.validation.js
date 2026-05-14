export const validateSignal = (data) => {
  const {
    symbol,
    direction,
    entryPrice,
    stopLoss,
    targetPrice,
    entryTime,
    expiryTime,
  } = data;

  if (
    !symbol ||
    !direction ||
    !entryPrice ||
    !stopLoss ||
    !targetPrice ||
    !entryTime ||
    !expiryTime
  ) {
    return "All fields are required";
  }

  // BUY validation
  if (direction === "BUY") {
    if (Number(stopLoss) >= Number(entryPrice)) {
      return "For BUY, stop loss must be less than entry price";
    }

    if (Number(targetPrice) <= Number(entryPrice)) {
      return "For BUY, target price must be greater than entry price";
    }
  }

  // SELL validation
  if (direction === "SELL") {
    if (Number(stopLoss) <= Number(entryPrice)) {
      return "For SELL, stop loss must be greater than entry price";
    }

    if (Number(targetPrice) >= Number(entryPrice)) {
      return "For SELL, target price must be less than entry price";
    }
  }

  // Expiry validation
  if (new Date(expiryTime) <= new Date(entryTime)) {
    return "Expiry time must be after entry time";
  }

  return null;
};
