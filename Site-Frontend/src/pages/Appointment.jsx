import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CustomCalendar from '../components/CustomCalendar';
import { apiRequest } from '../utils/api';

function Appointment() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    location: '',
    address: '',
  });
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [submitStatus, setSubmitStatus] = useState(null);

  const services = [
    "Manicure",
    "Pedicure",
    "Nail Art Design",
    "Gel Polish Application",
    "Nail Extension",
    "French Tips",
    "Nail Repair"
  ];

  const locations = [
    "Barasat",
    "Madhyamgram",
    "Ashoknagar",
    "Habra",
    "Machhalandapur",
    "Other"
  ];

  // Available time slots
  const timeSlots = [
    "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "2:00 PM", "2:30 PM",
    "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);
    try {
      await apiRequest('/api/appointment-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          appointmentDate: selectedDate,
          appointmentTime: selectedTime,
        }),
      });
      setSubmitStatus('success');
      setFormData({ name: '', phone: '', service: '', location: '', address: '' });
      setSelectedDate(null);
      setSelectedTime(null);
    } catch {
      setSubmitStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF8F5]">
      <Navbar />
      
      {/* Banner Section */}
      <div className="relative h-[200px] md:h-[250px] overflow-hidden bg-gradient-to-r from-pink-50 to-purple-500">
        {/* Main Gradient Bubbles */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 20, 0],
            opacity: [0.5, 0.7, 0.5]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full
            bg-gradient-to-r from-pink-300 to-pink-400 opacity-50 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            x: [0, -20, 0],
            opacity: [0.4, 0.6, 0.4]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-[-30%] right-[-10%] w-[400px] h-[400px] rounded-full
            bg-gradient-to-l from-pink-100 to-purple-200 opacity-40 blur-3xl"
        />

        {/* Floating Elements */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/4 w-8 h-8 md:w-12 md:h-12 bg-pink-100 rounded-full opacity-40"
        />
        <motion.div
          animate={{
            y: [0, 30, 0],
            x: [0, 20, 0],
            rotate: [0, -360]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 right-1/3 w-6 h-6 md:w-10 md:h-10 bg-purple-100 rounded-lg opacity-40 transform rotate-45"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            y: [0, -15, 0],
            x: [0, 15, 0]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/3 right-1/4 w-4 h-4 md:w-8 md:h-8 border-2 border-pink-200 rounded-full opacity-40"
        />
        <motion.div
          animate={{
            scale: [1, 0.8, 1],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/3 left-1/3 w-5 h-5 md:w-9 md:h-9 bg-purple-100 transform rotate-45 opacity-40"
        />

        {/* Content - Keeping your existing font styles */}
        <div className="relative h-full flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-light text-gray-800 mb-4 font-serif">
              Book Your Appointment
            </h1>
            <p className="text-sm md:text-base text-gray-600 max-w-md mx-auto font-light">
              Transform your nails into works of art with our expert nail care services
            </p>
          </motion.div>
        </div>
      </div>

      {/* Breadcrumb Section */}
      <div className="bg-gray-50 border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex text-sm">
            <Link to="/" className="text-gray-600 hover:text-pink-600">
              Home
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-pink-600">Book Your Appointment</span>
          </nav>
        </div>
      </div>

      {/* Notice Banner */}
      <div className="bg-pink-50">
        <div className="container mx-auto px-4 py-4">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center space-x-2 text-pink-700"
          >
            <svg 
              className="w-5 h-5 flex-shrink-0" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
            <p className="text-sm font-medium">
              No Home Service Available – All appointments must be at the studio
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Booking Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Calendar Section */}
            <div className="bg-white p-8 rounded-3xl shadow-soft">
              <h2 className="text-2xl font-serif mb-8 text-center text-gray-800">Select Your Date</h2>
              
              {/* Replace the old DatePicker with CustomCalendar */}
              <CustomCalendar
                selectedDate={selectedDate}
                onChange={date => setSelectedDate(date)}
              />

              {/* Enhanced Time Selection */}
              {selectedDate && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6 mt-8"
                >
                  <h3 className="text-xl font-serif text-gray-800 text-center">
                    Available Time Slots
                  </h3>
                  <div className="grid grid-cols-3 gap-3">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        className={`py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200
                          ${selectedTime === time 
                            ? 'bg-pink-600 text-white shadow-soft' 
                            : 'bg-pink-50 text-gray-700 hover:bg-pink-100 hover:shadow-soft'
                          }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Enhanced Form Section */}
            <div className="bg-white p-8 rounded-3xl shadow-soft relative overflow-hidden">
              {/* Decorative Element */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-pink-500 rounded-full -mr-20 -mt-20 opacity-50"></div>
              
              <h2 className="text-2xl font-serif mb-8 text-gray-800 relative z-10">Personal Details</h2>
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="space-y-5">
                  {/* Service Type */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-600">
                      Select Service
                    </label>
                    <select
                      required
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-pink-400 
                        focus:ring-2 focus:ring-pink-100 outline-none transition-all bg-white text-gray-700"
                      value={formData.service}
                      onChange={(e) => setFormData({...formData, service: e.target.value})}
                    >
                      <option value="">Choose a service</option>
                      {services.map((service) => (
                        <option key={service} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>

                  {/* Name Field */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-600">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-pink-400 
                        focus:ring-2 focus:ring-pink-100 outline-none transition-all"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-600">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-pink-400 
                        focus:ring-2 focus:ring-pink-100 outline-none transition-all"
                      placeholder="Enter your email address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  {/* Location and Address Fields */}
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-600">
                        Select Location
                      </label>
                      <select
                        required
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-pink-400 
                          focus:ring-2 focus:ring-pink-100 outline-none transition-all bg-white text-gray-700"
                        value={formData.location}
                        onChange={(e) => setFormData({
                          ...formData,
                          location: e.target.value,
                          address: e.target.value === 'Other' ? formData.address : ''
                        })}
                      >
                        <option value="">Choose your location</option>
                        {locations.map((location) => (
                          <option key={location} value={location}>{location}</option>
                        ))}
                      </select>
                    </div>

                    {formData.location === 'Other' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-2"
                      >
                        <label className="block text-sm font-medium text-gray-600">
                          Your Address
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-pink-400 
                            focus:ring-2 focus:ring-pink-100 outline-none transition-all"
                          placeholder="Enter your full address"
                          value={formData.address}
                          onChange={(e) => setFormData({...formData, address: e.target.value})}
                        />
                      </motion.div>
                    )}
                  </div>

                  {/* Phone Field */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-600">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-pink-400 
                        focus:ring-2 focus:ring-pink-100 outline-none transition-all"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>

                {/* Enhanced Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-pink-600 text-white px-8 py-4 rounded-xl hover:bg-pink-700 
                    transition-all duration-200 flex items-center justify-center group text-lg font-medium
                    shadow-soft hover:shadow-soft-lg transform hover:-translate-y-0.5"
                >
                  Complete Booking
                  <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                </button>

                {/* Submit Status Message */}
                {submitStatus === 'success' && (
                  <p className="text-center text-sm text-green-600 mt-4">
                    Appointment booked successfully!
                  </p>
                )}
                {submitStatus === 'error' && (
                  <p className="text-center text-sm text-red-600 mt-4">
                    There was an error booking your appointment. Please try again.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default Appointment;