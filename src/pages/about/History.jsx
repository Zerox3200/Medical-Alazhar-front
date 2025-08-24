import React from "react";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaGraduationCap, FaGlobe, FaLaptop, FaUsers, FaAward } from "react-icons/fa";

const History = () => {
  const timelineEvents = [
    {
      year: "1995",
      title: "Foundation",
      description: "The Continuous Medical Unit was established as part of the Faculty of Medicine's commitment to lifelong learning for healthcare professionals.",
      icon: <FaGraduationCap className="text-2xl text-lightBlue" />,
      achievement: "Initial establishment"
    },
    {
      year: "2000",
      title: "First Expansion",
      description: "Launched comprehensive certificate programs and began hosting international medical conferences.",
      icon: <FaGlobe className="text-2xl text-lightBlue" />,
      achievement: "International reach"
    },
    {
      year: "2010",
      title: "Digital Transformation",
      description: "Introduced online learning platforms and virtual education programs to reach healthcare professionals worldwide.",
      icon: <FaLaptop className="text-2xl text-lightBlue" />,
      achievement: "Digital innovation"
    },
    {
      year: "2020",
      title: "Global Recognition",
      description: "Achieved international accreditation and expanded to serve thousands of practitioners annually across multiple countries.",
      icon: <FaAward className="text-2xl text-lightBlue" />,
      achievement: "Global accreditation"
    },
    {
      year: "2024",
      title: "Future Forward",
      description: "Continuing to innovate with cutting-edge medical education technology and expanding our global network of healthcare professionals.",
      icon: <FaUsers className="text-2xl text-lightBlue" />,
      achievement: "Innovation leader"
    }
  ];

  const stats = [
    { number: "25+", label: "Years of Excellence" },
    { number: "10,000+", label: "Healthcare Professionals" },
    { number: "500+", label: "Programs Delivered" },
    { number: "50+", label: "Countries Served" }
  ];

  // Simple card animation - only opacity
  const cardVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-lightBlue/10 rounded-full mb-6">
              <FaCalendarAlt className="text-3xl text-lightBlue" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
              Our History
            </h2>
            <div className="w-24 h-1 bg-lightBlue mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              A journey of excellence spanning over two decades, from humble beginnings to becoming a leading force in continuous medical education
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-all duration-300"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                whileHover={{
                  scale: 1.05,
                  y: -10,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                }}
              >
                <div className="text-3xl md:text-4xl font-bold text-lightBlue mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-lightBlue to-blue-600 hidden lg:block"></div>

            {/* Timeline Events */}
            <div className="space-y-12">
              {timelineEvents.map((event, index) => (
                <div
                  key={index}
                  className={`flex items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                >
                  {/* Timeline Dot */}
                  <div className="hidden lg:flex lg:w-1/2 justify-center">
                    <div className="relative">
                      <div className="w-6 h-6 bg-lightBlue rounded-full border-4 border-white shadow-lg"></div>
                      {index < timelineEvents.length - 1 && (
                        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-1 h-12 bg-lightBlue"></div>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="lg:w-1/2 lg:px-8">
                    <motion.div
                      className={`bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 ${index % 2 === 0 ? 'lg:mr-8' : 'lg:ml-8'}`}
                      variants={cardVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.3 }}
                      whileHover={{
                        scale: 1.02,
                        y: -5,
                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                      }}
                    >
                      {/* Year Badge */}
                      <div className="inline-flex items-center bg-lightBlue/10 text-lightBlue px-4 py-2 rounded-full text-sm font-semibold mb-4">
                        <FaCalendarAlt className="mr-2" />
                        {event.year}
                      </div>

                      {/* Icon and Title */}
                      <div className="flex items-center mb-4">
                        <div className="bg-lightBlue/10 p-3 rounded-full mr-4">
                          {event.icon}
                        </div>
                        <h3 className="text-xl font-bold text-secondary">
                          {event.title}
                        </h3>
                      </div>

                      {/* Description */}
                      <p className="text-gray-700 leading-relaxed mb-4">
                        {event.description}
                      </p>

                      {/* Achievement Badge */}
                      <div className="inline-flex items-center bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        {event.achievement}
                      </div>
                    </motion.div>
                  </div>

                  {/* Mobile Timeline Dot */}
                  <div className="lg:hidden flex justify-center mt-6">
                    <div className="relative">
                      <div className="w-4 h-4 bg-lightBlue rounded-full border-2 border-white shadow-lg"></div>
                      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-lightBlue"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Legacy Highlight */}
          <motion.div
            className="mt-16 bg-gradient-to-r from-lightBlue/10 to-blue-600/10 rounded-2xl p-8 text-center"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-2xl font-bold text-secondary mb-4">
              A Legacy of Innovation
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
              From our founding in 1995 to today, we've maintained our focus on practical, clinically relevant education while embracing innovation and technology. Our journey reflects our unwavering commitment to advancing healthcare education and improving patient outcomes worldwide.
            </p>
            <div className="mt-6 flex justify-center">
              <div className="bg-lightBlue text-white px-6 py-3 rounded-full font-semibold">
                Continuing Our Mission
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default History;
