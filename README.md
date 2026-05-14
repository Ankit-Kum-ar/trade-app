# Trading Signal Tracker

A comprehensive full-stack web application for managing and tracking cryptocurrency trading signals with real-time price updates and performance analytics.

## 🚀 Overview

The Trading Signal Tracker is designed to help traders create, monitor, and analyze trading signals for cryptocurrency pairs. The application provides real-time market data integration, automated signal status tracking, and comprehensive performance metrics to optimize trading strategies.

### Key Features

- **Signal Management**: Create, view, and delete trading signals with entry/exit criteria
- **Real-Time Tracking**: Live price updates with automatic signal status determination
- **Performance Analytics**: ROI calculations and win rate tracking
- **Responsive UI**: Modern, mobile-friendly interface with dark theme
- **Auto-Refresh**: Configurable automatic data refresh with visual countdown
- **Toast Notifications**: User-friendly success/error notifications

## 🏗️ Architecture

### System Design
```
┌─────────────────┐    HTTP/REST API    ┌─────────────────┐
│                 │ ◄──────────────────► │                 │
│   React Client  │                     │  Express Server │
│   (Frontend)    │                     │   (Backend)     │
│                 │                     │                 │
└─────────────────┘                     └─────────────────┘
                                               │
                                               │ Database
                                               ▼
                                        ┌─────────────────┐
                                        │                 │
                                        │  NeonDB         │
                                        │  (PostgreSQL)   │
                                        │                 │
                                        └─────────────────┘
                                               ▲
                                               │ External API
                                               │
                                        ┌─────────────────┐
                                        │                 │
                                        │  Binance API    │
                                        │  (Price Data)   │
                                        │                 │
                                        └─────────────────┘
```

## 📁 Project Structure

```
trade-app/
├── client/                     # React Frontend Application
│   ├── src/
│   │   ├── components/         # Reusable React components
│   │   │   ├── SignalForm.jsx     # Signal creation form
│   │   │   ├── SignalTable.jsx    # Signal display table
│   │   │   └── ToastContainer.jsx # Notification system
│   │   ├── pages/             # Application pages
│   │   │   ├── Dashboard.jsx      # Main dashboard page
│   │   │   └── Signals.jsx        # Signals listing page
│   │   ├── hooks/             # Custom React hooks
│   │   │   └── useToast.js        # Toast notification hook
│   │   ├── api/               # API client configuration
│   │   │   └── signal.api.js      # Signal API endpoints
│   │   ├── App.jsx            # Main application component
│   │   └── main.jsx          # Application entry point
│   ├── package.json          # Frontend dependencies
│   └── .env                  # Environment variables
│
└── server/                    # Express Backend Application
    ├── src/
    │   ├── controllers/       # Request handlers
    │   │   └── signal.controller.js
    │   ├── routes/           # API route definitions
    │   │   └── signal.routes.js
    │   ├── services/         # Business logic layer
    │   │   ├── signal.service.js
    │   │   └── binance.service.js
    │   ├── utils/           # Utility functions
    │   │   ├── status.util.js
    │   │   └── roi.util.js
    │   ├── validations/     # Input validation
    │   │   └── signal.validation.js
    │   ├── db/             # Database configuration
    │   │   ├── config/
    │   │   │   └── db.js
    │   │   └── schema/
    │   │       └── signal.schema.js
    │   ├── app.js          # Express app configuration
    │   └── server.js       # Application entry point
    └── package.json        # Backend dependencies
```

## 🛠️ Technology Stack

### Frontend (`/client`)
- **React 19.2.6** - Modern UI library with hooks
- **React Router DOM 7.15.1** - Client-side routing
- **Vite 8.0.12** - Fast build tool and dev server
- **Tailwind CSS 4.3.0** - Utility-first CSS framework
- **DaisyUI 5.5.19** - Component library for Tailwind
- **Axios 1.16.1** - HTTP client for API requests

### Backend (`/server`)
- **Node.js** - JavaScript runtime
- **Express.js 5.2.1** - Web application framework
- **Drizzle ORM 0.45.2** - Type-safe database toolkit
- **NeonDB** - Serverless PostgreSQL database
- **Cors 2.8.6** - Cross-origin resource sharing
- **Dotenv 17.4.2** - Environment variable management

