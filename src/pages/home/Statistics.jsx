import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaGraduationCap, FaUsers, FaGlobe, FaAward, FaLaptop, FaHeart, FaStar, FaTrophy } from "react-icons/fa";

const Statistics = () => {
    const [counts, setCounts] = useState({
        students: 0,
        countries: 0,
        programs: 0,
        years: 0,
        faculty: 0,
        research: 0,
        satisfaction: 0,
        awards: 0
    });

    const stats = [
        {
            icon: <FaGraduationCap className="text-4xl text-lightBlue" />,
            number: 15000,
            suffix: "+",
            label: "Medical Students",
            description: "Graduated professionals"
        },
        {
            icon: <FaGlobe className="text-4xl text-lightBlue" />,
            number: 85,
            suffix: "+",
            label: "Countries",
            description: "Global reach"
        },
        {
            icon: <FaLaptop className="text-4xl text-lightBlue" />,
            number: 500,
            suffix: "+",
            label: "Programs",
            description: "Educational courses"
        },
        {
            icon: <FaAward className="text-4xl text-lightBlue" />,
            number: 25,
            suffix: "+",
            label: "Years",
            description: "Of excellence"
        },
        {
            icon: <FaUsers className="text-4xl text-lightBlue" />,
            number: 250,
            suffix: "+",
            label: "Faculty Members",
            description: "Expert educators"
        },
        {
            icon: <FaHeart className="text-4xl text-lightBlue" />,
            number: 1000,
            suffix: "+",
            label: "Research Papers",
            description: "Published works"
        },
        {
            icon: <FaStar className="text-4xl text-lightBlue" />,
            number: 98,
            suffix: "%",
            label: "Satisfaction Rate",
            description: "Student satisfaction"
        },
        {
            icon: <FaTrophy className="text-4xl text-lightBlue" />,
            number: 50,
            suffix: "+",
            label: "Awards",
            description: "Recognition earned"
        }
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Animate counters when section comes into view
                        stats.forEach((stat, index) => {
                            setTimeout(() => {
                                animateCounter(stat.number, index);
                            }, index * 150);
                        });
                    }
                });
            },
            { threshold: 0.5 }
        );

        const element = document.getElementById('home-statistics-section');
        if (element) {
            observer.observe(element);
        }

        return () => observer.disconnect();
    }, []);

    const animateCounter = (target, index) => {
        const duration = 2000;
        const steps = 60;
        const increment = target / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }

            setCounts(prev => ({
                ...prev,
                [Object.keys(prev)[index]]: Math.floor(current)
            }));
        }, duration / steps);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
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
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <section id="home-statistics-section" className="py-20 bg-gradient-to-br from-lightBlue/5 to-blue-600/5">
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
                            className="inline-flex items-center justify-center w-16 h-16 bg-lightBlue/10 rounded-full mb-6"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ duration: 0.3 }}
                        >
                            <FaAward className="text-3xl text-lightBlue" />
                        </motion.div>
                        <motion.h2
                            className="text-4xl md:text-5xl font-bold text-secondary mb-6"
                            variants={itemVariants}
                        >
                            Our Global Impact
                        </motion.h2>
                        <motion.div
                            className="w-24 h-1 bg-lightBlue mx-auto mb-8"
                            variants={itemVariants}
                        ></motion.div>
                        <motion.p
                            className="text-lg text-gray-600 max-w-3xl mx-auto"
                            variants={itemVariants}
                        >
                            Discover the scale of our commitment to medical education excellence and global healthcare advancement
                        </motion.p>
                    </motion.div>

                    {/* Statistics Grid */}
                    <motion.div
                        className="grid grid-cols-2 md:grid-cols-4 gap-8"
                        variants={containerVariants}
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                className="text-center group"
                                variants={itemVariants}
                                whileHover={{
                                    scale: 1.05,
                                    y: -10
                                }}
                                transition={{ duration: 0.3 }}
                            >
                                <motion.div
                                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                                    whileHover={{
                                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
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
                                        {stat.icon}
                                    </motion.div>

                                    <motion.div
                                        className="text-3xl md:text-4xl font-bold text-lightBlue mb-2"
                                        key={counts[Object.keys(counts)[index]]}
                                    >
                                        {counts[Object.keys(counts)[index]]?.toLocaleString()}{stat.suffix}
                                    </motion.div>

                                    <h4 className="text-sm font-semibold text-secondary mb-1">
                                        {stat.label}
                                    </h4>
                                    <p className="text-xs text-gray-500">
                                        {stat.description}
                                    </p>
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Bottom Highlight */}
                    <motion.div
                        className="mt-16 bg-gradient-to-r from-lightBlue/10 to-blue-600/10 rounded-2xl p-8 text-center"
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                    >
                        <motion.h3
                            className="text-2xl font-bold text-secondary mb-4"
                            variants={itemVariants}
                        >
                            A Legacy of Excellence
                        </motion.h3>
                        <motion.p
                            className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto"
                            variants={itemVariants}
                        >
                            These numbers represent more than just statistics—they represent lives touched, careers transformed, and communities improved through our commitment to medical education excellence.
                        </motion.p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Statistics;
