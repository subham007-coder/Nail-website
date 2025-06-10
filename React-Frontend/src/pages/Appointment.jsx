import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Appointment() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: ''
  });

  const services = [
    "Manicure",
    "Pedicure",
    "Nail Art Design",
    "Gel Polish Application",
    "Nail Extension",
    "French Tips",
    "Nail Repair"
  ];

  // Available time slots
  const timeSlots = [
    "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "2:00 PM", "2:30 PM",
    "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log({ ...formData, appointmentDate: selectedDate, appointmentTime: selectedTime });
  };

  return (
    <div className="min-h-screen bg-[#FDF8F5]"> {/* Soft ivory background */}
      <Navbar />
      
      {/* Enhanced Banner Section */}
      <div className="relative h-[300px] md:h-[350px] overflow-hidden bg-gradient-to-r from-pink-50 via-[#FDF8F5] to-pink-100">
        <div className="absolute inset-0 bg-[url('/assets/nail-banner.jpg')] opacity-20 bg-cover bg-center"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative h-full flex flex-col items-center justify-center text-center z-10 px-4"
        >
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-light text-gray-800 mb-4 font-serif">
            Book Your Appointment
          </h1>
          <p className="text-sm md:text-base text-gray-600 max-w-md mx-auto font-light">
            Transform your nails into works of art with our expert nail care services
          </p>
        </motion.div>
      </div>

      {/* Main Booking Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Calendar Section */}
            <div className="bg-white p-8 rounded-3xl shadow-soft">
              <h2 className="text-2xl font-serif mb-8 text-center text-gray-800">Select Your Date</h2>
              
              {/* Enhanced Date Picker Container */}
              <div className="bg-gradient-to-br from-pink-50/50 to-purple-50/50 p-6 rounded-2xl border border-pink-100/50 flex justify-center">
                <DatePicker
                  selected={selectedDate}
                  onChange={date => setSelectedDate(date)}
                  inline
                  minDate={new Date()}
                  calendarClassName="!font-light !text-gray-800"
                  dayClassName={date =>
                    `hover:!bg-pink-100 hover:!rounded-full w-10 h-10 !mx-auto flex items-center justify-center
                    transition-all duration-200
                    ${date.getMonth() === new Date().getMonth() ? 'text-gray-800' : 'text-gray-400'}`
                  }
                  monthClassName={() => "!font-serif"}
                  weekDayClassName={() => "!text-gray-500 !font-medium !text-sm"}
                />
              </div>

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
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
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