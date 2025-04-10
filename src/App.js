import { Routes, Route } from 'react-router-dom';
import './App.css';

import LOgin from './LOgin'; // Fix typo from LOgin
import Register from './Register';
import Dashboard from './Dashboard';
import ProtectedRoute from './ProtectedRoute'; // 👈 Import this
import Logout from './Logout';



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
    </div>
  );
}

export default App;
