import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CustomCalendar from '../components/CustomCalendar';
import { apiRequest } from '../utils/api';
import AnimatedBanner from '../components/AnimatedBanner';

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
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    
    // Validation
    if (!selectedDate || !selectedTime) {
      setSubmitStatus('validation-error');
      return;
    }
    
    setSubmitStatus(null);
    setIsSubmitting(true);
    
    try {
      await apiRequest('/appointment-submissions/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          appointmentDate: selectedDate,
          appointmentTime: selectedTime,
        }),
      });
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', service: '', location: '', address: '' });
      setSelectedDate(null);
      setSelectedTime(null);
      
      toast.success("Appointment booked successfully! We'll contact you soon.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error('Error booking appointment:', error);
      setSubmitStatus('error');
      
      toast.error("Failed to book appointment. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF8F5]">
      <Navbar />
      
      {/* Banner Section */}
      <AnimatedBanner title="Book Your Appointment" subtitle="Transform your nails into works of art with our expert nail care services" />

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
                  disabled={isSubmitting || !selectedDate || !selectedTime}
                  className="w-full bg-pink-600 text-white px-8 py-4 rounded-xl hover:bg-pink-700 
                    transition-all duration-200 flex items-center justify-center group text-lg font-medium
                    shadow-soft hover:shadow-soft-lg transform hover:-translate-y-0.5
                    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? 'Booking...' : 'Complete Booking'}
                  <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                </button>

                {/* Submit Status Message */}
                {submitStatus === 'success' && (
                  <p className="text-center text-sm text-green-600 mt-4">
                    Appointment booked successfully! We will contact you soon.
                  </p>
                )}
                {submitStatus === 'error' && (
                  <p className="text-center text-sm text-red-600 mt-4">
                    There was an error booking your appointment. Please try again.
                  </p>
                )}
                {submitStatus === 'validation-error' && (
                  <p className="text-center text-sm text-red-600 mt-4">
                    Please select both date and time for your appointment.
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