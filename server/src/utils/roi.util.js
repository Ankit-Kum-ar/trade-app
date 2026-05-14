export const calculateROI = (direction, entryPrice, currentPrice) => {
  let roi = 0;

  if (direction === "BUY") {
    roi = ((currentPrice - entryPrice) / entryPrice) * 100;
  } else {
    roi = ((entryPrice - currentPrice) / entryPrice) * 100;
  }

  return Number(roi.toFixed(2));
};
