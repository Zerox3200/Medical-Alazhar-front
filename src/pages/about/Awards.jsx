import React from "react";
import { motion } from "framer-motion";
import { FaAward, FaTrophy, FaCertificate, FaMedal, FaGlobe, FaUniversity, FaShieldAlt } from "react-icons/fa";
import { GoStarFill } from "react-icons/go";

const Awards = () => {
    const awards = [
        {
            icon: <FaAward className="text-4xl text-yellow-500" />,
            title: "International Accreditation",
            description: "Recognized by the World Federation for Medical Education (WFME)",
            year: "2023",
            category: "Global Recognition"
        },
        {
            icon: <FaTrophy className="text-4xl text-yellow-500" />,
            title: "Excellence in Medical Education",
            description: "Awarded by the Arab Medical Education Association",
            year: "2022",
            category: "Regional Excellence"
        },
        {
            icon: <FaCertificate className="text-4xl text-yellow-500" />,
            title: "Quality Assurance Certification",
            description: "ISO 9001:2015 certified for educational quality management",
            year: "2021",
            category: "Quality Standards"
        },
        {
            icon: <FaMedal className="text-4xl text-yellow-500" />,
            title: "Innovation in CME",
            description: "Recognized for innovative digital learning platforms",
            year: "2023",
            category: "Innovation"
        },
        {
            icon: <GoStarFill className="text-4xl text-yellow-500" />,
            title: "Student Satisfaction Award",
            description: "Highest satisfaction rate among medical education institutions",
            year: "2022",
            category: "Student Experience"
        },
        {
            icon: <FaGlobe className="text-4xl text-yellow-500" />,
            title: "Global Partnership Award",
            description: "Outstanding international collaboration in medical education",
            year: "2023",
            category: "Partnerships"
        }
    ];

    const certifications = [
        {
            name: "WFME Recognition",
            description: "World Federation for Medical Education",
            status: "Active",
            validUntil: "2025"
        },
        {
            name: "ISO 9001:2015",
            description: "Quality Management System",
            status: "Certified",
            validUntil: "2024"
        },
        {
            name: "AMEE Accreditation",
            description: "Association for Medical Education in Europe",
            status: "Accredited",
            validUntil: "2026"
        },
        {
            name: "WHO Collaborating Center",
            description: "World Health Organization",
            status: "Designated",
            validUntil: "2025"
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
        <section className="py-20 bg-gradient-to-br from-yellow-50 to-orange-50">
            <div className="container mx-auto px-6">
                <motion.div
                    className="max-w-7xl mx-auto"
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
                            className="inline-flex items-center justify-center w-16 h-16 bg-yellow-500/10 rounded-full mb-6"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ duration: 0.3 }}
                        >
                            <FaTrophy className="text-3xl text-yellow-600" />
                        </motion.div>
                        <motion.h2
                            className="text-4xl md:text-5xl font-bold text-secondary mb-6"
                            variants={itemVariants}
                        >
                            Awards & Recognition
                        </motion.h2>
                        <motion.div
                            className="w-24 h-1 bg-yellow-500 mx-auto mb-8"
                            variants={itemVariants}
                        ></motion.div>
                        <motion.p
                            className="text-lg text-gray-600 max-w-3xl mx-auto"
                            variants={itemVariants}
                        >
                            Celebrating our achievements and the recognition we've earned for excellence in medical education and continuous learning
                        </motion.p>
                    </motion.div>

                    {/* Awards Grid */}
                    <motion.div
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
                        variants={containerVariants}
                    >
                        {awards.map((award, index) => (
                            <motion.div
                                key={index}
                                className="group"
                                variants={cardVariants}
                                whileHover={{
                                    scale: 1.05,
                                    y: -10
                                }}
                                transition={{ duration: 0.3 }}
                            >
                                <motion.div
                                    className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 relative overflow-hidden"
                                    whileHover={{
                                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
                                    }}
                                >
                                    {/* Background Pattern */}
                                    <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-500/5 rounded-full -translate-y-10 translate-x-10"></div>

                                    {/* Icon */}
                                    <motion.div
                                        className="mb-6 flex justify-center"
                                        whileHover={{
                                            rotate: 360,
                                            scale: 1.2
                                        }}
                                        transition={{ duration: 0.6 }}
                                    >
                                        {award.icon}
                                    </motion.div>

                                    {/* Content */}
                                    <div className="text-center">
                                        <h4 className="text-xl font-bold text-secondary mb-3">
                                            {award.title}
                                        </h4>
                                        <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                            {award.description}
                                        </p>

                                        {/* Badges */}
                                        <div className="flex flex-wrap justify-center gap-2 mb-4">
                                            <span className="bg-yellow-500/10 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold">
                                                {award.year}
                                            </span>
                                            <span className="bg-lightBlue/10 text-lightBlue px-3 py-1 rounded-full text-xs font-semibold">
                                                {award.category}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Certifications Section */}
                    <motion.div
                        className="bg-white rounded-2xl p-8 shadow-xl"
                        variants={cardVariants}
                        whileHover={{ scale: 1.02 }}
                    >
                        <motion.div
                            className="text-center mb-12"
                            variants={itemVariants}
                        >
                            <motion.div
                                className="inline-flex items-center justify-center w-16 h-16 bg-lightBlue/10 rounded-full mb-6"
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                transition={{ duration: 0.3 }}
                            >
                                <FaShieldAlt className="text-3xl text-lightBlue" />
                            </motion.div>
                            <motion.h3
                                className="text-3xl font-bold text-secondary mb-4"
                                variants={itemVariants}
                            >
                                Professional Certifications
                            </motion.h3>
                            <motion.div
                                className="w-16 h-1 bg-lightBlue mx-auto mb-6"
                                variants={itemVariants}
                            ></motion.div>
                            <motion.p
                                className="text-lg text-gray-600 max-w-2xl mx-auto"
                                variants={itemVariants}
                            >
                                Our commitment to quality and excellence is validated through international certifications and accreditations
                            </motion.p>
                        </motion.div>

                        {/* Certifications Grid */}
                        <motion.div
                            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
                            variants={containerVariants}
                        >
                            {certifications.map((cert, index) => (
                                <motion.div
                                    key={index}
                                    className="text-center group"
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <motion.div
                                        className="bg-gradient-to-br from-lightBlue/5 to-blue-600/5 rounded-xl p-6 border border-lightBlue/20 hover:border-lightBlue/40 transition-all duration-300"
                                        whileHover={{
                                            boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.1)"
                                        }}
                                    >
                                        <motion.div
                                            className="mb-4 flex justify-center"
                                            whileHover={{ rotate: 360, scale: 1.2 }}
                                            transition={{ duration: 0.6 }}
                                        >
                                            <FaCertificate className="text-3xl text-lightBlue" />
                                        </motion.div>

                                        <h5 className="font-bold text-secondary mb-2">
                                            {cert.name}
                                        </h5>
                                        <p className="text-gray-600 text-sm mb-3">
                                            {cert.description}
                                        </p>

                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center text-xs">
                                                <span className="text-gray-500">Status:</span>
                                                <span className={`font-semibold ${cert.status === 'Active' || cert.status === 'Certified' || cert.status === 'Accredited' || cert.status === 'Designated'
                                                    ? 'text-green-600'
                                                    : 'text-yellow-600'
                                                    }`}>
                                                    {cert.status}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center text-xs">
                                                <span className="text-gray-500">Valid Until:</span>
                                                <span className="font-semibold text-secondary">
                                                    {cert.validUntil}
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Bottom Highlight */}
                    <motion.div
                        className="mt-16 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-2xl p-8 text-center"
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                    >
                        <motion.h3
                            className="text-2xl font-bold text-secondary mb-4"
                            variants={itemVariants}
                        >
                            Commitment to Excellence
                        </motion.h3>
                        <motion.p
                            className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto"
                            variants={itemVariants}
                        >
                            These awards and certifications reflect our unwavering commitment to providing the highest quality medical education and continuous learning opportunities for healthcare professionals worldwide.
                        </motion.p>
                        <motion.div
                            className="mt-6 flex justify-center"
                            variants={itemVariants}
                        >
                            <motion.div
                                className="bg-yellow-500 text-white px-6 py-3 rounded-full font-semibold"
                                whileHover={{ scale: 1.05, y: -2 }}
                                transition={{ duration: 0.3 }}
                            >
                                View All Achievements
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Awards;
