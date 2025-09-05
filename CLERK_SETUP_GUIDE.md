# Clerk Authentication Setup Guide

## Overview
I've successfully implemented Clerk authentication for your nail site. Here's what has been done and what you need to do to complete the setup.

## What's Been Implemented

### Frontend Changes (Site-Frontend)
1. **Updated main.jsx** - Added ClerkProvider wrapper
2. **Updated App.jsx** - Replaced password-based auth with Clerk's SignedIn/SignedOut components
3. **Updated Navbar.jsx** - Added UserButton component for user management
4. **Updated Account.jsx** - Integrated Clerk's UserProfile component
5. **Updated Contact.jsx** - Added authenticated API calls
6. **Updated Appointment.jsx** - Added authenticated API calls
7. **Created useAuthenticatedApi.js** - Custom hook for authenticated API requests
8. **Updated api.js** - Added support for authentication headers

### Backend Changes (Backend)
1. **Created config/auth.js** - Authentication middleware using Clerk
2. **Updated server.js** - Added auth middleware import
3. **Updated contactSubmissionRoutes.js** - Added authentication to POST route
4. **Updated appointmentSubmissionRoutes.js** - Added authentication to POST route
5. **Updated models** - Added userId field to ContactSubmission and AppointmentSubmission schemas

## Setup Instructions

### 1. Create Clerk Account
1. Go to [clerk.com](https://clerk.com) and create an account
2. Create a new application
3. Choose "React" as your framework
4. Copy your publishable key and secret key

### 2. Environment Variables

#### Frontend (.env.local)
Create `Site-Frontend/.env.local`:
```
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
VITE_API_BASE_URL=http://localhost:5000
```

#### Backend (.env)
Create `Backend/.env`:
```
MONGODB_URI=your_mongodb_connection_string
CLERK_SECRET_KEY=sk_test_your_secret_key_here
CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
PORT=5000
```

### 3. Install Backend Dependencies
```bash
cd Backend
npm install @clerk/backend
```

### 4. Configure Clerk Dashboard
1. In your Clerk dashboard, go to "Authentication" → "Email, Phone, Username"
2. Enable the authentication methods you want (email, phone, etc.)
3. Go to "User & Authentication" → "Email, Phone, Username" to configure sign-up options
4. Set up your sign-in and sign-up pages if needed

### 5. Test the Implementation
1. Start your backend: `cd Backend && npm run dev`
2. Start your frontend: `cd Site-Frontend && npm run dev`
3. Visit your site - you should see Clerk's sign-in page
4. Create an account and test the authentication flow

## Key Features Implemented

### Authentication Flow
- Users must sign in to access any page
- Clerk handles all authentication (sign-in, sign-up, password reset)
- Automatic redirect to sign-in page for unauthenticated users

### User Management
- UserButton in navbar for profile management and sign-out
- UserProfile component in Account page for profile editing
- Secure token-based API authentication

### API Security
- All form submissions (contact, appointments) now require authentication
- User ID is stored with submissions for tracking
- JWT tokens are automatically included in API requests

### Route Protection
- All routes are protected by default
- Users are redirected to sign-in if not authenticated
- Seamless experience after authentication

## Customization Options

### Styling
You can customize Clerk's appearance by modifying the `appearance` prop in:
- `Navbar.jsx` (UserButton)
- `Account.jsx` (UserProfile)

### Authentication Methods
Configure in Clerk dashboard:
- Email/password
- Social logins (Google, Facebook, etc.)
- Phone number authentication
- Magic links

### User Data
The system now stores:
- User ID with all submissions
- Automatic user profile management
- Secure session handling

## Troubleshooting

### Common Issues
1. **"Missing Publishable Key" error**: Check your .env.local file
2. **API calls failing**: Ensure backend has correct CLERK_SECRET_KEY
3. **Styling issues**: Check Clerk appearance configurations

### Development Tips
1. Use Clerk's development keys for testing
2. Check browser console for authentication errors
3. Verify environment variables are loaded correctly

## Next Steps
1. Set up your Clerk account and get your keys
2. Configure your environment variables
3. Install the backend dependency
4. Test the authentication flow
5. Customize the appearance to match your brand
6. Set up production keys when ready to deploy

The authentication system is now fully integrated and ready to use!
