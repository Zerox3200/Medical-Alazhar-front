import React from "react";

const Hero = () => {
  return (
    <section className="bg-lightBlue text-white py-20">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-6">Advancing Medical Education</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Continuous professional development for healthcare practitioners to
          enhance skills and improve patient outcomes.
        </p>
        <div className="flex items-center gap-4 w-1/3 m-auto">
          <a
            className="bg-mediumBlue text-flashWhite w-full flex justify-center items-center gap-2 py-2 px-3 rounded-md shadow-sm hover:opacity-70 cursor-pointer duration-150 transition-all"
            target="_self"
            href="/courses"
          >
            Explore Courses
          </a>
          <a
            className="bg-flashWhite text-lightBlue w-full flex justify-center items-center gap-2 py-2 px-3 rounded-md shadow-sm hover:opacity-70 cursor-pointer duration-150 transition-all"
            target="_self"
            href="#upcoming_events"
          >
            Upcoming Events
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
