import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useCart } from './hooks/useCart';
import Home from './components/Home';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import './App.scss';

const App: React.FC = () => {
  const { cartCount } = useCart();
  const currentYear = new Date().getFullYear();

  return (
    <Router>
      <header className="header">
        <div className="logo">
          <Link to="/home">
            <img src="/assets/amavya-logo.png" alt="Amavya Logo" />
            <h1>AMAVYA</h1>
          </Link>
        </div>
        <nav className="menu">
          <a href="#home">Home</a>
          <a href="#products">Shop</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <Link to="/cart" className="cart-icon">
            🛒
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
        </nav>
      </header>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      <footer className="footer" style={{ marginTop: '40px', padding: '20px', textAlign: 'center', backgroundColor: '#f5f5f5' }}>
        <p>&copy; {currentYear} Amavya. All rights reserved.</p>
      </footer>
    </Router>
  );
};

export default App;
