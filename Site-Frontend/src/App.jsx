import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './components/Login';
import Contact from './pages/Contact';
import Appointment from './pages/Appointment'; // Import the Appointment component
import ScrollProvider from './components/ScrollProvider';
import EntryPopup from './components/EntryPopup';
import FloatingBar from './components/FlotingBar';
import Tutorial from './pages/Tutorial';
import Shop from './pages/Shop';
import Wishlist from './pages/cart-and-wishlist/Wishlist';
import Cart from './pages/cart-and-wishlist/Cart';
import Account from './pages/Account';
import ProductDetails from './pages/ProductDetails';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect(() => {
  //   const auth = localStorage.getItem('isAuthenticated');
  //   if (auth === 'true') {
  //     setIsAuthenticated(true);
  //   }
  // }, []);


useEffect(() => {
  const auth = localStorage.getItem('isAuthenticated');
  const loginTime = localStorage.getItem('loginTime');

  if (auth === 'true' && loginTime) {
    const now = Date.now();
    const timeDiff = now - parseInt(loginTime); // difference in milliseconds
    const twoHours = 2 * 60 * 60 * 1000; // 2 hours in ms

    if (timeDiff < twoHours) {
      setIsAuthenticated(true);
    } else {
      // Logout if 2 hours have passed
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('loginTime');
      setIsAuthenticated(false);
    }
  }
}, []);


  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <ScrollProvider>
        <EntryPopup />
        <Routes>
          <Route 
            path="/" 
            element={isAuthenticated ? <Home /> : <Login onLogin={handleLogin} />} 
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/appointment" element={<Appointment />} />
          {/* Add other routes as needed */}
          <Route path="/tutorial" element={<Tutorial/>} />
          <Route path="/shop" element={<Shop/>} />
          <Route path="/wishlist" element={<Wishlist/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/account" element={<Account />} />
          <Route path="/shop/:id" element={<ProductDetails />} />
          {/* Redirect to home if no route matches */}
        </Routes>
        <FloatingBar />
      </ScrollProvider>
    </Router>
  );
}

export default App;
