import { useState } from "react";
import { useNavigate } from 'react-router-dom';

import { createSignal } from "../api/signal.api";

const SignalForm = ({ showSuccess, showError }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    symbol: "BTCUSDT",
    direction: "BUY",
    entryPrice: "",
    stopLoss: "",
    targetPrice: "",
    entryTime: "",
    expiryTime: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createSignal(formData);

      showSuccess("Signal created successfully!");
      
      // Reset form
      setFormData({
        symbol: "BTCUSDT",
        direction: "BUY",
        entryPrice: "",
        stopLoss: "",
        targetPrice: "",
        entryTime: "",
        expiryTime: "",
      });

      // Navigate to signals page after a short delay
      setTimeout(() => {
        navigate('/signals');
      }, 1000);

    } catch (error) {
      showError(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  return (
    <div className="bg-base-100 rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-8 text-center">
        Create Trading Signal
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Symbol Selection */}
          <div>
            <label htmlFor="symbol" className="block text-sm font-medium mb-2">
              Trading Symbol
            </label>
            <select
              id="symbol"
              name="symbol"
              className="w-full px-3 py-2 border border-gray-600 bg-base-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              onChange={handleChange}
              value={formData.symbol}
            >
              <option value="BTCUSDT">BTCUSDT</option>
              <option value="ETHUSDT">ETHUSDT</option>
              <option value="SOLUSDT">SOLUSDT</option>
            </select>
          </div>

          {/* Direction Selection */}
          <div>
            <label htmlFor="direction" className="block text-sm font-medium mb-2">
              Trade Direction
            </label>
            <select
              id="direction"
              name="direction"
              className="w-full px-3 py-2 border border-gray-600 bg-base-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              onChange={handleChange}
              value={formData.direction}
            >
              <option value="BUY">BUY</option>
              <option value="SELL">SELL</option>
            </select>
          </div>

          {/* Entry Price */}
          <div>
            <label htmlFor="entryPrice" className="block text-sm font-medium mb-2">
              Entry Price
            </label>
            <input
              id="entryPrice"
              type="number"
              name="entryPrice"
              placeholder="0.00000"
              className="w-full px-3 py-2 border border-gray-600 bg-base-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              onChange={handleChange}
              value={formData.entryPrice}
              step="0.00001"
              required
            />
          </div>

          {/* Stop Loss */}
          <div>
            <label htmlFor="stopLoss" className="block text-sm font-medium mb-2">
              Stop Loss
            </label>
            <input
              id="stopLoss"
              type="number"
              name="stopLoss"
              placeholder="0.00000"
              className="w-full px-3 py-2 border border-gray-600 bg-base-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              onChange={handleChange}
              value={formData.stopLoss}
              step="0.00001"
              required
            />
          </div>

          {/* Target Price */}
          <div>
            <label htmlFor="targetPrice" className="block text-sm font-medium mb-2">
              Target Price
            </label>
            <input
              id="targetPrice"
              type="number"
              name="targetPrice"
              placeholder="0.00000"
              className="w-full px-3 py-2 border border-gray-600 bg-base-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              onChange={handleChange}
              value={formData.targetPrice}
              step="0.00001"
              required
            />
          </div>

          {/* Entry Time */}
          <div>
            <label htmlFor="entryTime" className="block text-sm font-medium mb-2">
              Entry Time
            </label>
            <input
              id="entryTime"
              type="datetime-local"
              name="entryTime"
              className="w-full px-3 py-2 border border-gray-600 bg-base-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              onChange={handleChange}
              value={formData.entryTime}
              required
            />
          </div>

          {/* Expiry Time */}
          <div>
            <label htmlFor="expiryTime" className="block text-sm font-medium mb-2">
              Expiry Time
            </label>
            <input
              id="expiryTime"
              type="datetime-local"
              name="expiryTime"
              className="w-full px-3 py-2 border border-gray-600 bg-base-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              onChange={handleChange}
              value={formData.expiryTime}
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-primary text-primary-content py-3 px-4 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-base-100 font-medium transition-colors"
          >
            Create Trading Signal
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignalForm;