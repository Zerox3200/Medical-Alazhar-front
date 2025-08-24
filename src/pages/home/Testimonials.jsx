import React, { useEffect, useRef, useState } from "react";
import { FaQuoteLeft, FaStar, FaUserMd, FaGraduationCap, FaHeartbeat, FaStethoscope, FaBrain, FaMicroscope } from "react-icons/fa";



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

const Testimonials = () => {
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
                {/* Header */}
                <div className={`text-center mb-16 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <h2 className={`text-4xl lg:text-5xl font-bold text-gray-900 mb-6 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        Advancing Medical Excellence
                        <span className="text-blue-600 block">Through Continuous Learning</span>
                    </h2>
                    <p className={`text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        In the rapidly evolving field of medicine, continuous education is not just important—it's essential.
                        Our platform empowers doctors to enhance their clinical skills, stay updated with medical advancements,
                        and ultimately provide better patient care through evidence-based practice.
                    </p>
                </div>

                {/* Medical Importance Section */}
                <div className={`grid lg:grid-cols-3 gap-8 mb-16 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    {medicalImportanceData.map((item, index) => (
                        <div key={index} className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-700 delay-${800 + (index * 200)} ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'} hover:-translate-y-2`}>
                            <div className="mb-6 flex justify-center">
                                {item.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">{item.title}</h3>
                            <p className="text-gray-600 leading-relaxed text-center">{item.description}</p>
                        </div>
                    ))}
                </div>

                {/* Medical Stats Section */}
                <div className={`grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16 transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    {medicalStatsData.map((stat, index) => (
                        <div key={index} className={`text-center transition-all duration-700 delay-${1000 + (index * 200)} ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
                            <div className="mb-4 flex justify-center">
                                {stat.icon}
                            </div>
                            <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                            <div className="text-gray-600 font-medium mb-1">{stat.label}</div>
                            <div className="text-sm text-gray-500">{stat.description}</div>
                        </div>
                    ))}
                </div>


                {/* Medical Education Quote */}
                <div className={`mt-16 text-center transition-all duration-1000 delay-1400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white max-w-5xl mx-auto">
                        <FaQuoteLeft className="text-4xl mx-auto mb-4 opacity-80" />
                        <p className="text-xl lg:text-2xl font-medium mb-4 leading-relaxed">
                            "The quality of medical care directly correlates with the continuous education of healthcare professionals.
                            Our commitment to advancing medical knowledge ensures better patient outcomes and safer healthcare delivery."
                        </p>
                        <div className="text-lg opacity-90">- Medical Education & Research Institute</div>
                    </div>
                </div>
            </div>
        </section>
    );
};


export default Testimonials;
