import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Capture from './pages/Capture';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/Capture" element={<Capture />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
