import React from "react";
import {
  FaCalendarAlt,
  FaBookMedical,
  FaChalkboardTeacher,
} from "react-icons/fa";

const featuresData = [
  {
    title: "Certification Courses",
    icon: <FaCalendarAlt className="text-4xl text-lightBlue" />,
    description:
      "Accredited programs to expand your clinical expertise and meet licensing requirements.",
  },
  {
    title: "Workshops & Seminars",
    icon: <FaBookMedical className="text-4xl text-lightBlue" />,
    description:
      "Interactive sessions on the latest medical advancements and best practices.",
  },
  {
    title: "Faculty Development",
    icon: <FaChalkboardTeacher className="text-4xl text-lightBlue" />,
    description: "Programs to enhance teaching skills for medical educators.",
  },
];

const Features = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-secondary mb-12">
          Our Offerings
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {featuresData.map((feature, i) => {
            return (
              <React.Fragment key={i}>
                <FeatureCard
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-flashWhite p-8 rounded-xl shadow-sm hover:bg-white hover:shadow-md transition">
    <div className="mb-4 flex items-center gap-4">
      <h2>{icon}</h2>
      <h3 className="text-xl font-bold text-secondary">{title}</h3>
    </div>
    <p className="text-mistyMorning">{description}</p>
  </div>
);

export default Features;
