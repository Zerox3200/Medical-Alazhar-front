import React from "react";
import { FaFacebook, FaQuoteLeft } from "react-icons/fa";
import deanImg from "../../assets/images/instructor.png";

const DeanMessage = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <div className="border-1 border-secondary rounded-full mr-4 overflow-hidden">
              <img
                src={deanImg}
                alt="Dean"
                className="w-16 h-16 rounded-full object-cover"
              />
            </div>
            <h2 className="text-4xl font-bold text-secondary">
              Dean’s Message
            </h2>
          </div>

          <div className="bg-flashWhite p-8 rounded-lg relative">
            <FaQuoteLeft className="text-lightBlue/40 text-4xl absolute top-6 left-6" />
            <p className="text-lg text-secondary mb-6 relative z-10 pl-8">
              “The Continuous Medical Unit represents our faculty’s unwavering
              commitment to lifelong learning in medicine. In this era of rapid
              medical advancements, it is imperative that our healthcare
              professionals have access To cutting-edge continuing education
              that bridges the gap between research and clinical practice."
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <div>
                <h4 className="font-bold text-primary">
                  Prof. Hussein Abo-Elgheit
                </h4>
                <p className="text-mistyMorning">Dean, Faculty of Medicine</p>
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

export default DeanMessage;
