import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './components/Login';
import Contact from './pages/Contact';
import ScrollProvider from './components/ScrollProvider';
import EntryPopup from './components/EntryPopup';
import FloatingBar from './components/FlotingBar';

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
        </Routes>
        <FloatingBar />
      </ScrollProvider>
    </Router>
  );
}

export default App;
