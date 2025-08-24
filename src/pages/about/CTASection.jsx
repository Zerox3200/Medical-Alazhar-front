import React from "react";
import { Link } from "react-router";
import { FaArrowRight, FaGraduationCap, FaUserMd, FaGlobe, FaHandshake } from "react-icons/fa";

const CTASection = () => {
    const actionCards = [
        {
            icon: <FaGraduationCap className="text-3xl text-white" />,
            title: "Join Our Programs",
            description: "Enroll in our comprehensive continuing medical education programs",
            action: "Explore Courses",
            link: "/courses"
        },
        {
            icon: <FaUserMd className="text-3xl text-white" />,
            title: "Become a Member",
            description: "Join our community of healthcare professionals",
            action: "Register Now",
            link: "/auth/signup"
        },
        {
            icon: <FaGlobe className="text-3xl text-white" />,
            title: "Global Network",
            description: "Connect with medical professionals worldwide",
            action: "Learn More",
            link: "/about"
        }
    ];

    return (
        <section className="py-20 bg-gradient-to-br from-lightBlue via-blue-600 to-indigo-700 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
                <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
                            <FaHandshake className="text-3xl text-white" />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Ready to Advance Your Medical Career?
                        </h2>
                        <div className="w-24 h-1 bg-white mx-auto mb-6"></div>
                        <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                            Join thousands of healthcare professionals who have transformed their careers through our comprehensive continuing medical education programs. Take the next step towards excellence in healthcare.
                        </p>
                    </div>

                    {/* Action Cards */}
                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        {actionCards.map((card, index) => (
                            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300 group">
                                <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                    {card.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-4">
                                    {card.title}
                                </h3>
                                <p className="text-white/80 mb-6 leading-relaxed">
                                    {card.description}
                                </p>
                                <Link
                                    to={card.link}
                                    className="inline-flex items-center bg-white text-lightBlue px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 group-hover:translate-x-1"
                                >
                                    {card.action}
                                    <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* Main CTA */}
                    <div className="bg-white rounded-2xl p-12 text-center shadow-2xl">
                        <h3 className="text-3xl font-bold text-secondary mb-4">
                            Start Your Journey Today
                        </h3>
                        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                            Whether you're a practicing physician, medical student, or healthcare professional, our programs are designed to meet your needs and advance your career.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link
                                to="/auth/signup"
                                className="bg-lightBlue text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-600 transition-all duration-300 flex items-center group"
                            >
                                Get Started Now
                                <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                            </Link>
                            <Link
                                to="/contact"
                                className="border-2 border-lightBlue text-lightBlue px-8 py-4 rounded-full font-semibold hover:bg-lightBlue hover:text-white transition-all duration-300"
                            >
                                Contact Us
                            </Link>
                        </div>

                        {/* Trust Indicators */}
                        <div className="mt-8 pt-8 border-t border-gray-200">
                            <p className="text-gray-500 text-sm mb-4">Trusted by healthcare professionals worldwide</p>
                            <div className="flex justify-center items-center space-x-8 text-gray-400">
                                <div className="flex items-center">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                    <span className="text-sm">25+ Years Experience</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                    <span className="text-sm">10,000+ Professionals</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                    <span className="text-sm">International Accreditation</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Stats */}
                    <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-white mb-2">500+</div>
                            <div className="text-white/80 text-sm">Programs Available</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-white mb-2">50+</div>
                            <div className="text-white/80 text-sm">Countries Served</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-white mb-2">98%</div>
                            <div className="text-white/80 text-sm">Satisfaction Rate</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-white mb-2">24/7</div>
                            <div className="text-white/80 text-sm">Support Available</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTASection;
