import React, { useState } from "react";
import { Link } from "react-router";
import _ from "lodash";
import Copyright from "./Copyright";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaYoutube,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
  FaExclamationTriangle,
  FaUserGraduate,
  FaSignInAlt,
  FaQuestionCircle,
  FaFileAlt
} from "react-icons/fa";

const quickLinks = ["Home", "Courses", "Contact"];

const resourcesLinks = [
  "Learning Materials",
  "Research Publications",
  "Accreditation",
  "FAQs",
];

const socialMediaLinks = [
  { icon: <FaFacebook />, url: "#", label: "Facebook" },
  { icon: <FaTwitter />, url: "#", label: "Twitter" },
  { icon: <FaLinkedin />, url: "#", label: "LinkedIn" },
  { icon: <FaInstagram />, url: "#", label: "Instagram" },
  { icon: <FaYoutube />, url: "#", label: "YouTube" },
];

const quickActions = [
  { icon: <FaUserGraduate />, label: "Apply Now", url: "/auth/signup" },
  { icon: <FaSignInAlt />, label: "Login", url: "/auth/login" },
  { icon: <FaQuestionCircle />, label: "Support", url: "/contact" },
  { icon: <FaFileAlt />, label: "Report Issue", url: "/contact" },
];

const FooterLinks = () => {
  const year = new Date().getFullYear();
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Newsletter subscription:", email);
    setEmail("");
  };

  return (
    <footer className="bg-gray-800 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-6 md:grid-cols-3 gap-8">
          {/* Institution Info */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold mb-4">Continuous Medical Unit</h3>
            <p className="text-mistyMorning mb-4">
              Advancing healthcare through lifelong learning and professional
              development.
            </p>

            {/* Social Media Links */}
            <div className="mb-4">
              <h5 className="font-semibold mb-3">Follow Us</h5>
              <div className="flex space-x-3">
                {socialMediaLinks.map((social, i) => (
                  <a
                    key={i}
                    href={social.url}
                    className="w-10 h-10 bg-gray-700 hover:bg-lightBlue rounded-full flex items-center justify-center transition-colors duration-300"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, i) => {
                return (
                  <li key={i}>
                    <Link
                      to={link.toLowerCase()}
                      className="text-mistyMorning hover:text-white transition-colors duration-300"
                    >
                      {link}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold mb-4">Resources</h4>
            <ul className="space-y-2">
              {resourcesLinks.map((link, i) => {
                return (
                  <li key={i}>
                    <Link
                      to={_.snakeCase(link.toLowerCase())}
                      className="text-mistyMorning hover:text-white transition-colors duration-300"
                    >
                      {link}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="font-bold mb-4">Contact Us</h4>
            <address className="text-mistyMorning not-italic space-y-2">
              <div className="flex items-start space-x-2">
                <FaMapMarkerAlt className="mt-1 flex-shrink-0" />
                <div>
                  Faculty of Medicine<br />
                  Continuous Medical Unit<br />
                  Nasr City, Cairo
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <FaPhone className="flex-shrink-0" />
                <span>(123) 456-7890</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaEnvelope className="flex-shrink-0" />
                <span>cmu@medfaculty.edu</span>
              </div>
              <div className="flex items-start space-x-2">
                <FaClock className="mt-1 flex-shrink-0" />
                <div>
                  Sun-Thu: 9 AM - 2 PM<br />
                  Fri-Sat: Closed
                </div>
              </div>
            </address>
          </div>

          {/* Emergency Contact & Quick Actions */}
          <div>
            <h4 className="font-bold mb-4">Quick Actions</h4>
            <ul className="space-y-2 mb-6">
              {quickActions.map((action, i) => (
                <li key={i}>
                  <Link
                    to={action.url}
                    className="text-mistyMorning hover:text-white transition-colors duration-300 flex items-center space-x-2"
                  >
                    {action.icon}
                    <span>{action.label}</span>
                  </Link>
                </li>
              ))}
            </ul>

          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="max-w-md mx-auto text-center">
            <h4 className="font-bold mb-3">Stay Updated</h4>
            <p className="text-mistyMorning mb-4">
              Subscribe to our newsletter for the latest updates, events, and educational content.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lightBlue"
                required
              />
              <button
                type="submit"
                className="px-6 py-2 bg-lightBlue hover:bg-blue-600 text-white rounded-lg transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="border-t border-gray-700 mt-8">
        <div className="container mx-auto px-6 py-4">
          <div className="text-center text-mistyMorning text-sm">
            Copyright &copy; {year} <br />
            <strong>Al-Azhar University for Boys - Faculty of Medicine</strong>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterLinks;
