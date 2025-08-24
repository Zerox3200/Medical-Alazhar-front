import React, { useEffect, useRef, useState } from 'react'
import BreifImage from '../../assets/images/doctor-with-holographic-anatomy-display-futuristic-setting.jpg'

export default function Breif() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    return (
        <section ref={sectionRef} className="py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Content Section */}
                    <div className={`space-y-8 transition-all duration-1000 ease-out ${isVisible
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-10'
                        }`}>
                        <div className="space-y-4">
                            <h2 className={`text-4xl lg:text-5xl font-bold text-gray-900 leading-tight transition-all duration-1000 delay-200 ${isVisible
                                ? 'opacity-100 translate-y-0'
                                : 'opacity-0 translate-y-8'
                                }`}>
                                Empowering the Next Generation of
                                <span className="text-blue-600 block">Medical Professionals</span>
                            </h2>
                            <p className={`text-xl text-gray-600 leading-relaxed transition-all duration-1000 delay-400 ${isVisible
                                ? 'opacity-100 translate-y-0'
                                : 'opacity-0 translate-y-8'
                                }`}>
                                Welcome to the premier educational platform designed exclusively for medical interns.
                                We bridge the gap between theoretical knowledge and practical excellence through
                                cutting-edge courses and hands-on training experiences.
                            </p>
                            <p className={`text-lg text-gray-600 leading-relaxed transition-all duration-1000 delay-600 ${isVisible
                                ? 'opacity-100 translate-y-0'
                                : 'opacity-0 translate-y-8'
                                }`}>
                                Our experienced supervisors work closely with interns, providing personalized guidance,
                                monitoring progress, and ensuring each intern develops the essential skills needed for
                                their medical career. Through regular assessments, feedback sessions, and mentorship,
                                supervisors help shape the next generation of healthcare professionals.
                            </p>
                        </div>

                        <div className={`grid md:grid-cols-2 gap-6 transition-all duration-1000 delay-800 ${isVisible
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-8'
                            }`}>
                            <div className={`flex items-start space-x-4 transition-all duration-700 delay-1000 ${isVisible
                                ? 'opacity-100 translate-x-0'
                                : 'opacity-0 -translate-x-8'
                                }`}>
                                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Comprehensive Curriculum</h3>
                                    <p className="text-gray-600">Expert-designed courses covering all essential medical disciplines with real-world applications.</p>
                                </div>
                            </div>

                            <div className={`flex items-start space-x-4 transition-all duration-700 delay-1200 ${isVisible
                                ? 'opacity-100 translate-x-0'
                                : 'opacity-0 translate-x-8'
                                }`}>
                                <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Interactive Learning</h3>
                                    <p className="text-gray-600">Engage with advanced simulations, case studies, and peer collaboration opportunities.</p>
                                </div>
                            </div>

                            <div className={`flex items-start space-x-4 transition-all duration-700 delay-1400 ${isVisible
                                ? 'opacity-100 translate-x-0'
                                : 'opacity-0 -translate-x-8'
                                }`}>
                                <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Expert Mentorship</h3>
                                    <p className="text-gray-600">Learn from experienced medical professionals and receive personalized guidance throughout your journey.</p>
                                </div>
                            </div>

                            <div className={`flex items-start space-x-4 transition-all duration-700 delay-1600 ${isVisible
                                ? 'opacity-100 translate-x-0'
                                : 'opacity-0 translate-x-8'
                                }`}>
                                <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Progress Tracking</h3>
                                    <p className="text-gray-600">Monitor your development with detailed analytics and performance insights to optimize your learning path.</p>
                                </div>
                            </div>
                        </div>

                        <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-1800 ${isVisible
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-8'
                            }`}>
                            <button className="px-8 py-4 bg-secondary-600 text-white font-semibold rounded-lg
                             hover:bg-secondary-700 transition-colors duration-300 shadow-lg cursor-pointer">
                                Explore Courses
                            </button>
                            <button className="px-8 py-4 border-2 border-secondary-600 text-secondary-600 font-semibold rounded-lg
                             hover:bg-secondary-600 hover:text-white transition-all duration-300 cursor-pointer">
                                Learn More
                            </button>
                        </div>
                    </div>

                    {/* Image Section */}
                    <div className={`relative transition-all duration-1000 delay-300 ${isVisible
                        ? 'opacity-100 translate-x-0 scale-100'
                        : 'opacity-0 translate-x-10 scale-95'
                        }`}>
                        <div className="relative z-10">
                            <img
                                src={BreifImage}
                                alt="Medical intern with holographic anatomy display"
                                className="w-full h-[700px] object-cover rounded-2xl shadow-2xl"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
