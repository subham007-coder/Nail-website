import { motion } from "framer-motion";

function AnimatedBanner({ title, subtitle }) {
  return (

<div className="relative h-[200px] md:h-[250px] overflow-hidden bg-gradient-to-r from-pink-50 to-purple-500">
  {/* Main Gradient Bubbles */}
  <motion.div
    animate={{
      scale: [1, 1.2, 1],
      x: [0, 20, 0],
      opacity: [0.5, 0.7, 0.5],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full
     bg-gradient-to-r from-pink-300 to-pink-400 opacity-50 blur-3xl"
  />
  <motion.div
    animate={{
      scale: [1, 1.1, 1],
      x: [0, -20, 0],
      opacity: [0.4, 0.6, 0.4],
    }}
    transition={{
      duration: 10,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className="absolute bottom-[-30%] right-[-10%] w-[400px] h-[400px] rounded-full
     bg-gradient-to-l from-pink-100 to-purple-200 opacity-40 blur-3xl"
  />

  {/* Floating Elements */}
  <motion.div
    animate={{
      y: [0, -20, 0],
      rotate: [0, 360],
      scale: [1, 1.1, 1],
    }}
    transition={{
      duration: 15,
      repeat: Infinity,
      ease: "linear",
    }}
    className="absolute top-1/4 left-1/4 w-8 h-8 md:w-12 md:h-12 bg-pink-100 rounded-full opacity-40"
  />
  <motion.div
    animate={{
      y: [0, 30, 0],
      x: [0, 20, 0],
      rotate: [0, -360],
    }}
    transition={{
      duration: 20,
      repeat: Infinity,
      ease: "linear",
    }}
    className="absolute bottom-1/4 right-1/3 w-6 h-6 md:w-10 md:h-10 bg-purple-100 rounded-lg opacity-40 transform rotate-45"
  />
  <motion.div
    animate={{
      scale: [1, 1.2, 1],
      y: [0, -15, 0],
      x: [0, 15, 0],
    }}
    transition={{
      duration: 12,
      repeat: Infinity,
      ease: "linear",
    }}
    className="absolute top-1/3 right-1/4 w-4 h-4 md:w-8 md:h-8 border-2 border-pink-200 rounded-full opacity-40"
  />
  <motion.div
    animate={{
      scale: [1, 0.8, 1],
      rotate: [0, 180, 360],
    }}
    transition={{
      duration: 18,
      repeat: Infinity,
      ease: "linear",
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
        {title}
      </h1>
      <p className="text-sm md:text-base text-gray-600 max-w-md mx-auto font-light">
        {subtitle}
      </p>
    </motion.div>
  </div>
</div>
  )
}

export default AnimatedBanner;
