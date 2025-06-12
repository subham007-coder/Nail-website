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

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated');
    if (auth === 'true') {
      setIsAuthenticated(true);
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
          {/* Redirect to home if no route matches */}
        </Routes>
        <FloatingBar />
      </ScrollProvider>
    </Router>
  );
}

export default App;
