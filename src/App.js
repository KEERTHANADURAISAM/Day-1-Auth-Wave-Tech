import { Routes, Route } from 'react-router-dom';
import './App.css';

import LOgin from './LOgin'; // Fix typo from LOgin
import Register from './Register';
import Dashboard from './Dashboard';
import ProtectedRoute from './ProtectedRoute'; // 👈 Import this
import Logout from './Logout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<LOgin />} />
        

<Route path="/logout" element={<Logout />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
          {/* Toast container should be outside Routes */}
          <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}

export default App;