### External Services
- **Binance API** - Real-time cryptocurrency price data
- **NeonDB Serverless** - Cloud PostgreSQL database

## 🚦 Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **NeonDB account** (for database)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd trade-app
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Environment Configuration**
   
   **Server** (`/server/.env`):
   ```env
   PORT=5000
   DATABASE_URL=your_neon_db_connection_string
   BINANCE_API_URL=https://api.binance.com/api/v3
   ```

   **Client** (`/client/.env`):
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd server
   npm run dev
   ```
   Server will run on `http://localhost:5000`

2. **Start the frontend client** (in a new terminal)
   ```bash
   cd client
   npm run dev
   ```
   Client will run on `http://localhost:5173`

## 📊 Database Schema

### Signals Table
```sql
CREATE TABLE signals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  symbol VARCHAR(20) NOT NULL,           -- Trading pair (e.g., 'BTCUSDT')
  direction VARCHAR(4) NOT NULL,         -- 'BUY' or 'SELL'
  entry_price DECIMAL(20,8) NOT NULL,    -- Signal entry price
  target_price DECIMAL(20,8) NOT NULL,   -- Profit target price
  stop_loss DECIMAL(20,8) NOT NULL,      -- Stop loss price
  entry_time TIMESTAMP NOT NULL,         -- When to enter the trade
  expiry_time TIMESTAMP NOT NULL,        -- Signal expiration time
  created_at TIMESTAMP DEFAULT NOW(),    -- Record creation time
  updated_at TIMESTAMP DEFAULT NOW()     -- Last update time
);
```

## 🔄 API Endpoints

### Signal Management
- `GET /api/signals` - Retrieve all signals
- `POST /api/signals` - Create a new signal
- `DELETE /api/signals/:id` - Delete a signal
- `GET /api/signals/:id/status` - Get signal status with live data

### Response Format
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "symbol": "BTCUSDT",
    "direction": "BUY",
    "entryPrice": 50000.00,
    "targetPrice": 55000.00,
    "stopLoss": 48000.00,
    "currentPrice": 51000.00,
    "status": "OPEN",
    "roi": 2.0,
    "entryTime": "2026-05-15T10:00:00Z",
    "expiryTime": "2026-05-16T10:00:00Z"
  }
}
```

## 🔧 Key Features Implementation

### Real-Time Price Updates
- Integration with Binance API for live price data
- Automatic signal status calculation (OPEN, TARGET_HIT, STOPLOSS_HIT)
- 15-second auto-refresh with visual countdown timer

### Signal Status Logic
- **OPEN**: Signal is active and monitoring price
- **TARGET_HIT**: Price reached the target (profitable exit)
- **STOPLOSS_HIT**: Price hit stop loss (loss mitigation)
- **EXPIRED**: Signal passed expiry time without execution

### ROI Calculation
- Real-time profit/loss percentage calculation
- Direction-aware calculations (BUY vs SELL signals)
- Visual indicators for profitable vs losing positions

### User Experience
- Toast notifications for user actions
- Responsive design for mobile and desktop
- Loading states and error handling
- Auto-navigation after signal creation

## 🔐 Security Considerations

- Input validation on both client and server
- SQL injection prevention with parameterized queries
- CORS configuration for secure cross-origin requests
- Environment variable protection of sensitive data

## 📈 Performance Optimizations

- Efficient database queries with indexes
- Client-side caching of API responses
- Debounced API calls to prevent spam
- Optimized re-renders with React hooks

## 🧪 Development Guidelines

### Code Structure
- **MVC Pattern**: Controllers handle requests, services contain business logic
- **Component Composition**: Reusable UI components with clear responsibilities
- **Custom Hooks**: Shared logic extraction for better maintainability
- **API Layer**: Centralized HTTP client configuration

### Best Practices
- TypeScript-style JSDoc comments for better documentation
- Consistent error handling across the application
- Environment-based configuration management
- Clean separation of concerns between layers

## 🚀 Future Enhancements

- [ ] User authentication and authorization
- [ ] Portfolio management and tracking
- [ ] Advanced technical analysis indicators
- [ ] WebSocket integration for real-time updates
- [ ] Mobile application development
- [ ] Backtesting functionality
- [ ] Multiple exchange integration
- [ ] Advanced charting and visualization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Built with ❤️ for the trading community**