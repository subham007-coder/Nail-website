# Email Verification Setup Guide

## Problem Fixed
The email verification links were pointing to `localhost:3000` (store frontend) instead of the Site-Frontend React app.

## Changes Made

### 1. Backend Email Template Updated
- **File**: `backend/lib/email-sender/templates/register/index.js`
- **Change**: Updated verification link to point to Site-Frontend
- **Before**: `${process.env.STORE_URL}/auth/email-verification/${option.token}`
- **After**: `${process.env.SITE_FRONTEND_URL || 'http://localhost:5173'}/verify-email/${option.token}`

### 2. Site-Frontend Email Verification Page
- **File**: `Site-Frontend/src/pages/VerifyEmail.jsx`
- **Features**:
  - Handles email verification tokens
  - Shows loading, success, and error states
  - Automatically redirects to home page after successful verification
  - Provides option to retry registration on error

### 3. Routes Added
- **Route**: `/verify-email/:token`
- **Component**: `VerifyEmail`
- **Purpose**: Handles email verification from email links

### 4. Forgot Password Page
- **File**: `Site-Frontend/src/pages/ForgotPassword.jsx`
- **Route**: `/forgot-password`
- **Purpose**: Allows users to request password reset

## Environment Variables Needed

### Backend (.env)
```env
# Add this to your backend .env file
SITE_FRONTEND_URL=http://localhost:5173
```

### Site-Frontend (.env)
```env
# Make sure these are set in your Site-Frontend .env file
VITE_API_BASE_URL=http://localhost:5000/v1
VITE_API_Super_Admin_URL=http://localhost:5000/v1/admin
```

## Testing the Email Verification Flow

### 1. Start the Backend
```bash
cd backend
npm run dev
```

### 2. Start the Site-Frontend
```bash
cd Site-Frontend
npm run dev
```

### 3. Test Registration
1. Go to `http://localhost:5173/register`
2. Fill out the registration form
3. Check your email for the verification link
4. Click the verification link
5. You should be redirected to the Site-Frontend verification page
6. After successful verification, you'll be redirected to the home page

## Email Verification Flow

1. **User Registration**: User fills out registration form
2. **Email Sent**: Backend sends verification email with token
3. **Email Link**: User clicks link in email
4. **Verification Page**: Site-Frontend loads verification page
5. **Token Processing**: Backend validates token and creates user account
6. **Success**: User is logged in and redirected to home page

## Troubleshooting

### If verification link still points to localhost:3000:
1. Check your backend `.env` file has `SITE_FRONTEND_URL=http://localhost:5173`
2. Restart your backend server
3. Try registering again

### If verification page shows "This site can't be reached":
1. Make sure Site-Frontend is running on port 5173
2. Check that the route `/verify-email/:token` is properly configured
3. Verify the token in the URL is valid

### If verification fails:
1. Check backend logs for errors
2. Verify the token hasn't expired (15 minutes)
3. Check that the user doesn't already exist

## Production Deployment

For production, update the environment variables:

### Backend
```env
SITE_FRONTEND_URL=https://your-site-frontend-domain.com
```

### Site-Frontend
```env
VITE_API_BASE_URL=https://your-backend-domain.com/v1
VITE_API_Super_Admin_URL=https://your-backend-domain.com/v1/admin
```

The email verification system is now properly configured to work with the Site-Frontend React application!
