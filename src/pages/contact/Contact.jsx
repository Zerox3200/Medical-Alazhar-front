import React from "react";
import Input from "./components/Input";
import Button from "./components/Button";
import Select from "react-select";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaRegClock,
} from "react-icons/fa";

const subjectOptions = [
  { label: "Technical Issue", value: "technical_issue" },
  { label: "Account Management", value: "account_management" },
  { label: "Portfolio Content", value: "portfolio_content" },
  { label: "Training & Tutorials", value: "training_tutorials" },
];

const contactInfoList = [
  {
    icon: <FaMapMarkerAlt />,
    title: "Address",
    description: "123, 6th district, Nasr City, Cairo",
  },
  {
    icon: <FaEnvelope />,
    title: "Email",
    description: "support@internsystem.com",
  },
  {
    icon: <FaPhone />,
    title: "Phone",
    description: "+20-1011-2541-41",
  },
  {
    icon: <FaRegClock />,
    title: "Working Hours",
    description: "Sunday to Thurday - 9 AM to 2 PM",
  },
];

const ContactUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your message has been sent!");
  };

  return (
    <div className="p-6">
      <div className="p-6 max-w-5xl mx-auto bg-white overflow-hidden rounded-md">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-secondary">
            Let's Get In Touch
          </h1>
          <p className="text-silverFrost mt-2">
            We're here to help! Reach out to us for any questions or feedback.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-10 justify-between">
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="col-span-6">
            <div className="mb-4">
              <Input
                label="Name"
                placeholder="Please add your full name"
                inputId="name"
              />
            </div>
            <div className="mb-4">
              <Input
                label="Email"
                placeholder="Enter a valid email"
                inputId="email"
              />
            </div>
            <div className="mb-4">
              <label className="text-md font-semibold mb-2 block">
                Subject
              </label>
              <Select
                placeholder="Select a subject"
                isClearable
                options={subjectOptions}
              />
            </div>
            <div className="mb-4">
              <label className="text-md font-semibold mb-2 block">
                Message
              </label>
              <textarea
                className="w-full p-2 outline-none bg-flashWhite/60 border-1 border-silverFrost/40 rounded-md"
                rows="5"
                placeholder="Enter your message"
                required
              />
            </div>
            <div>
              <Button
                label="Send Message"
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded-lg"
              />
            </div>
          </form>
          <div className="col-span-6 p-6 rounded-md">
            {/* Contact Information */}
            <div className="mb-8">
              <ul className="space-y-2 flex flex-col gap-4">
                {contactInfoList.map((item, i) => {
                  return (
                    <li
                      className="flex items-center gap-6 p-4 bg-flashWhite rounded-md text-secondary hover:bg-lightBlue transition-colors duration-200"
                      key={i}
                    >
                      <h3 className="text-4xl">{item.icon}</h3>
                      <p className="flex flex-col gap-1 text-base">
                        <span>{item.title}</span>
                        <span className="font-semibold">
                          {item.description}
                        </span>
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
