import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

const eventsData = [
  {
    date: "15 OCT 2025",
    title: "Advances in Cardiology",
    description:
      "Latest research and clinical practices in cardiovascular medicine.",
    location: "Virtual",
  },
  {
    date: "22 NOV 2025",
    title: "Pediatric Emergency Care",
    description: "Hands-on training for emerge pediatric scenariosncy.",
    location: "Main Campus",
  },
  {
    date: "05 DEC 2025",
    title: "Medical Education Symposium",
    description:
      "Innovative approaches to teaching medicine in the 21st century.",
    location: "Conference Center",
  },
];

const UpcomingEvents = () => {
  return (
    <section className="py-16 bg-flashWhite" id="upcoming_events">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-center w-full text-secondary mb-12">
            Upcoming Events
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {eventsData.map((event, i) => {
            return (
              <React.Fragment key={i}>
                <EventCard
                  date={event.date}
                  title={event.title}
                  description={event.description}
                  location={event.location}
                />
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const EventCard = ({ date, title, description, location }) => (
  <div className="bg-white p-6 shadow-sm hover:shadow-md transition border-l-4 border-mediumBlue">
    <div className="text-silverFrost font-medium mb-2">{date}</div>
    <h3 className="text-xl font-bold mb-2 text-secondary">{title}</h3>
    <p className="text-secondary mb-4">{description}</p>
    <div className="flex items-center text-secondary">
      <FaMapMarkerAlt className="text-lightBlue" />
      <span className="ml-2 text-mistyMorning">{location}</span>
    </div>
  </div>
);

export default UpcomingEvents;
