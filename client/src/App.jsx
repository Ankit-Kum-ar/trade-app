import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useToast } from './hooks/useToast';
import Dashboard from "./pages/Dashboard";
import Signals from "./pages/Signals";
import ToastContainer from './components/ToastContainer';

function App() {
  const { toasts, showSuccess, showError, removeToast } = useToast();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard showSuccess={showSuccess} showError={showError} />} />
        <Route path="/signals" element={<Signals showSuccess={showSuccess} showError={showError} />} />
      </Routes>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </Router>
  );
}

export default App;