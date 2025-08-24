import React from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaPhone, FaEnvelope, FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaGraduationCap, FaStar } from "react-icons/fa";

const CallToAction = () => {
    const features = [
        {
            icon: <FaGraduationCap className="text-3xl text-lightBlue" />,
            title: "Expert Faculty",
            description: "Learn from world-renowned medical professionals"
        },
        {
            icon: <FaUsers className="text-3xl text-lightBlue" />,
            title: "Global Network",
            description: "Connect with healthcare professionals worldwide"
        },
        {
            icon: <FaCalendarAlt className="text-3xl text-lightBlue" />,
            title: "Flexible Learning",
            description: "Study at your own pace with online and in-person options"
        }
    ];

    const contactInfo = [
        {
            icon: <FaPhone className="text-xl text-lightBlue" />,
            title: "Call Us",
            detail: "+20 2 2268 1234",
            action: "tel:+20222681234"
        },
        {
            icon: <FaEnvelope className="text-xl text-lightBlue" />,
            title: "Email Us",
            detail: "cme@azhar.edu.eg",
            action: "mailto:cme@azhar.edu.eg"
        },
        {
            icon: <FaMapMarkerAlt className="text-xl text-lightBlue" />,
            title: "Visit Us",
            detail: "Al-Azhar University, Cairo, Egypt",
            action: "#"
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
        <section className="py-20 bg-gradient-to-br from-lightBlue to-blue-600 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-32 -translate-y-32"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-48 translate-y-48"></div>
                <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
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
                            className="text-4xl md:text-5xl font-bold text-white mb-6"
                            variants={itemVariants}
                        >
                            Ready to Transform Your Medical Career?
                        </motion.h2>
                        <motion.div
                            className="w-24 h-1 bg-white mx-auto mb-8"
                            variants={itemVariants}
                        ></motion.div>
                        <motion.p
                            className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed"
                            variants={itemVariants}
                        >
                            Join thousands of healthcare professionals who have advanced their careers through our world-class continuous medical education programs
                        </motion.p>
                    </motion.div>

                    {/* Features Grid */}
                    <motion.div
                        className="grid md:grid-cols-3 gap-8 mb-16"
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
                                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300"
                                    whileHover={{
                                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                                    }}
                                >
                                    <motion.div
                                        className="mb-6 flex justify-center"
                                        whileHover={{
                                            rotate: 360,
                                            scale: 1.2
                                        }}
                                        transition={{ duration: 0.6 }}
                                    >
                                        {feature.icon}
                                    </motion.div>
                                    <h4 className="text-xl font-bold text-white mb-3">
                                        {feature.title}
                                    </h4>
                                    <p className="text-blue-100 text-sm leading-relaxed">
                                        {feature.description}
                                    </p>
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Main CTA Section */}
                    <motion.div
                        className="bg-white rounded-2xl p-8 md:p-12 shadow-2xl"
                        variants={cardVariants}
                        whileHover={{ scale: 1.02 }}
                    >
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            {/* Left Side - Content */}
                            <motion.div
                                className="space-y-6"
                                variants={itemVariants}
                            >
                                <h3 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
                                    Start Your Journey Today
                                </h3>
                                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                                    Take the first step towards advancing your medical career. Our comprehensive CME programs are designed to meet the evolving needs of healthcare professionals at every stage of their career.
                                </p>

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <motion.button
                                        className="bg-lightBlue text-white px-8 py-4 rounded-full font-semibold flex items-center justify-center space-x-2 hover:bg-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <span>Explore Programs</span>
                                        <FaArrowRight className="text-sm" />
                                    </motion.button>

                                    <motion.button
                                        className="border-2 border-lightBlue text-lightBlue px-8 py-4 rounded-full font-semibold hover:bg-lightBlue hover:text-white transition-all duration-300"
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        Download Brochure
                                    </motion.button>
                                </div>

                                {/* Trust Indicators */}
                                <div className="flex items-center space-x-4 pt-6">
                                    <div className="flex space-x-1">
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar key={i} className="text-yellow-400 text-sm" />
                                        ))}
                                    </div>
                                    <span className="text-gray-600 text-sm">4.9/5 from 2,500+ reviews</span>
                                </div>
                            </motion.div>

                            {/* Right Side - Contact Info */}
                            <motion.div
                                className="space-y-6"
                                variants={itemVariants}
                            >
                                <h4 className="text-2xl font-bold text-secondary mb-6">
                                    Get in Touch
                                </h4>

                                {contactInfo.map((contact, index) => (
                                    <motion.a
                                        key={index}
                                        href={contact.action}
                                        className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300 group"
                                        whileHover={{ x: 5 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <motion.div
                                            className="bg-lightBlue/10 p-3 rounded-full group-hover:bg-lightBlue group-hover:text-white transition-all duration-300"
                                            whileHover={{ scale: 1.1 }}
                                        >
                                            {contact.icon}
                                        </motion.div>
                                        <div>
                                            <h5 className="font-semibold text-secondary">
                                                {contact.title}
                                            </h5>
                                            <p className="text-gray-600 text-sm">
                                                {contact.detail}
                                            </p>
                                        </div>
                                    </motion.a>
                                ))}

                                {/* Quick Stats */}
                                <div className="bg-lightBlue/5 rounded-xl p-6 mt-8">
                                    <h5 className="font-semibold text-secondary mb-4">Why Choose Us?</h5>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-lightBlue">25+</div>
                                            <div className="text-xs text-gray-600">Years Experience</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-lightBlue">15K+</div>
                                            <div className="text-xs text-gray-600">Graduates</div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Bottom CTA */}
                    <motion.div
                        className="mt-12 text-center"
                        variants={itemVariants}
                    >
                        <motion.p
                            className="text-blue-100 text-lg mb-6"
                            variants={itemVariants}
                        >
                            Don't miss out on the opportunity to advance your medical career
                        </motion.p>
                        <motion.button
                            className="bg-yellow-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-yellow-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Apply Now - Limited Seats Available
                        </motion.button>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default CallToAction;
