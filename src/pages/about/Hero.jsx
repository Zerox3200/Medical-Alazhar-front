import React from "react";
import aboutImage from '../../assets/images/pexels-negativespace-48604.jpg';
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section
      className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url(${aboutImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
        <div className="mb-6">
          <motion.h1 initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
            About Our
            <span className="block text-lightBlue">Continuous Medical Unit</span>
          </motion.h1>
        </div>

        <motion.p initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
          Committed to excellence in medical education and professional development,
          shaping the future of healthcare through innovative learning.
        </motion.p>

        {/* Decorative Element */}
        <div className="flex justify-center items-center space-x-4 mb-8">
          <div className="w-16 h-1 bg-lightBlue rounded-full"></div>
          <div className="w-8 h-1 bg-white rounded-full"></div>
          <div className="w-16 h-1 bg-lightBlue rounded-full"></div>
        </div>

        {/* Stats or Key Points */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <motion.div initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center">
            <div className="text-3xl font-bold text-lightBlue mb-2">25+</div>
            <div className="text-gray-300 text-sm uppercase tracking-wide">Years of Excellence</div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center">
            <div className="text-3xl font-bold text-lightBlue mb-2">1000+</div>
            <div className="text-gray-300 text-sm uppercase tracking-wide">Medical Professionals</div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center">
            <div className="text-3xl font-bold text-lightBlue mb-2">50+</div>
            <div className="text-gray-300 text-sm uppercase tracking-wide">Specialized Courses</div>
          </motion.div>

        </div>
      </div>


    </section>
  );
};

export default Hero;
