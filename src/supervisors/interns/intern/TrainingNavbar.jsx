import React from "react";

const links = ["Cases", "Procedures", "Self Learning", "Direct Learning"];

const TrainingNavbar = ({ activeLink, setActiveLink }) => {
  return (
    <nav className="border-r border-mistyMorning pr-6 h-full">
      <ul className="text-secondary">
        {links.map((link, i) => (
          <li
            className={`p-2 bg-flashWhite rounded-md mb-2 cursor-pointer ${
              i === activeLink ? "text-lightBlue" : ""
            }`}
            key={i}
            onClick={() => setActiveLink(i)}
          >
            {link}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TrainingNavbar;
