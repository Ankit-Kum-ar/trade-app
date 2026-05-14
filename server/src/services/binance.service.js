import axios from "axios";

export const getLivePrice = async (symbol) => {
  const response = await axios.get(
    `${process.env.BINANCE_BASE_URL}/api/v3/ticker/price?symbol=${symbol}`,
  );

  return Number(response.data.price);
};
