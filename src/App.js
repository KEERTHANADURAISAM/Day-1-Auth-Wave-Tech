
import { Route, Router, Routes } from 'react-router-dom';
import './App.css';

import LOgin from './LOgin';
import Register from './Register';

function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<LOgin />} />
      </Routes>
   
       {/* <Register/>
     <LOgin/> */}
    
     
    </div>
  );
}

export default App;
