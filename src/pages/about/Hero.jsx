import React from "react";
import aboutImage from '../../assets/images/pexels-negativespace-48604.jpg';
import { motion } from "framer-motion";
import { FaPlay, FaArrowDown, FaGraduationCap, FaUsers, FaGlobe } from "react-icons/fa";

const Hero = () => {
  const stats = [
    { number: "25+", label: "Years of Excellence", icon: <FaGraduationCap className="text-2xl" /> },
    { number: "15,000+", label: "Medical Professionals", icon: <FaUsers className="text-2xl" /> },
    { number: "85+", label: "Countries Served", icon: <FaGlobe className="text-2xl" /> }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section
      className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url(${aboutImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 bg-lightBlue/20 rounded-full blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-40 h-40 bg-blue-600/20 rounded-full blur-xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-24 h-24 bg-white/10 rounded-full blur-lg"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center bg-lightBlue/20 backdrop-blur-sm border border-lightBlue/30 text-lightBlue px-6 py-3 rounded-full text-sm font-semibold mb-8"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <FaGraduationCap className="mr-2" />
            World-Class Medical Education Since 1995
          </motion.div>

          {/* Main Title */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            About Our
            <span className="block text-lightBlue bg-gradient-to-r from-lightBlue to-blue-400 bg-clip-text text-transparent">
              Continuous Medical Unit
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-200 mb-8 max-w-4xl mx-auto leading-relaxed"
          >
            Committed to excellence in medical education and professional development,
            <span className="text-lightBlue font-semibold"> shaping the future of healthcare</span> through innovative learning and global collaboration.
          </motion.p>

          {/* Decorative Element */}
          <motion.div
            className="flex justify-center items-center space-x-4 mb-12"
            variants={itemVariants}
          >
            <div className="w-20 h-1 bg-lightBlue rounded-full"></div>
            <div className="w-12 h-1 bg-white rounded-full"></div>
            <div className="w-20 h-1 bg-lightBlue rounded-full"></div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            variants={itemVariants}
          >
            <motion.button
              className="bg-lightBlue text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center space-x-2 hover:bg-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Explore Our Programs</span>
              <FaPlay className="text-sm" />
            </motion.button>

            <motion.button
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-secondary transition-all duration-300 backdrop-blur-sm"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Watch Our Story
            </motion.button>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
            variants={containerVariants}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center group"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
                  whileHover={{
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                  }}
                >
                  <motion.div
                    className="text-lightBlue mb-4 flex justify-center"
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                  >
                    {stat.icon}
                  </motion.div>
                  <div className="text-3xl md:text-4xl font-bold text-lightBlue mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-300 text-sm uppercase tracking-wide">
                    {stat.label}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            variants={floatingVariants}
            animate="animate"
          >
            <motion.div
              className="flex flex-col items-center text-white/70 hover:text-white cursor-pointer"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-sm mb-2">Scroll to explore</span>
              <FaArrowDown className="text-xl animate-bounce" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-1/4 right-10 hidden lg:block"
        variants={floatingVariants}
        animate="animate"
      >
        <div className="bg-white/10 backdrop-blur-sm rounded-full p-4 border border-white/20">
          <FaGraduationCap className="text-2xl text-lightBlue" />
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-1/4 left-10 hidden lg:block"
        variants={floatingVariants}
        animate="animate"
        transition={{ delay: 1 }}
      >
        <div className="bg-lightBlue/20 backdrop-blur-sm rounded-full p-4 border border-lightBlue/30">
          <FaUsers className="text-2xl text-white" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
