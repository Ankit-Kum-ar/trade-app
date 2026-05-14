import { Link } from 'react-router-dom';
import SignalForm from "../components/SignalForm";

const Dashboard = ({ showSuccess, showError }) => {
  return (
    <div className="min-h-screen bg-base-200 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Trading Signal Tracker</h1>
          <Link 
            to="/signals"
            className="btn btn-outline btn-primary"
          >
            View All Signals
          </Link>
        </div>
        
        <SignalForm showSuccess={showSuccess} showError={showError} />
      </div>
    </div>
  );
};

export default Dashboard;
