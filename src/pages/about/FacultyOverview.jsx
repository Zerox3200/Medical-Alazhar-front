import React from "react";
import { motion } from "framer-motion";
import { FaGraduationCap, FaMicroscope, FaHeart, FaGlobe } from "react-icons/fa";
import aboutImage from '../../assets/images/Profile-1529.jpg';

const FacultyOverview = () => {
    const features = [
        {
            icon: <FaGraduationCap className="text-4xl text-lightBlue" />,
            title: "Academic Excellence",
            description: "World-class professors and comprehensive medical education programs"
        },
        {
            icon: <FaMicroscope className="text-4xl text-lightBlue" />,
            title: "Research & Innovation",
            description: "Advanced clinical training and state-of-the-art facilities"
        },
        {
            icon: <FaHeart className="text-4xl text-lightBlue" />,
            title: "Compassionate Care",
            description: "Fostering physicians with knowledge, compassion, and professionalism"
        },
        {
            icon: <FaGlobe className="text-4xl text-lightBlue" />,
            title: "Global Impact",
            description: "Contributing to medical research and community service worldwide"
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
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    return (
        <section className="py-20 bg-white">
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
                            className="text-4xl md:text-5xl font-bold text-secondary mb-6"
                            variants={itemVariants}
                        >
                            Faculty of Medicine
                        </motion.h2>
                        <motion.div
                            className="w-24 h-1 bg-lightBlue mx-auto mb-8"
                            variants={itemVariants}
                        ></motion.div>
                        <motion.h3
                            className="text-2xl md:text-3xl font-semibold text-gray-700 mb-4"
                            variants={itemVariants}
                        >
                            Al-Azhar University
                        </motion.h3>
                        <motion.p
                            className="text-lg text-gray-600 max-w-2xl mx-auto"
                            variants={itemVariants}
                        >
                            A Legacy of Excellence in Medical Education
                        </motion.p>
                    </motion.div>

                    {/* Main Description */}
                    <motion.div
                        className="grid lg:grid-cols-2 gap-12 items-center mb-20"
                        variants={containerVariants}
                    >
                        <motion.div
                            className="space-y-6"
                            variants={itemVariants}
                        >
                            <motion.div
                                className="text-lg leading-relaxed text-gray-700 space-y-4"
                                variants={containerVariants}
                            >
                                <motion.p variants={itemVariants}>
                                    The Faculty of Medicine at Al-Azhar University stands as one of the most prestigious medical institutions in the Middle East, rooted in a legacy of academic excellence and scientific discovery. Established with a vision to integrate modern medical education with the values of integrity, service, and innovation, the faculty has become a leading center for teaching, research, and healthcare.
                                </motion.p>
                                <motion.p variants={itemVariants}>
                                    With world-class professors, advanced clinical training, and state-of-the-art facilities, the Faculty of Medicine prepares future doctors to meet global healthcare challenges with knowledge, compassion, and professionalism. Beyond education, the faculty contributes significantly to medical research and community service, fostering a generation of physicians dedicated to improving human health locally and internationally.
                                </motion.p>
                            </motion.div>

                            {/* Key Highlights */}
                            <motion.div
                                className="bg-lightBlue/10 p-6 rounded-lg border-l-4 border-lightBlue"
                                variants={itemVariants}
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                            >
                                <h4 className="font-semibold text-secondary mb-3">Our Commitment</h4>
                                <ul className="space-y-2 text-gray-700">
                                    <motion.li
                                        className="flex items-center space-x-2"
                                        variants={itemVariants}
                                    >
                                        <div className="w-2 h-2 bg-lightBlue rounded-full"></div>
                                        <span>Integrating modern medical education with traditional values</span>
                                    </motion.li>
                                    <motion.li
                                        className="flex items-center space-x-2"
                                        variants={itemVariants}
                                    >
                                        <div className="w-2 h-2 bg-lightBlue rounded-full"></div>
                                        <span>Preparing doctors for global healthcare challenges</span>
                                    </motion.li>
                                    <motion.li
                                        className="flex items-center space-x-2"
                                        variants={itemVariants}
                                    >
                                        <div className="w-2 h-2 bg-lightBlue rounded-full"></div>
                                        <span>Advancing medical research and community service</span>
                                    </motion.li>
                                </ul>
                            </motion.div>
                        </motion.div>

                        {/* Visual Element */}
                        <motion.div
                            className="relative"
                            variants={itemVariants}
                        >
                            <motion.div
                                className="relative rounded-2xl overflow-hidden shadow-2xl"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            >
                                <img
                                    src={aboutImage}
                                    alt="Medical Professional"
                                    className="w-full h-96 object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                                <div className="absolute bottom-6 left-6 right-6 text-white">
                                    <h4 className="text-xl font-semibold mb-2">Excellence in Medical Education</h4>
                                    <p className="text-gray-200">Since Establishment</p>
                                </div>
                            </motion.div>

                            {/* Decorative Elements */}
                            <motion.div
                                className="absolute -top-4 -right-4 w-20 h-20 bg-lightBlue/10 rounded-full"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.5, 1, 0.5]
                                }}
                                transition={{ duration: 3, repeat: Infinity }}
                            ></motion.div>
                            <motion.div
                                className="absolute -bottom-4 -left-4 w-16 h-16 bg-blue-600/10 rounded-full"
                                animate={{
                                    scale: [1, 1.3, 1],
                                    opacity: [0.3, 0.8, 0.3]
                                }}
                                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                            ></motion.div>
                        </motion.div>
                    </motion.div>

                    {/* Features Grid */}
                    <motion.div
                        className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
                        variants={containerVariants}
                    >
                        {features.map((feature, index) => (
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
                                    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2 border border-gray-100"
                                    whileHover={{
                                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                                    }}
                                >
                                    <motion.div
                                        className="mb-4 flex justify-center"
                                        whileHover={{ rotate: 360 }}
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
                </motion.div>
            </div>
        </section>
    );
};

export default FacultyOverview;
