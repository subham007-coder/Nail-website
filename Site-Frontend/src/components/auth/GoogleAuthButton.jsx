import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { signInWithGoogle, initGoogleIdentityServices } from '../../config/googleOAuth';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { apiRequest } from '../../utils/api';

const GoogleAuthButton = ({ 
  buttonText = "Continue with Google", 
  className = "", 
  disabled = false 
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { setUser, setToken } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoogleAuth = async () => {
    try {
      setLoading(true);
      setError('');

      // Sign in with Google
      const googleUserData = await signInWithGoogle();
      
      // Send the user data to the backend OAuth endpoint
      const response = await apiRequest('/customer/signup/oauth', {
        method: 'POST',
        body: JSON.stringify({
          name: googleUserData.name,
          email: googleUserData.email,
          image: googleUserData.image
        })
      });

      if (response.token) {
        // Set user data in auth context
        setUser({
          _id: response._id,
          name: response.name,
          email: response.email,
          address: response.address,
          phone: response.phone,
          image: response.image || googleUserData.image
        });

        // Save tokens to cookies (the auth context will handle this)
        setToken(response.token);
        
        // Save to cookies
        const Cookies = (await import('js-cookie')).default;
        Cookies.set('authToken', response.token, { expires: 1 }); // 1 day
        if (response.refreshToken) {
          Cookies.set('refreshToken', response.refreshToken, { expires: 7 }); // 7 days
        }

        // Handle pending action if exists
        const pendingAction = location.state?.pendingAction;
        if (pendingAction) {
          if (pendingAction.type === 'addToCart') {
            addToCart(pendingAction.product, pendingAction.quantity);
          }
        }
        
        // Navigate to return URL or home
        const from = location.state?.from?.pathname || '/';
        navigate(from, { replace: true });
        
      } else {
        throw new Error('Authentication failed - no token received');
      }

    } catch (error) {
      console.error('Google authentication error:', error);
      setError(error.message || 'Google authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={handleGoogleAuth}
        disabled={loading || disabled}
        className={`
          w-full flex items-center justify-center px-4 py-2 border border-gray-300 
          rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white 
          hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 
          focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed
          transition-colors duration-200
          ${className}
        `}
      >
        <FcGoogle className="w-5 h-5 mr-3 text-red-500" />
        {loading ? 'Signing in...' : buttonText}
      </button>
      
      {error && (
        <div className="mt-2 text-red-600 text-sm text-center">
          {error}
        </div>
      )}
    </div>
  );
};

export default GoogleAuthButton;
