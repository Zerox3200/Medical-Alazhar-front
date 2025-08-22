import React from "react";
import { FaBullseye, FaCheck, FaUniversity } from "react-icons/fa";

const missions = [
  "Provide high-quality, accredited continuing education for healthcare professionals",
  "Bridge the gap between medical research and clinical practice",
  "Foster interdisciplinary collaboration among healthcare providers",
  "Promote evidence-based medicine and best practices",
  "Enhance healthcare delivery through professional development",
];

const Vision = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <div className="bg-lightBlue/20 p-3 rounded-full mr-4">
              <FaBullseye className="text-3xl text-lightBlue" />
            </div>
            <h2 className="text-4xl font-bold text-secondary">Our Vision</h2>
          </div>

          <div className="bg-lightBlue/5 p-8 border-l-4 border-lightBlue">
            <div className="flex items-start mb-6">
              <div className="p-2 rounded-full bg-mistyMorning/70 w-fit text-2xl text-white mr-4 mt-1">
                <FaUniversity className="  " />
              </div>
              <p className="text-secondary">
                To be a regional leader in continuous medical education,
                fostering excellence in healthcare Through innovative,
                accessible, and impactful learning experiences that elevate
                clinical Practice and improve patient outcomes.
              </p>
            </div>

            <h3 className="font-bold text-secondary/60 mb-4 text-xl">
              Our Mission
            </h3>
            <ul className="space-y-3 text-gray-700">
              {missions.map((mission, i) => {
                return (
                  <li className="flex items-start" key={i}>
                    <div className="bg-lightBlue/20 text-lightBlue rounded-full p-1 mr-3 mt-1 text-sm">
                      <FaCheck />
                    </div>
                    <span>{mission}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Vision;
