import React from "react";
import { FaUserMd, FaLaptopMedical, FaRegNewspaper } from "react-icons/fa";

const newsData = [
  {
    icon: <FaLaptopMedical className="text-2xl text-lightBlue" />,
    date: "Mar 5, 2025",
    title: "New Online Learning Platform",
    description:
      "Our unit launches a state-of-the-art virtual learning environment for remote education.",
  },
  {
    icon: <FaRegNewspaper className="text-2xl text-lightBlue" />,
    date: "Sep 18, 2024",
    title: "Accreditation Renewal",
    description:
      "Continuous Medical Unit receives 5-year accreditation from the Medical Education Council.",
  },
  {
    icon: <FaUserMd className="text-2xl text-lightBlue" />,
    date: "Aug 12, 2025",
    title: "Faculty Achievement Award",
    description:
      "Dr. Ahmed Nouh recognized for excellence in continuing medical education.",
  },
];

const LatestNews = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold w-full text-center text-secondary">
            Latest News
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {newsData.map((news, i) => {
            return (
              <React.Fragment key={i}>
                <NewsCard
                  icon={news.icon}
                  title={news.title}
                  description={news.description}
                  date={news.date}
                />
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const NewsCard = ({ icon, title, description, date }) => (
  <div className="bg-flashWhite p-6 rounded-lg hover:bg-white hover:shadow-sm transition">
    <div className="flex items-center mb-4">
      <div className="bg-lightBlue/10 p-3 rounded-full mr-4">{icon}</div>
      <div className="text-mistyMorning text-sm">{date}</div>
    </div>
    <h3 className="text-xl font-bold mb-2 text-secondary">{title}</h3>
    <p className="text-mistyMorning">{description}</p>
  </div>
);

export default LatestNews;
