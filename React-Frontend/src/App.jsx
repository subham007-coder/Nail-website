import { useState, useEffect } from 'react';
import Home from './pages/Home';
import Login from './components/Login';
import ScrollProvider from './components/ScrollProvider';

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
    <ScrollProvider>
      {isAuthenticated ? <Home /> : <Login onLogin={handleLogin} />}
    </ScrollProvider>
  );
}

export default App;
