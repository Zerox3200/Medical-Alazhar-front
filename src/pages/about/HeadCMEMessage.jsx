import React from "react";
import { FaFacebook, FaQuoteLeft } from "react-icons/fa";
import HeadCMEImg from "../../assets/images/instructor.png";

const HeadCMEMessage = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <div className="border-1 border-secondary rounded-full mr-4 overflow-hidden">
              <img
                src={HeadCMEImg}
                alt="Dean"
                className="w-16 h-16 rounded-full object-cover"
              />
            </div>
            <h2 className="text-4xl font-bold text-secondary">
              From the Head of CME
            </h2>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm relative">
            <FaQuoteLeft className="text-lightBlue/40 text-4xl absolute top-6 left-6" />
            <p className="text-lg text-secondary mb-6 relative z-10 pl-8">
              “Our Continuous Medical Education programs are designed with
              practicing clinicians in mind. We focus on practical,
              evidence-based education that can be immediately applied to
              improve Patient care. Through our diverse offerings—from workshops
              to online courses—we aim to Meet the evolving needs of healthcare
              professionals at all career stages."
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <div>
                <h4 className="font-bold text-secondary">Dr. Ahmed Nouh</h4>
                <p className="text-mistyMorning">
                  Head, Continuous Medical Education Unit
                </p>
              </div>
              <a
                href="https://facebook.com/dean.profile"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-mediumBlue/80  hover:text-mediumBlue mt-4 sm:mt-0"
              >
                <FaFacebook className="mr-2" /> Connect on Facebook
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeadCMEMessage;
