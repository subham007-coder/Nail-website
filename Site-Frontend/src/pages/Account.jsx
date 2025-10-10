import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiEdit2, FiUser, FiShoppingBag, FiCalendar, FiMail, FiPhone } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { apiRequest } from '../utils/api';
import { uploadToCloudinary, createPreviewUrl, validateImageFile } from '../services/cloudinaryService';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Account() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateStatus, setUpdateStatus] = useState(null);
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [appointmentsLoading, setAppointmentsLoading] = useState(false);
  const [appointmentsError, setAppointmentsError] = useState('');
  const [profileForm, setProfileForm] = useState({
    name: '',
    phone: '',
    address: '',
    country: '',
    city: '',
    image: ''
  });
  const { user, updateUser, getAuthHeaders } = useAuth();

  // Initialize profile form when user data is available or editing starts
  React.useEffect(() => {
    if (user && (isEditing || !profileForm.name)) {
      setProfileForm({
        name: user.name || '',
        phone: user.phone || '',
        address: user.address || '',
        country: user.country || '',
        city: user.city || '',
        image: user.image || ''
      });
    }
  }, [user, isEditing]);

  // Cloudinary image upload function
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Validate file before upload
    const validation = validateImageFile(file);
    if (!validation.valid) {
      setUpdateStatus('image-error');
      console.error('File validation error:', validation.error);
      return;
    }
    
    setUploading(true);
    setUpdateStatus('');
    
    try {
      // Create preview URL for immediate display
      const previewUrl = createPreviewUrl(file);
      setProfileForm(prev => ({ 
        ...prev, 
        image: previewUrl // Show preview immediately
      }));
      
      // Upload to Cloudinary (same implementation as admin)
      const result = await uploadToCloudinary(file, 'profile-images');
      
      // Update form with Cloudinary URL
      setProfileForm(prev => ({ 
        ...prev, 
        image: result.url
      }));
      
      setUpdateStatus('image-success');
      console.log('Profile image uploaded successfully to Cloudinary!');
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      setUpdateStatus('image-error');
      
      // Reset image on error
      setProfileForm(prev => ({ 
        ...prev, 
        image: user?.image || ''
      }));
    } finally {
      setUploading(false);
    }
  };

  // Update profile function
  const handleUpdateProfile = async () => {
    if (!user?._id) {
      setUpdateStatus('error');
      return;
    }

    setUpdateLoading(true);
    setUpdateStatus(null);
    
    try {
      const response = await apiRequest(`/customer/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        },
        body: JSON.stringify({
          name: profileForm.name,
          email: user.email, // Include required email field
          phone: profileForm.phone,
          address: profileForm.address,
          country: profileForm.country,
          city: profileForm.city,
          image: profileForm.image
        })
      });
      
      // Update user in auth context
      updateUser({
        name: profileForm.name,
        phone: profileForm.phone,
        address: profileForm.address,
        country: profileForm.country,
        city: profileForm.city,
        image: profileForm.image
      });
      
      setUpdateStatus('success');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setUpdateStatus('error');
    } finally {
      setUpdateLoading(false);
    }
  };

  // Fetch user orders when viewing Orders tab (single fetch, no polling)
  React.useEffect(() => {
    const shouldFetch = activeTab === 'orders' && user;
    if (!shouldFetch) {
      return undefined;
    }

    const fetchOrders = async () => {
      try {
        setOrdersLoading(true);
        setOrdersError('');
        // Backend resolves user from auth token; supports pagination but we can fetch first page
        const data = await apiRequest(`/order?limit=20&page=1`);
        const list = Array.isArray(data?.orders) ? data.orders : (Array.isArray(data) ? data : []);
        setOrders(list);
      } catch (err) {
        setOrdersError(err.message || 'Failed to load orders');
      } finally {
        setOrdersLoading(false);
      }
    };

    fetchOrders();
    return undefined;
  }, [activeTab, user]);

  // Fetch user appointments when viewing Appointments tab (single fetch)
  React.useEffect(() => {
    const shouldFetch = activeTab === 'appointments' && user;
    if (!shouldFetch) {
      return undefined;
    }

    const fetchAppointments = async () => {
      try {
        setAppointmentsLoading(true);
        setAppointmentsError('');
        const data = await apiRequest(`/appointment-submissions/mine`);
        const list = Array.isArray(data) ? data : [];
        setAppointments(list);
      } catch (err) {
        setAppointmentsError(err.message || 'Failed to load appointments');
      } finally {
        setAppointmentsLoading(false);
      }
    };

    fetchAppointments();
    return undefined;
  }, [activeTab, user]);

  // Form input change handler
  const handleInputChange = (field, value) => {
    setProfileForm(prev => ({ ...prev, [field]: value }));
  };

  // Mock data for appointments only; orders now come from API
  const userData = {
    name: user?.name || 'User',
    email: user?.email || 'user@example.com',
    phone: user?.phone || 'Not provided',
    address: user?.address || 'Not provided',
    country: user?.country || 'Not provided',
    city: user?.city || 'Not provided',
    joinedDate: user?.createdAt
  ? new Date(user.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
  : 'N/A',

    orders: [],
    appointments: [
      {
        id: 'APT001',
        service: 'Classic Manicure',
        date: '2024-03-20',
        time: '10:00 AM',
        status: 'Upcoming'
      }
    ]
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <FiUser className="w-5 h-5" /> },
    { id: 'orders', label: 'Orders', icon: <FiShoppingBag className="w-5 h-5" /> },
    { id: 'appointments', label: 'Appointments', icon: <FiCalendar className="w-5 h-5" /> }
  ];

  const renderProfileContent = () => (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-serif text-gray-900">Profile Information</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center gap-2 px-4 py-2 text-pink-600 border border-pink-600 rounded-lg hover:bg-pink-50 transition-colors"
        >
          <FiEdit2 className="w-4 h-4" />
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Profile Picture */}
        <div className="space-y-4">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden ring-4 ring-pink-200 shadow-lg">
              {profileForm.image || user?.image ? (
                <img
                  src={profileForm.image || user.image}
                  alt={userData.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <FiUser className="w-12 h-12 text-gray-400" />
              )}
            </div>
            {isEditing && (
              <div className="space-y-2">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={uploading}
                  />
                  <span className="text-sm text-pink-600 hover:text-pink-700 border border-pink-600 px-3 py-1 rounded-lg hover:bg-pink-50 transition-colors">
                    {uploading ? 'Uploading...' : 'Change Photo'}
                  </span>
                </label>
                {updateStatus === 'image-success' && (
                  <div className="text-xs text-green-600">Image loaded successfully!</div>
                )}
                {updateStatus === 'image-error' && (
                  <div className="text-xs text-red-600">Image processing failed</div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Profile Details */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            {isEditing ? (
              <input
                type="text"
                value={profileForm.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                placeholder="Enter your full name"
              />
            ) : (
              <p className="text-gray-900">{userData.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FiMail className="inline w-4 h-4 mr-1" />
              Email
            </label>
            <p className="text-gray-900">{userData.email}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FiPhone className="inline w-4 h-4 mr-1" />
              Phone
            </label>
            {isEditing ? (
              <input
                type="tel"
                value={profileForm.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                placeholder="Enter your phone number"
              />
            ) : (
              <p className="text-gray-900">{userData.phone}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>
            {isEditing ? (
              <textarea
                value={profileForm.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                placeholder="Enter your address"
              />
            ) : (
              <p className="text-gray-900">{userData.address}</p>
            )}
          </div>

          {/* Country Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Country
            </label>
            {isEditing ? (
              <input
                type="text"
                value={profileForm.country}
                onChange={(e) => handleInputChange('country', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                placeholder="Enter your country"
              />
            ) : (
              <p className="text-gray-900">{userData.country}</p>
            )}
          </div>

          {/* City Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City
            </label>
            {isEditing ? (
              <input
                type="text"
                value={profileForm.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                placeholder="Enter your city"
              />
            ) : (
              <p className="text-gray-900">{userData.city}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Member Since
            </label>
            <p className="text-gray-900">{userData.joinedDate}</p>
          </div>

          {/* Update Status Messages */}
          {updateStatus === 'success' && (
            <div className="text-sm text-green-600 bg-green-50 p-3 rounded-lg">
              Profile updated successfully!
            </div>
          )}
          {updateStatus === 'error' && (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
              Failed to update profile. Please try again.
            </div>
          )}

          {isEditing && (
            <div className="flex gap-3 pt-4">
              <button 
                onClick={handleUpdateProfile}
                disabled={updateLoading || uploading}
                className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {updateLoading ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setUpdateStatus(null);
                  // Reset form to original user data
                  if (user) {
                    setProfileForm({
                      name: user.name || '',
                      phone: user.phone || '',
                      address: user.address || '',
                      country: user.country || '',
                      city: user.city || '',
                      image: user.image || ''
                    });
                  }
                }}
                disabled={updateLoading}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderOrdersContent = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-serif text-gray-900">Order History</h2>
      {ordersLoading && (
        <div className="text-sm text-gray-500">Loading orders...</div>
      )}
      {ordersError && (
        <div className="text-sm text-red-600">{ordersError}</div>
      )}
      {!ordersLoading && !ordersError && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="text-sm text-gray-500">No orders yet.</div>
          ) : (
            orders.map((order) => {
              const status = (order.status || '').toLowerCase();
              const statusClasses = status === 'delivered'
                ? 'bg-green-100 text-green-800'
                : status === 'processing'
                ? 'bg-yellow-100 text-yellow-800'
                : status === 'cancel'
                ? 'bg-red-100 text-red-800'
                : status === 'pending'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-800';
              return (
                <div key={order._id}
                  className="bg-white border rounded-xl p-6 space-y-4 hover:shadow-soft transition-shadow duration-200"
                >
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Order</p>
                      <p className="font-medium">#{order.invoice}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="font-medium">{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : '-'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClasses}`}>
                        {status ? status.charAt(0).toUpperCase() + status.slice(1) : ''}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total</p>
                      <p className="font-medium">₹{order.total}</p>
                    </div>
                    <div className="flex items-end justify-between md:justify-end md:gap-4">
                      <span className="text-sm text-gray-500">{(order.cart || []).reduce((s, it) => s + (it.quantity || 0), 0)} items</span>
                      <Link to={`/order/${order._id}`} className="text-pink-600 hover:underline text-sm whitespace-nowrap">View details</Link>
                    </div>
                  </div>
                  {/* Concise summary only; details available on order page */}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );

  const renderAppointmentsContent = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-serif text-gray-900">My Appointments</h2>
      {appointmentsLoading && (
        <div className="text-sm text-gray-500">Loading appointments...</div>
      )}
      {appointmentsError && (
        <div className="text-sm text-red-600">{appointmentsError}</div>
      )}
      {!appointmentsLoading && !appointmentsError && (
        <div className="space-y-4">
          {appointments.length === 0 ? (
            <div className="text-sm text-gray-500">No appointments yet.</div>
          ) : (
            appointments.map((apt) => {
              const status = (apt.status || 'Pending').toLowerCase();
              const statusClasses = status === 'confirmed'
                ? 'bg-emerald-100 text-emerald-800'
                : status === 'completed'
                ? 'bg-green-100 text-green-800'
                : status === 'cancelled'
                ? 'bg-red-100 text-red-800'
                : 'bg-blue-100 text-blue-800';
              return (
                <div key={apt._id}
                  className="bg-white border rounded-xl p-6 hover:shadow-soft transition-shadow duration-200"
                >
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Service</p>
                      <p className="font-medium">{apt.service}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="font-medium">{apt.appointmentDate ? new Date(apt.appointmentDate).toLocaleDateString() : '-'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Time</p>
                      <p className="font-medium">{apt.appointmentTime}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClasses}`}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FDF8F5]">
      <Navbar />

      {/* Banner Section */}
      <div className="bg-gradient-to-r from-pink-50 to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-serif text-gray-900 text-center">
            My Account
          </h1>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex text-sm">
            <Link to="/" className="text-gray-600 hover:text-pink-600">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-pink-600">Account</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Tabs */}
          <div className="flex overflow-x-auto scrollbar-hide mb-8">
            <div className="flex space-x-2 p-1 bg-gray-100 rounded-xl">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium
                    transition-all duration-200 whitespace-nowrap
                    ${activeTab === tab.id 
                      ? 'bg-white text-pink-600 shadow-soft' 
                      : 'text-gray-600 hover:text-gray-900'}`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-soft p-6 md:p-8"
          >
            {activeTab === 'profile' && renderProfileContent()}
            {activeTab === 'orders' && renderOrdersContent()}
            {activeTab === 'appointments' && renderAppointmentsContent()}
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Account;