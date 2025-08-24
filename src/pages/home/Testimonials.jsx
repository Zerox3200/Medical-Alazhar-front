import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight, FaUserMd, FaGraduationCap, FaHeartbeat, FaStethoscope, FaBrain, FaMicroscope } from "react-icons/fa";

const Testimonials = () => {

    const medicalStatsData = [
        { number: "95%", label: "Improved Clinical Skills", icon: <FaUserMd className="text-3xl text-blue-600" />, description: "Doctors report significant skill enhancement" },
        { number: "40%", label: "Better Patient Outcomes", icon: <FaHeartbeat className="text-3xl text-red-600" />, description: "Enhanced treatment effectiveness" },
        { number: "200+", label: "Medical Specialties", icon: <FaStethoscope className="text-3xl text-green-600" />, description: "Comprehensive medical coverage" },
        { number: "24/7", label: "Continuous Learning", icon: <FaGraduationCap className="text-3xl text-purple-600" />, description: "Always accessible education" }
    ];

    const medicalImportanceData = [
        {
            title: "Advancing Medical Knowledge",
            description: "Stay current with the latest medical research, treatment protocols, and clinical guidelines that directly impact patient care quality.",
            icon: <FaMicroscope className="text-4xl text-blue-600" />
        },
        {
            title: "Enhancing Clinical Skills",
            description: "Develop advanced diagnostic abilities, surgical techniques, and patient management skills through hands-on training and expert guidance.",
            icon: <FaStethoscope className="text-4xl text-green-600" />
        },
        {
            title: "Improving Patient Safety",
            description: "Reduce medical errors and enhance patient safety through comprehensive training in evidence-based medicine and best practices.",
            icon: <FaHeartbeat className="text-4xl text-red-600" />
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

    return (
        <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50">
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
                            <FaQuoteLeft className="text-3xl text-lightBlue" />
                        </motion.div>
                        <motion.h2
                            className="text-4xl md:text-5xl font-bold text-secondary mb-6"
                            variants={itemVariants}
                        >
                            Advancing Medical Excellence
                            <span className="text-lightBlue block">Through Continuous Learning</span>
                        </motion.h2>
                        <motion.div
                            className="w-24 h-1 bg-lightBlue mx-auto mb-8"
                            variants={itemVariants}
                        ></motion.div>
                        <motion.p
                            className="text-lg text-gray-600 max-w-3xl mx-auto"
                            variants={itemVariants}
                        >
                            In the rapidly evolving field of medicine, continuous education is not just important—it's essential.
                            Our platform empowers doctors to enhance their clinical skills, stay updated with medical advancements,
                            and ultimately provide better patient care through evidence-based practice.
                        </motion.p>
                    </motion.div>

                    {/* Medical Importance Section */}
                    <motion.div
                        className="grid lg:grid-cols-3 gap-8 mb-16"
                        variants={containerVariants}
                    >
                        {medicalImportanceData.map((item, index) => (
                            <motion.div
                                key={index}
                                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                                variants={cardVariants}
                                whileHover={{ scale: 1.02, y: -5 }}
                            >
                                <motion.div
                                    className="mb-6 flex justify-center"
                                    whileHover={{ rotate: 360, scale: 1.2 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    {item.icon}
                                </motion.div>
                                <h3 className="text-2xl font-bold text-secondary mb-4 text-center">{item.title}</h3>
                                <p className="text-gray-600 leading-relaxed text-center">{item.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>


                    {/* Medical Stats Section */}
                    <motion.div
                        className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
                        variants={containerVariants}
                    >
                        {medicalStatsData.map((stat, index) => (
                            <motion.div
                                key={index}
                                className="text-center group"
                                variants={itemVariants}
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            >
                                <motion.div
                                    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                                    whileHover={{
                                        boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.15)"
                                    }}
                                >
                                    <motion.div
                                        className="mb-4 flex justify-center"
                                        whileHover={{ rotate: 360, scale: 1.2 }}
                                        transition={{ duration: 0.6 }}
                                    >
                                        {stat.icon}
                                    </motion.div>
                                    <div className="text-3xl lg:text-4xl font-bold text-secondary mb-2">{stat.number}</div>
                                    <div className="text-gray-600 font-medium mb-1">{stat.label}</div>
                                    <div className="text-sm text-gray-500">{stat.description}</div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Medical Education Quote */}
                    <motion.div
                        className="text-center"
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                    >
                        <div className="bg-gradient-to-r from-lightBlue to-blue-600 rounded-2xl p-8 text-white max-w-5xl mx-auto">
                            <FaQuoteLeft className="text-4xl mx-auto mb-4 opacity-80" />
                            <p className="text-xl lg:text-2xl font-medium mb-4 leading-relaxed">
                                "The quality of medical care directly correlates with the continuous education of healthcare professionals.
                                Our commitment to advancing medical knowledge ensures better patient outcomes and safer healthcare delivery."
                            </p>
                            <div className="text-lg opacity-90">- Medical Education & Research Institute</div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Testimonials;
