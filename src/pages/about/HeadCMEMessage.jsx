import React from "react";
import { motion } from "framer-motion";
import { FaFacebook, FaLinkedin, FaEnvelope, FaQuoteLeft, FaUserMd, FaChartLine, FaLightbulb, FaHandshake } from "react-icons/fa";
import HeadCMEImg from "../../assets/images/instructor.png";

const HeadCMEMessage = () => {
  const achievements = [
    {
      icon: <FaChartLine className="text-2xl text-blue-600" />,
      title: "500+ Programs",
      description: "Continuing education programs delivered"
    },
    {
      icon: <FaLightbulb className="text-2xl text-blue-600" />,
      title: "Innovation Focus",
      description: "Evidence-based practical education"
    },
    {
      icon: <FaHandshake className="text-2xl text-blue-600" />,
      title: "Global Reach",
      description: "Healthcare professionals worldwide"
    }
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

  const floatingVariants = {
    animate: {
      y: [-5, 5, -5],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            variants={itemVariants}
          >
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 bg-blue-600/10 rounded-full mb-6"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <FaUserMd className="text-3xl text-blue-600" />
            </motion.div>
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-secondary mb-4"
              variants={itemVariants}
            >
              From the Head of CME
            </motion.h2>
            <motion.div
              className="w-24 h-1 bg-blue-600 mx-auto mb-6"
              variants={itemVariants}
            ></motion.div>
            <motion.p
              className="text-lg text-gray-600 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Leading continuous medical education innovation and excellence
            </motion.p>
          </motion.div>

          {/* Main Content */}
          <motion.div
            className="relative"
            variants={containerVariants}
          >

            {/* Content Grid */}
            <motion.div
              className="grid lg:grid-cols-2 gap-12 items-center"
              variants={containerVariants}
            >
              {/* Left Side - Message */}
              <motion.div
                className="lg:order-1 order-2"
                variants={itemVariants}
              >
                <motion.div
                  className="bg-white rounded-2xl p-8 shadow-xl relative border-l-4 border-blue-600"
                  variants={cardVariants}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                  }}
                >
                  {/* Quote Icon */}
                  <motion.div
                    className="absolute -top-6 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <FaQuoteLeft className="text-2xl" />
                  </motion.div>

                  {/* Message Text */}
                  <motion.div
                    className="mt-8"
                    variants={containerVariants}
                  >
                    <motion.p
                      className="text-lg leading-relaxed text-gray-700 mb-6"
                      variants={itemVariants}
                    >
                      "Our Continuous Medical Education programs are designed with practicing clinicians in mind. We focus on practical, evidence-based education that can be immediately applied to improve patient care."
                    </motion.p>

                    <motion.p
                      className="text-lg leading-relaxed text-gray-700 mb-6"
                      variants={itemVariants}
                    >
                      "Through our diverse offerings—from workshops to online courses—we aim to meet the evolving needs of healthcare professionals at all career stages. Our commitment is to provide education that transforms clinical practice and enhances patient outcomes."
                    </motion.p>
                  </motion.div>

                  {/* Signature */}
                  <motion.div
                    className="flex items-center space-x-4 pt-6 border-t border-gray-200"
                    variants={itemVariants}
                  >
                    <motion.div
                      className="w-12 h-12 bg-blue-600/10 rounded-full flex items-center justify-center"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FaUserMd className="text-blue-600" />
                    </motion.div>
                    <div>
                      <h4 className="font-bold text-secondary">Dr. Ahmed Nouh</h4>
                      <p className="text-gray-600 text-sm">Head, Continuous Medical Education Unit</p>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Right Side - Image and Stats */}
              <motion.div
                className="lg:order-2 order-1"
                variants={itemVariants}
              >
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Main Image */}
                  <motion.div
                    className="relative rounded-2xl overflow-hidden shadow-2xl mb-8"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={HeadCMEImg}
                      alt="Dr. Ahmed Nouh - Head of CME"
                      className="w-full h-80 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-transparent to-transparent"></div>

                    {/* Overlay Content */}
                    <motion.div
                      className="absolute bottom-6 left-6 right-6 text-white"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                    >
                      <h4 className="text-xl font-bold mb-2">Dr. Ahmed Nouh</h4>
                      <p className="text-blue-100">Head, Continuous Medical Education Unit</p>
                      <div className="flex items-center mt-2">
                        <motion.div
                          className="w-2 h-2 bg-blue-400 rounded-full mr-2"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        ></motion.div>
                        <span className="text-sm text-blue-200">Leading CME Innovation</span>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Achievements Grid */}
                  <motion.div
                    className="grid grid-cols-3 gap-4"
                    variants={containerVariants}
                  >
                    {achievements.map((achievement, index) => (
                      <motion.div
                        key={index}
                        className="bg-white rounded-lg p-4 shadow-lg text-center"
                        variants={cardVariants}
                        whileHover={{
                          scale: 1.05,
                          y: -5,
                          boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.15)"
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div
                          className="mb-2 flex justify-center"
                          whileHover={{ rotate: 360, scale: 1.2 }}
                          transition={{ duration: 0.6 }}
                        >
                          {achievement.icon}
                        </motion.div>
                        <h5 className="font-semibold text-secondary text-sm mb-1">
                          {achievement.title}
                        </h5>
                        <p className="text-xs text-gray-600">
                          {achievement.description}
                        </p>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Bottom Section - Contact */}
            <motion.div
              className="mt-12 bg-white rounded-2xl p-8 shadow-lg"
              variants={cardVariants}
              whileHover={{ scale: 1.01 }}
            >
              <motion.div
                className="text-center mb-6"
                variants={itemVariants}
              >
                <h3 className="text-2xl font-bold text-secondary mb-2">Get in Touch</h3>
                <p className="text-gray-600">Connect with Dr. Ahmed Nouh for CME inquiries</p>
              </motion.div>

              <motion.div
                className="flex flex-wrap justify-center items-center space-x-8"
                variants={containerVariants}
              >
                {[
                  { icon: <FaFacebook />, text: "Facebook", href: "https://facebook.com/cme.head" },
                  { icon: <FaLinkedin />, text: "LinkedIn", href: "https://linkedin.com/in/cme.head" },
                  { icon: <FaEnvelope />, text: "Email", href: "mailto:cme.head@medfaculty.edu" }
                ].map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:text-blue-700 transition-colors duration-300"
                    whileHover={{ scale: 1.1, x: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {link.icon}
                    <span className="ml-2">{link.text}</span>
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeadCMEMessage;
