import React from "react";
import { Link } from "react-router";
import _ from "lodash";

const quickLinks = ["Home", "Courses", "Contact"];

const resourcesLinks = [
  "Learning Materials",
  "Research Publications",
  "Accreditation",
  "FAQs",
];

const FooterLinks = () => {
  return (
    <footer className="bg-primary text-white py-22">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Continuous Medical Unit</h3>
            <p className="text-mistyMorning">
              Advancing healthcare through lifelong learning and professional
              development.
            </p>
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
                      className="text-mistyMorning hover:text-white"
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
                      className="text-mistyMorning hover:text-white"
                    >
                      {link}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contact Us</h4>
            <address className="text-mistyMorning not-italic">
              Faculty of Medicine
              <br />
              Continuous Medical Unit
              <br />
              Nasr City, Cairo
              <br />
              <br />
              Phone: (123) 456-7890
              <br />
              Email: cmu@medfaculty.edu
            </address>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterLinks;
