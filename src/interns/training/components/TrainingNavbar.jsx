import React, { useState } from "react";
import { NavLink, useLocation } from "react-router";
import { FaChevronDown, FaChevronRight } from "react-icons/fa6";

const RecordTrainingNavbar = () => {
  const [openList, setOpenList] = useState(false);
  const location = useLocation(null);
  const pathname = location.pathname.split("/")[2];

  return (
    <nav className="bg-white text-secondary p-4 w-full text-lg min-h-full pt-20">
      <div className="h-full">
        <h3
          className={`flex gap-3 items-center cursor-pointer p-2 ${
            openList ? "hover:bg-lightBlue/0" : "hover:bg-lightBlue/30"
          }`}
          onClick={() => setOpenList(!openList)}
        >
          WPBL{" "}
          {!openList ? (
            <FaChevronRight className="text-sm" />
          ) : (
            <FaChevronDown className="text-sm" />
          )}
        </h3>
        <ul
          className={`text-md h-0 overflow-hidden ${
            openList || pathname === "cases" || pathname === "procedures"
              ? "h-fit"
              : ""
          }`}
        >
          <li
            className={`hover:text-lightBlue ${
              pathname === "cases"
                ? "bg-lightBlue/30 hover:text-primary rounded-md"
                : null
            }`}
          >
            <NavLink to="/training/cases" className="w-full pl-6 block p-1">
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
            <NavLink
              to="/training/procedures"
              className="w-full pl-6 block p-1"
            >
              Procedures
            </NavLink>
          </li>
        </ul>
      </div>
      <ul>
        <li
          className={`mt-6 hover:text-lightBlue  ${
            pathname === "self_learning"
              ? "bg-lightBlue/30 hover:text-primary rounded-md"
              : null
          }`}
        >
          <NavLink to="/training/self_learning" className="p-2 block">
            Self Learning
          </NavLink>
        </li>

        <li
          className={`mt-6 hover:text-lightBlue  ${
            pathname === "direct_learning"
              ? "bg-lightBlue/30 hover:text-primary rounded-md"
              : null
          }`}
        >
          <NavLink to="/training/direct_learning" className="p-2 block">
            Direct Learning
          </NavLink>
        </li>
        <li
          className={`mt-6 hover:text-lightBlue  ${
            pathname === "assessments"
              ? "bg-lightBlue/30 hover:text-primary rounded-md"
              : null
          }`}
        >
          <NavLink to="/training/assessments" className="p-2 block">
            Assessments
          </NavLink>
        </li>

        <li
          className={`mt-6 hover:text-lightBlue  ${
            pathname === "reflections"
              ? "bg-lightBlue/30 hover:text-primary rounded-md"
              : null
          }`}
        >
          <NavLink to="/training/reflections" className="p-2 block">
            Reflections
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default RecordTrainingNavbar;
