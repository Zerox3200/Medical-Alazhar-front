import React from "react";
import { motion } from "framer-motion";
import { FaFacebook, FaLinkedin, FaEnvelope, FaQuoteLeft, FaGraduationCap, FaAward } from "react-icons/fa";
import deanImg from "../../assets/images/instructor.png";

const DeanMessage = () => {
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
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
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
              className="inline-flex items-center justify-center w-16 h-16 bg-lightBlue/10 rounded-full mb-6"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <FaGraduationCap className="text-3xl text-lightBlue" />
            </motion.div>
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-secondary mb-4"
              variants={itemVariants}
            >
              Dean's Message
            </motion.h2>
            <motion.div
              className="w-24 h-1 bg-lightBlue mx-auto mb-6"
              variants={itemVariants}
            ></motion.div>
            <motion.p
              className="text-lg text-gray-600 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Leadership insights from the Dean of Faculty of Medicine
            </motion.p>
          </motion.div>

          {/* Main Content */}
          <motion.div
            className="grid lg:grid-cols-3 gap-12 items-center"
            variants={containerVariants}
          >
            {/* Dean's Image */}
            <motion.div
              className="lg:col-span-1"
              variants={itemVariants}
            >
              <motion.div
                className="relative"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="relative rounded-2xl overflow-hidden shadow-2xl"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={deanImg}
                    alt="Prof. Hussein Abo-Elgheit - Dean"
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                </motion.div>

                {/* Decorative Elements */}
                <motion.div
                  className="absolute -top-4 -right-4 w-20 h-20 bg-lightBlue/20 rounded-full"
                  variants={floatingVariants}
                  animate="animate"
                ></motion.div>
                <motion.div
                  className="absolute -bottom-4 -left-4 w-16 h-16 bg-blue-600/20 rounded-full"
                  variants={floatingVariants}
                  animate="animate"
                  transition={{ delay: 1 }}
                ></motion.div>

                {/* Credentials Badge */}
                <motion.div
                  className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <h4 className="font-bold text-secondary text-lg">Prof. Hussein Abo-Elgheit</h4>
                  <p className="text-gray-600 text-sm">Dean, Faculty of Medicine</p>
                  <div className="flex items-center mt-2">
                    <FaAward className="text-lightBlue mr-2" />
                    <span className="text-xs text-gray-500">Distinguished Professor</span>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Message Content */}
            <motion.div
              className="lg:col-span-2"
              variants={itemVariants}
            >
              <motion.div
                className="bg-white rounded-2xl p-8 shadow-xl relative"
                variants={cardVariants}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                }}
              >
                {/* Quote Icon */}
                <motion.div
                  className="absolute -top-6 left-8 bg-lightBlue text-white p-4 rounded-full shadow-lg"
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
                    className="text-lg leading-relaxed text-gray-700 mb-8"
                    variants={itemVariants}
                  >
                    "The Continuous Medical Unit represents our faculty's unwavering commitment to lifelong learning in medicine. In this era of rapid medical advancements, it is imperative that our healthcare professionals have access to cutting-edge continuing education that bridges the gap between research and clinical practice."
                  </motion.p>

                  <motion.p
                    className="text-lg leading-relaxed text-gray-700 mb-8"
                    variants={itemVariants}
                  >
                    "Our mission extends beyond traditional education—we are building a community of healthcare leaders who will shape the future of medicine through innovation, compassion, and excellence. The Continuous Medical Unit stands as a testament to our commitment to advancing healthcare education and improving patient outcomes."
                  </motion.p>
                </motion.div>

                {/* Key Points */}
                <motion.div
                  className="grid md:grid-cols-2 gap-6 mb-8"
                  variants={containerVariants}
                >
                  <motion.div
                    className="bg-lightBlue/5 p-4 rounded-lg"
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h5 className="font-semibold text-secondary mb-2">Our Commitment</h5>
                    <p className="text-sm text-gray-600">Lifelong learning and professional development</p>
                  </motion.div>
                  <motion.div
                    className="bg-lightBlue/5 p-4 rounded-lg"
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h5 className="font-semibold text-secondary mb-2">Our Vision</h5>
                    <p className="text-sm text-gray-600">Bridging research and clinical practice</p>
                  </motion.div>
                </motion.div>

                {/* Social Links */}
                <motion.div
                  className="flex items-center space-x-4 pt-6 border-t border-gray-200"
                  variants={itemVariants}
                >
                  <span className="text-gray-600 font-medium">Connect:</span>
                  <motion.a
                    href="https://facebook.com/dean.profile"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-lightBlue hover:text-blue-600 transition-colors duration-300"
                    whileHover={{ scale: 1.1, x: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaFacebook className="mr-2" />
                    <span className="text-sm">Facebook</span>
                  </motion.a>
                  <motion.a
                    href="https://linkedin.com/in/dean.profile"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-lightBlue hover:text-blue-600 transition-colors duration-300"
                    whileHover={{ scale: 1.1, x: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaLinkedin className="mr-2" />
                    <span className="text-sm">LinkedIn</span>
                  </motion.a>
                  <motion.a
                    href="mailto:dean@medfaculty.edu"
                    className="flex items-center text-lightBlue hover:text-blue-600 transition-colors duration-300"
                    whileHover={{ scale: 1.1, x: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaEnvelope className="mr-2" />
                    <span className="text-sm">Email</span>
                  </motion.a>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default DeanMessage;
