import React, { useState } from 'react';
import { motion } from 'framer-motion';

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function CustomCalendar({ selectedDate, onChange }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const renderCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10"></div>);
    }

    // Calendar days
    for (let i = 1; i <= lastDate; i++) {
      const isSelected = selectedDate && 
        i === selectedDate.getDate() && 
        month === selectedDate.getMonth() && 
        year === selectedDate.getFullYear();
      
      const isToday = i === today.getDate() && 
        month === today.getMonth() && 
        year === today.getFullYear();

      days.push(
        <motion.button
          key={i}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onChange(new Date(year, month, i))}
          className={`
            h-10 w-10 rounded-full flex items-center justify-center text-sm
            transition-all duration-200 relative group
            ${isSelected ? 'bg-pink-600 text-white' : 
              isToday ? 'bg-gray-800 text-white' : 
              'hover:bg-pink-50 text-gray-700'}
          `}
        >
          {i}
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 
            bg-pink-400 rounded-full opacity-0 group-hover:opacity-100 
            transition-opacity duration-200"></span>
        </motion.button>
      );
    }

    return days;
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
    onChange(new Date());
  };

  return (
    <div className="flex flex-col lg:flex-row bg-white rounded-3xl overflow-hidden shadow-soft">
      {/* Left Panel */}
      <div className="relative lg:w-1/2 overflow-hidden">
        {/* Animated Background */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 bg-gradient-to-br from-pink-400 to-purple-500"
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
          className="absolute top-1/4 left-1/4 w-8 h-8 bg-blue-300 rounded-full blur-sm"
        />
        <motion.div
          animate={{
            x: [0, 20, 0],
            y: [0, -15, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/3 right-1/4 w-12 h-12 bg-red-400 rounded-full blur-sm"
        />
        <motion.div
          animate={{
            rotate: [0, 180, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/2 right-1/3 w-6 h-6 bg-white/20 rounded-lg blur-sm"
        />

        {/* Content Container */}
        <div className="relative p-8 h-full">
          <button
            onClick={goToToday}
            className="absolute top-4 right-4 px-4 py-1.5 text-xs font-medium
              bg-white/20 text-white/100 hover:bg-white/30 rounded-full transition-colors backdrop-blur-sm"
          >
            TODAY
          </button>
          <div className="h-full flex flex-col items-center justify-center text-white">
            <motion.p 
              className="text-lg font-light mb-4"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {monthNames[currentDate.getMonth()]} - {currentDate.getFullYear()}
            </motion.p>
            <motion.p 
              className="text-7xl md:text-8xl font-bold"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                y: [0, -10, 0]
              }}
              transition={{
                duration: 0.5,
                y: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            >
              {selectedDate ? selectedDate.getDate() : new Date().getDate()}
            </motion.p>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="lg:w-1/2 p-4">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={prevMonth}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            ‹
          </button>
          <p className="text-gray-800 font-medium">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </p>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            ›
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="h-10 flex items-center justify-center text-sm font-serif text-gray-600">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {renderCalendarDays()}
        </div>
      </div>
    </div>
  );
}

export default CustomCalendar;