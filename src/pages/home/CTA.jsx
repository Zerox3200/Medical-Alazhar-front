import React, { useEffect, useRef, useState } from "react";
import { FaUserMd, FaGraduationCap, FaRocket, FaCheckCircle, FaArrowRight } from "react-icons/fa";
import { FaHandHoldingMedical } from "react-icons/fa6";

const CTA = () => {
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

  const benefits = [
    "Access to 200+ Medical Specialties",
    "Expert Mentorship & Guidance",
    "Real-time Progress Tracking",
    "Accredited Certifications",
    "24/7 Learning Platform",
    "Evidence-based Curriculum"
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-white rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Section */}
          <div className={`space-y-8 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="space-y-6">
              <div className={`inline-flex items-center gap-3 px-4 py-2 bg-blue-700/30 rounded-full text-blue-200 text-sm font-medium transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <FaRocket className="text-lg" />
                Transform Your Medical Career
              </div>

              <h2 className={`text-4xl lg:text-5xl font-bold text-white leading-tight transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                Ready to Advance Your
                <span className="text-blue-300 block">Medical Expertise?</span>
              </h2>

              <p className={`text-xl text-blue-100 leading-relaxed transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                Join thousands of medical professionals who have elevated their skills,
                advanced their careers, and improved patient outcomes through our comprehensive
                educational platform.
              </p>
            </div>

            {/* Benefits Grid */}
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {benefits.map((benefit, index) => (
                <div key={index} className={`flex items-center gap-3 transition-all duration-700 delay-${1000 + (index * 100)} ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
                  <FaCheckCircle className="text-green-400 text-lg flex-shrink-0" />
                  <span className="text-blue-100 font-medium">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-1200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <button className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-3">
                <FaUserMd className="text-lg" />
                Start Your Medical Journey
                <FaArrowRight className="text-lg group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              <button className="px-8 py-4 border-2 border-blue-400 text-blue-300 font-semibold rounded-lg hover:bg-blue-400 hover:text-blue-900 transition-all duration-300 flex items-center justify-center gap-3">
                <FaGraduationCap className="text-lg" />
                Explore Courses
              </button>
            </div>

            {/* Trust Indicators */}
            <div className={`flex items-center gap-6 pt-4 transition-all duration-1000 delay-1400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <FaCheckCircle className="text-white text-sm" />
                </div>
                <span className="text-blue-200 text-sm font-medium">Accredited Programs</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <FaUserMd className="text-white text-sm" />
                </div>
                <span className="text-blue-200 text-sm font-medium">Expert Instructors</span>
              </div>
            </div>
          </div>

          {/* Visual Section */}
          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-10 scale-95'}`}>
            <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-3xl p-8 backdrop-blur-sm border border-blue-400/30">
              <div className="text-center space-y-6">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                  <FaHandHoldingMedical className="text-white text-4xl" />
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-white">Join Our Medical Community</h3>
                  <p className="text-blue-200 leading-relaxed">
                    Connect with fellow medical professionals, share experiences,
                    and grow together in your medical career journey.
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">500+</div>
                    <div className="text-blue-200 text-sm">Active Doctors</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">98%</div>
                    <div className="text-blue-200 text-sm">Success Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">24/7</div>
                    <div className="text-blue-200 text-sm">Support</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-green-400/30">
              <FaCheckCircle className="text-green-400 text-xl" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-blue-400/30">
              <FaUserMd className="text-blue-400 text-lg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
