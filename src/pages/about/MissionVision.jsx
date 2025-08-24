import React from "react";
import { motion } from "framer-motion";
import { FaEye, FaStar, FaUsers, FaAward, FaLightbulb } from "react-icons/fa";
import { FiTarget } from "react-icons/fi";

const MissionVision = () => {
    const whyChooseUs = [
        {
            icon: <FaStar className="text-3xl text-lightBlue" />,
            title: "A Legacy of Excellence",
            description: "For decades, the Faculty of Medicine at Al-Azhar University has been at the forefront of medical education and healthcare."
        },
        {
            icon: <FaUsers className="text-3xl text-lightBlue" />,
            title: "Nurturing Leaders",
            description: "We take pride in nurturing generations of doctors who not only heal but also lead, inspire, and innovate."
        },
        {
            icon: <FaLightbulb className="text-3xl text-lightBlue" />,
            title: "Innovation & Research",
            description: "Cutting-edge research facilities and innovative teaching methods for modern medical challenges."
        },
        {
            icon: <FaAward className="text-3xl text-lightBlue" />,
            title: "Global Recognition",
            description: "Internationally recognized programs and partnerships with leading medical institutions worldwide."
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
        <section className="py-20 bg-gray-50">
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
                        <motion.h2
                            className="text-4xl md:text-5xl font-bold text-secondary mb-6"
                            variants={itemVariants}
                        >
                            Our Mission & Vision
                        </motion.h2>
                        <motion.div
                            className="w-24 h-1 bg-lightBlue mx-auto mb-8"
                            variants={itemVariants}
                        ></motion.div>
                        <motion.p
                            className="text-lg text-gray-600 max-w-3xl mx-auto"
                            variants={itemVariants}
                        >
                            Shaping the future of healthcare through excellence, innovation, and compassion
                        </motion.p>
                    </motion.div>

                    {/* Mission & Vision Cards */}
                    <motion.div
                        className="grid lg:grid-cols-2 gap-12 mb-20"
                        variants={containerVariants}
                    >
                        {/* Mission Card */}
                        <motion.div
                            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-lightBlue"
                            variants={cardVariants}
                            whileHover={{
                                scale: 1.02,
                                y: -5,
                                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                            }}
                        >
                            <motion.div
                                className="flex items-center mb-6"
                                variants={itemVariants}
                            >
                                <motion.div
                                    className="bg-lightBlue/10 p-4 rounded-full mr-4"
                                    whileHover={{ rotate: 360, scale: 1.1 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <FiTarget className="text-3xl text-lightBlue" />
                                </motion.div>
                                <h3 className="text-2xl font-bold text-secondary">Our Mission</h3>
                            </motion.div>
                            <motion.p
                                className="text-lg leading-relaxed text-gray-700 mb-6"
                                variants={itemVariants}
                            >
                                At Al-Azhar University's Faculty of Medicine, our mission is to shape future physicians who combine medical excellence with ethical responsibility.
                            </motion.p>
                            <motion.div
                                className="bg-lightBlue/5 p-4 rounded-lg"
                                variants={itemVariants}
                                whileHover={{ scale: 1.02 }}
                            >
                                <h4 className="font-semibold text-secondary mb-2">Key Focus Areas:</h4>
                                <ul className="space-y-2 text-gray-700">
                                    {[
                                        "Medical Excellence & Clinical Skills",
                                        "Ethical Responsibility & Professionalism",
                                        "Patient-Centered Care Approach"
                                    ].map((item, index) => (
                                        <motion.li
                                            key={index}
                                            className="flex items-center space-x-2"
                                            variants={itemVariants}
                                            whileHover={{ x: 5 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <motion.div
                                                className="w-2 h-2 bg-lightBlue rounded-full"
                                                whileHover={{ scale: 1.5 }}
                                            ></motion.div>
                                            <span>{item}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>
                        </motion.div>

                        {/* Vision Card */}
                        <motion.div
                            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-blue-600"
                            variants={cardVariants}
                            whileHover={{
                                scale: 1.02,
                                y: -5,
                                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                            }}
                        >
                            <motion.div
                                className="flex items-center mb-6"
                                variants={itemVariants}
                            >
                                <motion.div
                                    className="bg-blue-600/10 p-4 rounded-full mr-4"
                                    whileHover={{ rotate: 360, scale: 1.1 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <FaEye className="text-3xl text-blue-600" />
                                </motion.div>
                                <h3 className="text-2xl font-bold text-secondary">Our Vision</h3>
                            </motion.div>
                            <motion.p
                                className="text-lg leading-relaxed text-gray-700 mb-6"
                                variants={itemVariants}
                            >
                                We envision a healthier world where knowledge, research, and compassion come together to serve humanity.
                            </motion.p>
                            <motion.div
                                className="bg-blue-600/5 p-4 rounded-lg"
                                variants={itemVariants}
                                whileHover={{ scale: 1.02 }}
                            >
                                <h4 className="font-semibold text-secondary mb-2">Vision Pillars:</h4>
                                <ul className="space-y-2 text-gray-700">
                                    {[
                                        "Advancing Medical Knowledge",
                                        "Innovative Research & Discovery",
                                        "Compassionate Healthcare Service"
                                    ].map((item, index) => (
                                        <motion.li
                                            key={index}
                                            className="flex items-center space-x-2"
                                            variants={itemVariants}
                                            whileHover={{ x: 5 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <motion.div
                                                className="w-2 h-2 bg-blue-600 rounded-full"
                                                whileHover={{ scale: 1.5 }}
                                            ></motion.div>
                                            <span>{item}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* Why Choose Us Section */}
                    <motion.div
                        className="bg-white rounded-2xl p-12 shadow-lg"
                        variants={cardVariants}
                        whileHover={{ scale: 1.01 }}
                    >
                        <motion.div
                            className="text-center mb-12"
                            variants={itemVariants}
                        >
                            <motion.h3
                                className="text-3xl md:text-4xl font-bold text-secondary mb-4"
                                variants={itemVariants}
                            >
                                Why Choose Us
                            </motion.h3>
                            <motion.div
                                className="w-16 h-1 bg-lightBlue mx-auto mb-6"
                                variants={itemVariants}
                            ></motion.div>
                            <motion.p
                                className="text-lg text-gray-600 max-w-2xl mx-auto"
                                variants={itemVariants}
                            >
                                Your platform for career improvement and professional development in the medical field
                            </motion.p>
                        </motion.div>

                        {/* Features Grid */}
                        <motion.div
                            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
                            variants={containerVariants}
                        >
                            {whyChooseUs.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    className="text-center group"
                                    variants={cardVariants}
                                    whileHover={{
                                        scale: 1.05,
                                        y: -10
                                    }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <motion.div
                                        className="bg-gray-50 p-6 rounded-xl hover:bg-lightBlue/5 transition-all duration-300 group-hover:-translate-y-2"
                                        whileHover={{
                                            boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.15)"
                                        }}
                                    >
                                        <motion.div
                                            className="mb-4 flex justify-center"
                                            whileHover={{
                                                rotate: 360,
                                                scale: 1.2
                                            }}
                                            transition={{ duration: 0.6 }}
                                        >
                                            {feature.icon}
                                        </motion.div>
                                        <h4 className="text-lg font-semibold text-secondary mb-3">
                                            {feature.title}
                                        </h4>
                                        <p className="text-gray-600 text-sm leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Legacy Highlight */}
                        <motion.div
                            className="mt-12 bg-gradient-to-r from-lightBlue/10 to-blue-600/10 rounded-xl p-8 text-center"
                            variants={itemVariants}
                            whileHover={{ scale: 1.02 }}
                        >
                            <motion.h4
                                className="text-2xl font-bold text-secondary mb-4"
                                variants={itemVariants}
                            >
                                "A Legacy of Excellence"
                            </motion.h4>
                            <motion.p
                                className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto"
                                variants={itemVariants}
                            >
                                For decades, the Faculty of Medicine at Al-Azhar University has been at the forefront of medical education and healthcare. We take pride in nurturing generations of doctors who not only heal but also lead, inspire, and innovate.
                            </motion.p>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default MissionVision;
