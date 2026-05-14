export const calculateStatus = (signal, currentPrice) => {
  const now = new Date();

  // Expiry first
  if (now > new Date(signal.expiryTime)) {
    return "EXPIRED";
  }

  // BUY
  if (signal.direction === "BUY") {
    if (currentPrice >= Number(signal.targetPrice)) {
      return "TARGET_HIT";
    }

    if (currentPrice <= Number(signal.stopLoss)) {
      return "STOPLOSS_HIT";
    }
  }

  // SELL
  if (signal.direction === "SELL") {
    if (currentPrice <= Number(signal.targetPrice)) {
      return "TARGET_HIT";
    }

    if (currentPrice >= Number(signal.stopLoss)) {
      return "STOPLOSS_HIT";
    }
  }

  return "OPEN";
};
