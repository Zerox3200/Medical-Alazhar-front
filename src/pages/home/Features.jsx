import React, { useEffect, useRef, useState } from "react";
import {
  FaCalendarAlt,
  FaBookMedical,
  FaChalkboardTeacher,
  FaGraduationCap,
  FaUsers,
  FaChartLine,
} from "react-icons/fa";

const featuresData = [
  {
    title: "Certification Courses",
    icon: <FaGraduationCap className="text-5xl text-blue-600" />,
    description:
      "Accredited programs to expand your clinical expertise and meet licensing requirements.",
    detailedDescription: "Comprehensive certification programs designed by medical experts, covering essential clinical skills, advanced procedures, and specialized medical knowledge. Earn recognized credentials that enhance your professional profile and career advancement opportunities.",
    stats: "50+ Courses",
    color: "blue"
  },
  {
    title: "Workshops & Seminars",
    icon: <FaBookMedical className="text-5xl text-green-600" />,
    description:
      "Interactive sessions on the latest medical advancements and best practices.",
    detailedDescription: "Engage in hands-on workshops and cutting-edge seminars led by industry leaders. Learn about breakthrough medical technologies, innovative treatment approaches, and evidence-based practices that are shaping the future of healthcare.",
    stats: "100+ Sessions",
    color: "green"
  },
  {
    title: "Faculty Development",
    icon: <FaChalkboardTeacher className="text-5xl text-purple-600" />,
    description: "Programs to enhance teaching skills for medical educators.",
    detailedDescription: "Specialized training programs for medical educators to develop advanced teaching methodologies, curriculum design skills, and assessment techniques. Transform your teaching approach and inspire the next generation of medical professionals.",
    stats: "200+ Educators",
    color: "purple"
  },
  {
    title: "Progress Tracking",
    icon: <FaChartLine className="text-5xl text-orange-600" />,
    description: "Advanced analytics and performance monitoring for continuous improvement.",
    detailedDescription: "Comprehensive progress tracking system with detailed analytics, performance insights, and personalized learning recommendations. Monitor your development, identify areas for improvement, and optimize your learning journey with data-driven insights.",
    stats: "Real-time Analytics",
    color: "orange"
  },
  {
    title: "Expert Mentorship",
    icon: <FaUsers className="text-5xl text-indigo-600" />,
    description: "One-on-one guidance from experienced medical professionals.",
    detailedDescription: "Connect with seasoned medical professionals who provide personalized mentorship, career guidance, and professional development support. Benefit from their expertise, industry insights, and practical advice to accelerate your medical career growth.",
    stats: "Expert Network",
    color: "indigo"
  },
  {
    title: "Interactive Learning",
    icon: <FaCalendarAlt className="text-5xl text-red-600" />,
    description: "Engaging learning experiences with simulations and case studies.",
    detailedDescription: "Immerse yourself in interactive learning experiences featuring advanced medical simulations, real-world case studies, and collaborative problem-solving scenarios. Develop critical thinking skills and practical expertise through hands-on learning.",
    stats: "500+ Cases",
    color: "red"
  },
];

const Features = () => {
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
    <section ref={sectionRef} className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className={`text-center mb-16 transition-all duration-1000 ease-out ${isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-10'
          }`}>
          <h2 className={`text-4xl lg:text-5xl font-bold text-gray-900 mb-6 transition-all duration-1000 delay-200 ${isVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-8'
            }`}>
            Comprehensive Learning
            <span className="text-blue-600 block">Solutions</span>
          </h2>
          <p className={`text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-400 ${isVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-8'
            }`}>
            Discover our diverse range of educational offerings designed to elevate your medical expertise
            and advance your professional development through cutting-edge learning experiences.
          </p>
        </div>

        {/* Features Grid */}
        <div className={`grid lg:grid-cols-2 xl:grid-cols-3 gap-8 transition-all duration-1000 delay-600 ${isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-10'
          }`}>
          {featuresData.map((feature, index) => (
            <FeatureCard
              key={index}
              {...feature}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className={`mt-16 text-center transition-all duration-1000 delay-1200 ${isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-10'
          }`}>
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Medical Career?</h3>
            <p className="text-lg mb-6 opacity-90">
              Join thousands of medical professionals who have already elevated their skills with our platform.
            </p>
            <button className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg">
              Get Started Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon, title, description, detailedDescription, stats, color, index, isVisible }) => {
  const colorClasses = {
    blue: "border-blue-200 bg-blue-50 hover:bg-blue-100",
    green: "border-green-200 bg-green-50 hover:bg-green-100",
    purple: "border-purple-200 bg-purple-50 hover:bg-purple-100",
    orange: "border-orange-200 bg-orange-50 hover:bg-orange-100",
    indigo: "border-indigo-200 bg-indigo-50 hover:bg-indigo-100",
    red: "border-red-200 bg-red-50 hover:bg-red-100"
  };

  const cardDelay = 800 + (index * 200); // Staggered animation delay

  return (
    <div className={`group relative overflow-hidden rounded-2xl border-2 ${colorClasses[color]} transition-all duration-700 ease-out ${cardDelay}ms ${isVisible
      ? 'opacity-100 translate-y-0 scale-100'
      : 'opacity-0 translate-y-10 scale-95'
      } hover:shadow-xl hover:-translate-y-2`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-current"></div>
        <div className="absolute bottom-4 left-4 w-16 h-16 rounded-full bg-current"></div>
      </div>

      <div className="relative p-8">
        {/* Icon and Stats */}
        <div className="flex items-center justify-between mb-6">
          <div className={`p-4 rounded-xl bg-white shadow-lg transition-all duration-700 delay-${cardDelay + 200}ms ${isVisible
            ? 'scale-100 rotate-0'
            : 'scale-75 rotate-12'
            } group-hover:scale-110`}>
            {icon}
          </div>
          <div className={`text-right transition-all duration-700 delay-${cardDelay + 400}ms ${isVisible
            ? 'opacity-100 translate-x-0'
            : 'opacity-0 translate-x-8'
            }`}>
            <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide">{stats}</div>
          </div>
        </div>

        {/* Content */}
        <div className={`space-y-4 transition-all duration-700 delay-${cardDelay + 600}ms ${isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-8'
          }`}>
          <h3 className="text-2xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors">
            {title}
          </h3>
          <p className="text-gray-600 leading-relaxed">
            {description}
          </p>
          <p className="text-sm text-gray-500 leading-relaxed">
            {detailedDescription}
          </p>
        </div>

        {/* Hover Effect Line */}
        <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-700 delay-${cardDelay + 800}ms ${isVisible
          ? 'w-full'
          : 'w-0'
          } group-hover:w-full`}></div>
      </div>
    </div>
  );
};

export default Features;
