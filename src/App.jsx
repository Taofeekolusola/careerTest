import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Markets from './components/Markets';
import Wallet from './components/Wallet';
import './App.css';
import OrderBook from './pages/OrderBook';
import Exchange from './components/Exchange'

const App = () => {
  return (
    <Router>
      <header className="header">
        <div className="header__logo">Raven Exchange</div>
        <nav className="header__nav">
          <Link to="/markets" className="header__nav-item">Markets</Link>
          <Link to="/wallet" className="header__nav-item">Wallet</Link>
          <Link to="/exchange" className="header__nav-item">Exchange</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/markets" element={<Markets />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/exchange" element={<Exchange />} />
          <Route path="/markets/:symbol" element={<OrderBook />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;