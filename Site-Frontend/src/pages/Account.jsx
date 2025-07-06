import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiEdit2, FiUser, FiShoppingBag, FiCalendar } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Account() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);

  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+91 9999999999',
    joinedDate: 'March 2024',
    orders: [
      {
        id: '#ORD001',
        date: '2024-03-15',
        status: 'Delivered',
        total: 599,
        items: [
          { name: 'Classic French Tips', quantity: 1, price: 299 },
          { name: 'Glitter Ombre', quantity: 1, price: 300 }
        ]
      }
    ],
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
          className="flex items-center gap-2 text-pink-600 hover:text-pink-700 transition-colors"
        >
          <FiEdit2 className="w-4 h-4" />
          <span className="text-sm font-medium">
            {isEditing ? 'Cancel Edit' : 'Edit Profile'}
          </span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-600">Full Name</label>
          {isEditing ? (
            <input
              type="text"
              defaultValue={user.name}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-400 
                focus:ring-2 focus:ring-pink-100 outline-none transition-all"
            />
          ) : (
            <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">{user.name}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-600">Phone Number</label>
          {isEditing ? (
            <input
              type="tel"
              defaultValue={user.phone}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-400 
                focus:ring-2 focus:ring-pink-100 outline-none transition-all"
            />
          ) : (
            <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">{user.phone}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-600">Email Address</label>
          <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">{user.email}</p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-600">Member Since</label>
          <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">{user.joinedDate}</p>
        </div>
      </div>

      {isEditing && (
        <button className="w-full sm:w-auto bg-pink-600 text-white px-8 py-3 rounded-xl 
          hover:bg-pink-700 transition-colors duration-200 flex items-center justify-center gap-2">
          Save Changes
        </button>
      )}
    </div>
  );

  const renderOrdersContent = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-serif text-gray-900">Order History</h2>
      <div className="space-y-4">
        {user.orders.map(order => (
          <div key={order.id} 
            className="bg-white border rounded-xl p-6 space-y-4 hover:shadow-soft transition-shadow duration-200"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-500">Order ID</p>
                <p className="font-medium">{order.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium">{new Date(order.date).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                  bg-green-100 text-green-800">
                  {order.status}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total</p>
                <p className="font-medium">₹{order.total}</p>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <p className="text-sm font-medium text-gray-900 mb-3">Items</p>
              <div className="space-y-2">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-gray-600">{item.name} × {item.quantity}</span>
                    <span className="font-medium">₹{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAppointmentsContent = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-serif text-gray-900">My Appointments</h2>
      <div className="space-y-4">
        {user.appointments.map(apt => (
          <div key={apt.id} 
            className="bg-white border rounded-xl p-6 hover:shadow-soft transition-shadow duration-200"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-500">Service</p>
                <p className="font-medium">{apt.service}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium">{apt.date}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Time</p>
                <p className="font-medium">{apt.time}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                  bg-blue-100 text-blue-800">
                  {apt.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
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