 import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Nav } from './components/Nav';
import { StockGraph } from './components/StockGraph';
import { StockDetail } from './components/StockDetail';

function App() {
  return (
    // add navbar here
    <div className="bg-indigo-200 bg-cover w-full h-screen">
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<StockGraph />} />
        <Route path="/detail" element={<StockDetail />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
