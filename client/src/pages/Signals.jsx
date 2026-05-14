import { Link } from 'react-router-dom';
import SignalTable from "../components/SignalTable";

const Signals = () => {
  return (
    <div className="min-h-screen bg-base-200 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Trading Signals</h1>
          <Link 
            to="/"
            className="btn btn-primary"
          >
            Create New Signal
          </Link>
        </div>
        <SignalTable />
      </div>
    </div>
  );
};

export default Signals;