import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiRequest } from '../utils/api';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  // Initialize auth state from cookies
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const savedToken = Cookies.get('authToken');
        const refreshToken = Cookies.get('refreshToken');
        
        if (savedToken) {
          setToken(savedToken);
          // Verify token and get user data
          try {
            const userData = await apiRequest('/customer/me', {
              headers: {
                'Authorization': `Bearer ${savedToken}`
              }
            });
            setUser(userData.user);
          } catch (error) {
            // Token might be expired, try to refresh
            if (refreshToken) {
              try {
                const refreshResponse = await apiRequest('/customer/refresh', {
                  method: 'POST',
                  body: JSON.stringify({ refreshToken })
                });
                
                const newToken = refreshResponse.accessToken;
                setToken(newToken);
                Cookies.set('authToken', newToken, { expires: 1 }); // 1 day
                
                // Get user data with new token
                const userData = await apiRequest('/customer/me', {
                  headers: {
                    'Authorization': `Bearer ${newToken}`
                  }
                });
                setUser(userData.user);
              } catch (refreshError) {
                // Both tokens are invalid, clear everything
                logout();
              }
            } else {
              logout();
            }
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await apiRequest('/customer/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });

      if (response.token) {
        setToken(response.token);
        setUser({
          _id: response._id,
          name: response.name,
          email: response.email,
          address: response.address,
          phone: response.phone,
          image: response.image
        });

        // Save tokens to cookies
        Cookies.set('authToken', response.token, { expires: 1 }); // 1 day
        if (response.refreshToken) {
          Cookies.set('refreshToken', response.refreshToken, { expires: 7 }); // 7 days
        }

        return { success: true, user: response };
      } else {
        throw new Error('No token received');
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      const response = await apiRequest('/customer/verify-email', {
        method: 'POST',
        body: JSON.stringify(userData)
      });

      return { success: true, message: response.message };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const completeRegistration = async (token) => {
    try {
      setLoading(true);
      const response = await apiRequest(`/customer/register/${token}`, {
        method: 'POST'
      });

      if (response.token) {
        setToken(response.token);
        setUser({
          _id: response._id,
          name: response.name,
          email: response.email,
          address: response.address,
          phone: response.phone,
          image: response.image
        });

        // Save tokens to cookies
        Cookies.set('authToken', response.token, { expires: 1 });
        if (response.refreshToken) {
          Cookies.set('refreshToken', response.refreshToken, { expires: 7 });
        }

        return { success: true, user: response };
      } else {
        throw new Error('No token received');
      }
    } catch (error) {
      console.error('Registration completion error:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    Cookies.remove('authToken');
    Cookies.remove('refreshToken');
  };

  const updateUser = (updatedUser) => {
    setUser(prevUser => ({ ...prevUser, ...updatedUser }));
  };

  const getAuthHeaders = () => {
    if (token) {
      return {
        'Authorization': `Bearer ${token}`
      };
    }
    return {};
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    completeRegistration,
    logout,
    updateUser,
    getAuthHeaders,
    isAuthenticated: !!user && !!token
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
