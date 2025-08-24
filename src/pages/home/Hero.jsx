import React from "react";
import { motion } from "framer-motion";
import { FaPlay, FaArrowDown, FaGraduationCap, FaUsers, FaGlobe, FaAward } from "react-icons/fa";
import './Hero.scss';

const Hero = () => {
  const stats = [
    { number: "25+", label: "Years of Excellence", icon: <FaAward className="text-2xl" /> },
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
    <section className="hero">
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

      <div className="hero__content">
        <div className="hero__container">
          <motion.div
            className="hero__text-content"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div
              className="hero__badge"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <FaGraduationCap className="mr-2" />
              <span className="hero__badge-text">Faculty of Medicine - Al-Azhar University</span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              className="hero__title"
              variants={itemVariants}
            >
              Al-Azhar University
              <span className="hero__subtitle bg-gradient-to-r from-lightBlue to-blue-400 bg-clip-text text-transparent">
                Medical Education Excellence
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              className="hero__description"
              variants={itemVariants}
            >
              Empowering the next generation of healthcare professionals through
              innovative medical education, cutting-edge research, and comprehensive
              clinical training. Join us in advancing medical knowledge and patient care.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="hero__cta-group"
              variants={itemVariants}
            >
              <motion.a
                href="/courses"
                className="hero__cta-primary"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* <FaPlay className="mr-2 text-sm" /> */}
                Explore Programs
              </motion.a>

              <motion.a
                href="/about"
                className="hero__cta-secondary"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn About Us
              </motion.a>
            </motion.div>

            {/* Stats Section */}
            <motion.div
              className="hero__stats"
              variants={containerVariants}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="hero__stat group"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300"
                    whileHover={{
                      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                    }}
                  >
                    <motion.div
                      className="text-lightBlue mb-2 flex justify-center"
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.6 }}
                    >
                      {stat.icon}
                    </motion.div>
                    <div className="text-2xl md:text-3xl font-bold text-lightBlue mb-1">
                      {stat.number}
                    </div>
                    <div className="text-gray-300 text-sm uppercase tracking-wide">
                      {stat.label}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="hero__scroll-indicator"
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
