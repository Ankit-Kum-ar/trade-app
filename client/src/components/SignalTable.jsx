import { useEffect, useState, useCallback } from "react";

import {
  getSignals,
  getSignalStatus,
  deleteSignal,
} from "../api/signal.api";

const SignalTable = () => {
  const [signals, setSignals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [countdown, setCountdown] = useState(15);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [error, setError] = useState(null);

  const fetchSignals = useCallback(async (isInitialLoad = false) => {
    try {
      if (isInitialLoad) {
        setIsLoading(true);
      } else {
        setIsRefreshing(true);
      }
      setError(null);

      const response = await getSignals();
      const signalList = response.data.data;

      const updatedSignals = await Promise.all(
        signalList.map(async (signal) => {
          const statusResponse = await getSignalStatus(signal.id);
          return statusResponse.data.data;
        })
      );

      setSignals(updatedSignals);
      setLastUpdated(new Date());
      setCountdown(15); // Reset countdown after successful fetch

    } catch (error) {
      console.error(error);
      setError("Failed to fetch signals");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  // Timer for countdown
  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          return 15; // Reset to 15 when it reaches 0
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, []);

  // Main data fetching effect
  useEffect(() => {
    let isMounted = true;
    let refreshInterval;

    const loadInitialData = async () => {
      if (isMounted) {
        await fetchSignals(true);
      }
    };

    loadInitialData();

    // Set up refresh interval
    refreshInterval = setInterval(() => {
      if (isMounted) {
        fetchSignals(false);
      }
    }, 15000);

    return () => {
      isMounted = false;
      if (refreshInterval) {
        clearInterval(refreshInterval);
      }
    };
  }, [fetchSignals]);

  const handleDelete = async (id) => {
    try {
      await deleteSignal(id);
      await fetchSignals(false);
    } catch (error) {
      console.error(error);
      setError("Failed to delete signal");
    }
  };

  const handleManualRefresh = () => {
    fetchSignals(false);
  };

  const formatLastUpdated = (date) => {
    if (!date) return "Never";
    return date.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  const getCountdownColor = () => {
    if (countdown <= 3) return "text-error";
    if (countdown <= 7) return "text-warning";
    return "text-success";
  };

  const formatTimeRemaining = (expiryTime) => {
    if (!expiryTime) return "N/A";
    
    const now = new Date();
    const expiry = new Date(expiryTime);
    const diff = expiry.getTime() - now.getTime();
    
    if (diff <= 0) return "Expired";
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const getTimeRemainingColor = (expiryTime) => {
    if (!expiryTime) return "text-base-content";
    
    const now = new Date();
    const expiry = new Date(expiryTime);
    const diff = expiry.getTime() - now.getTime();
    const hoursRemaining = diff / (1000 * 60 * 60);
    
    if (diff <= 0) return "text-error";
    if (hoursRemaining <= 1) return "text-error";
    if (hoursRemaining <= 24) return "text-warning";
    return "text-success";
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="loading loading-spinner loading-lg"></div>
        <span className="ml-4 text-lg">Loading signals...</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header with Timer and Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-base-200 p-4 rounded-lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Timer Info */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="relative">
                <svg className="w-8 h-8 transform -rotate-90" viewBox="0 0 32 32">
                  <circle
                    cx="16"
                    cy="16"
                    r="14"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="transparent"
                    className="text-base-300"
                  />
                  <circle
                    cx="16"
                    cy="16"
                    r="14"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 14}`}
                    strokeDashoffset={`${2 * Math.PI * 14 * (1 - countdown / 15)}`}
                    className={`transition-all duration-1000 ${getCountdownColor()}`}
                  />
                </svg>
                <span className={`absolute inset-0 flex items-center justify-center text-xs font-bold ${getCountdownColor()}`}>
                  {countdown}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">Auto Refresh</span>
                <span className="text-xs opacity-70">Next in {countdown}s</span>
              </div>
            </div>
          </div>

          {/* Last Updated */}
          <div className="flex items-center gap-2 text-sm">
            <span className="opacity-70">Last updated:</span>
            <span className="font-mono font-medium">
              {formatLastUpdated(lastUpdated)}
            </span>
            {isRefreshing && (
              <div className="loading loading-spinner loading-xs ml-2"></div>
            )}
          </div>
        </div>

        {/* Manual Refresh Button */}
        <button
          onClick={handleManualRefresh}
          disabled={isRefreshing}
          className="btn btn-primary btn-sm gap-2"
        >
          {isRefreshing ? (
            <>
              <div className="loading loading-spinner loading-xs"></div>
              Refreshing...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh Now
            </>
          )}
        </button>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="alert alert-error">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
          <button 
            onClick={() => setError(null)}
            className="btn btn-ghost btn-xs"
          >
            ✕
          </button>
        </div>
      )}

      {/* Signals Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Direction</th>
              <th>Entry Price</th>
              <th>Target</th>
              <th>Stop Loss</th>
              <th>Current Price</th>
              <th>Status</th>
              <th>ROI %</th>
              <th>Time Remaining</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {signals.length === 0 ? (
              <tr>
                <td colSpan="10" className="text-center py-8 opacity-50">
                  No signals found
                </td>
              </tr>
            ) : (
              signals.map((signal) => (
                <tr key={signal.id}>
                  <td className="font-semibold">{signal.symbol}</td>
                  
                  <td>
                    <div className={`badge ${signal.direction === 'BUY' ? 'badge-success' : 'badge-error'}`}>
                      {signal.direction}
                    </div>
                  </td>

                  <td className="font-mono text-sm">{signal.entryPrice}</td>

                  <td className="font-mono text-sm text-success">{signal.targetPrice}</td>

                  <td className="font-mono text-sm text-error">{signal.stopLoss}</td>

                  <td className="font-mono font-semibold text-sm">
                    <span className={`${
                      signal.direction === 'BUY' 
                        ? (signal.currentPrice >= signal.entryPrice ? 'text-success' : 'text-error')
                        : (signal.currentPrice <= signal.entryPrice ? 'text-success' : 'text-error')
                    }`}>
                      {signal.currentPrice}
                    </span>
                  </td>

                  <td>
                    <div className={`badge badge-sm ${
                      signal.status === 'OPEN' ? 'badge-primary' :
                      signal.status === 'TARGET_HIT' ? 'badge-success' :
                      signal.status === 'STOPLOSS_HIT' ? 'badge-error' :
                      'badge-warning'
                    }`}>
                      {signal.status.replace('_', ' ')}
                    </div>
                  </td>

                  <td>
                    <span className={`font-mono font-bold text-sm ${
                      signal.roi > 0 ? 'text-success' : 
                      signal.roi < 0 ? 'text-error' : 'text-base-content'
                    }`}>
                      {signal.roi > 0 ? '+' : ''}{signal.roi}%
                    </span>
                  </td>

                  <td>
                    <span className={`font-mono text-xs font-medium ${getTimeRemainingColor(signal.expiryTime)}`}>
                      {formatTimeRemaining(signal.expiryTime)}
                    </span>
                  </td>

                  <td>
                    <button
                      className="btn btn-error btn-xs"
                      onClick={() => handleDelete(signal.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer with Signal Count */}
      {signals.length > 0 && (
        <div className="text-center text-sm opacity-70">
          Showing {signals.length} signal{signals.length !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  );
};

export default SignalTable;