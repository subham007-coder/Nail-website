// Google OAuth Configuration
export const GOOGLE_OAUTH_CONFIG = {
  clientId: '951443313997-d85ge7l3nidl7b0pd9k4qjf0ca4vvef5.apps.googleusercontent.com',
  redirectUris: ['http://localhost:5173', 'https://nail-website-delta.vercel.app']
};

// Initialize Google Identity Services
export const initGoogleIdentityServices = () => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('Google Identity Services can only be initialized in the browser'));
      return;
    }

    // Check if google identity services is already loaded
    if (window.google && window.google.accounts) {
      resolve(window.google);
      return;
    }

    // Load Google Identity Services script if not already loaded
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.onload = () => {
      if (window.google && window.google.accounts) {
        resolve(window.google);
      } else {
        reject(new Error('Google Identity Services failed to load'));
      }
    };
    script.onerror = () => {
      reject(new Error('Failed to load Google Identity Services script'));
    };
    document.head.appendChild(script);
  });
};

// Google Sign-In function using Google Identity Services
export const signInWithGoogle = () => {
  return new Promise((resolve, reject) => {
    initGoogleIdentityServices().then((google) => {
      // Create a popup-based OAuth2 flow
      const client = google.accounts.oauth2.initTokenClient({
        client_id: GOOGLE_OAUTH_CONFIG.clientId,
        scope: 'email profile',
        callback: (tokenResponse) => {
          if (tokenResponse.error) {
            reject(new Error(tokenResponse.error));
            return;
          }
          
          // Get user info using the access token
          fetch(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${tokenResponse.access_token}`)
            .then(response => response.json())
            .then(userInfo => {
              const userData = {
                name: userInfo.name,
                email: userInfo.email,
                image: userInfo.picture,
                googleId: userInfo.id,
                accessToken: tokenResponse.access_token
              };
              resolve(userData);
            })
            .catch(error => {
              reject(new Error('Failed to get user info: ' + error.message));
            });
        }
      });
      
      // Request access token which will trigger the popup
      client.requestAccessToken();
    }).catch(reject);
  });
};

// Google Sign-Out function
export const signOutFromGoogle = () => {
  return new Promise((resolve) => {
    if (window.google && window.google.accounts) {
      window.google.accounts.id.disableAutoSelect();
    }
    resolve();
  });
};
