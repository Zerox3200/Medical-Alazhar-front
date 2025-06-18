import React from "react";
import { NavLink, useLocation } from "react-router";
import { FaChevronDown, FaChevronRight } from "react-icons/fa6";

const RecordTrainingNavbar = () => {
  const location = useLocation(null);
  const pathname = location.pathname.split("/")[2];

  return (
    <nav className="fixed z-50 top-[96px] left-0 h-full w-1/6 bg-white text-secondary p-4 text-lg min-h-full pt-20">
      <div>
        <h3 className="text-mistyMorning">WPBL</h3>
        <ul className="text-md list-outside pl-4">
          <li
            className={`hover:text-lightBlue ${
              pathname === "cases"
                ? "bg-lightBlue/30 hover:text-primary rounded-md"
                : null
            }`}
          >
            <NavLink to="/training/cases" className="w-full block p-1">
              Cases
            </NavLink>
          </li>
          <li
            className={`hover:text-lightBlue ${
              pathname === "procedures"
                ? "bg-lightBlue/30 hover:text-primary rounded-md"
                : null
            }`}
          >
            <NavLink to="/training/procedures" className="w-full block p-1">
              Procedures
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Activities */}
      <div className="mt-6">
        <h3 className="text-mistyMorning ">Activities</h3>
        <ul className="text-md list-outside pl-4">
          <li
            className={`hover:text-lightBlue  ${
              pathname === "self-learning-activities"
                ? "bg-lightBlue/30 hover:text-primary rounded-md"
                : null
            }`}
          >
            <NavLink
              to="/training/self-learning-activities"
              className="w-full block p-1"
            >
              Self Learning
            </NavLink>
          </li>

          <li
            className={`hover:text-lightBlue  ${
              pathname === "direct-learning-activities"
                ? "bg-lightBlue/30 hover:text-primary rounded-md"
                : null
            }`}
          >
            <NavLink
              to="/training/direct-learning-activities"
              className="w-full block p-1"
            >
              Direct Learning
            </NavLink>
          </li>
        </ul>
      </div>
      {/* End Round */}
      <div className="mt-6">
        <h3 className="text-mistyMorning ">End Round</h3>
        <ul className="text-md list-outside pl-4">
          <li
            className={`hover:text-lightBlue  ${
              pathname === "assessments"
                ? "bg-lightBlue/30 hover:text-primary rounded-md"
                : null
            }`}
          >
            <NavLink to="/training/assessments" className="w-full block p-1">
              Assessments
            </NavLink>
          </li>

          <li
            className={`hover:text-lightBlue  ${
              pathname === "reflections"
                ? "bg-lightBlue/30 hover:text-primary rounded-md"
                : null
            }`}
          >
            <NavLink to="/training/reflections" className="w-full block p-1">
              Reflections
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default RecordTrainingNavbar;
