import React from "react";
import { motion } from "framer-motion";
import { FaUserMd, FaGraduationCap, FaRocket, FaCheckCircle, FaArrowRight, FaStar, FaGlobe, FaAward } from "react-icons/fa";
import { FaHandHoldingMedical } from "react-icons/fa6";

const CTA = () => {
  const benefits = [
    "Access to 200+ Medical Specialties",
    "Expert Mentorship & Guidance",
    "Real-time Progress Tracking",
    "Accredited Certifications",
    "24/7 Learning Platform",
    "Evidence-based Curriculum"
  ];

  const stats = [
    { number: "500+", label: "Active Doctors", icon: <FaUserMd className="text-2xl" /> },
    { number: "98%", label: "Success Rate", icon: <FaAward className="text-2xl" /> },
    { number: "24/7", label: "Support", icon: <FaGlobe className="text-2xl" /> }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-24 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full"
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
          className="absolute bottom-10 right-10 w-24 h-24 bg-white rounded-full"
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
          className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full"
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

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="grid lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Content Section */}
          <motion.div
            className="space-y-8"
            variants={itemVariants}
          >
            <div className="space-y-6">
              <motion.div
                className="inline-flex items-center gap-3 px-4 py-2 bg-blue-700/30 rounded-full text-blue-200 text-sm font-medium"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <FaRocket className="text-lg" />
                Transform Your Medical Career
              </motion.div>

              <motion.h2
                className="text-4xl lg:text-5xl font-bold text-white leading-tight"
                variants={itemVariants}
              >
                Ready to Advance Your
                <span className="text-blue-300 block">Medical Expertise?</span>
              </motion.h2>

              <motion.p
                className="text-xl text-blue-100 leading-relaxed"
                variants={itemVariants}
              >
                Join thousands of medical professionals who have elevated their skills,
                advanced their careers, and improved patient outcomes through our comprehensive
                educational platform.
              </motion.p>
            </div>

            {/* Benefits Grid */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              variants={containerVariants}
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3"
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaCheckCircle className="text-green-400 text-lg flex-shrink-0" />
                  <span className="text-blue-100 font-medium">{benefit}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              variants={itemVariants}
            >
              <motion.button
                className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-3"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaUserMd className="text-lg" />
                Start Your Medical Journey
                <FaArrowRight className="text-lg group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>
              <motion.button
                className="px-8 py-4 border-2 border-blue-400 text-blue-300 font-semibold rounded-lg hover:bg-blue-400 hover:text-blue-900 transition-all duration-300 flex items-center justify-center gap-3"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaGraduationCap className="text-lg" />
                Explore Courses
              </motion.button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              className="flex items-center gap-6 pt-4"
              variants={itemVariants}
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <FaCheckCircle className="text-white text-sm" />
                </div>
                <span className="text-blue-200 text-sm font-medium">Accredited Programs</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <FaUserMd className="text-white text-sm" />
                </div>
                <span className="text-blue-200 text-sm font-medium">Expert Instructors</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Visual Section */}
          <motion.div
            className="relative"
            variants={cardVariants}
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-3xl p-8 backdrop-blur-sm border border-blue-400/30"
              whileHover={{
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              }}
            >
              <div className="text-center space-y-6">
                <motion.div
                  className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto shadow-2xl"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <FaHandHoldingMedical className="text-white text-4xl" />
                </motion.div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-white">Join Our Medical Community</h3>
                  <p className="text-blue-200 leading-relaxed">
                    Connect with fellow medical professionals, share experiences,
                    and grow together in your medical career journey.
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 pt-6">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      className="text-center"
                      variants={itemVariants}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="text-2xl font-bold text-white">{stat.number}</div>
                      <div className="text-blue-200 text-sm">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Rating */}
                <motion.div
                  className="flex items-center justify-center space-x-1 pt-4"
                  variants={itemVariants}
                >
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-sm" />
                  ))}
                  <span className="text-blue-200 text-sm ml-2">4.9/5 Rating</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Floating Elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-green-400/30"
              animate={{
                y: [-5, 5, -5],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <FaCheckCircle className="text-green-400 text-xl" />
            </motion.div>
            <motion.div
              className="absolute -bottom-4 -left-4 w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-blue-400/30"
              animate={{
                y: [5, -5, 5],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            >
              <FaUserMd className="text-blue-400 text-lg" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
