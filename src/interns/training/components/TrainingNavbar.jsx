import React, { useState } from "react";
import { NavLink, useLocation } from "react-router";
import { FaChevronDown, FaChevronRight } from "react-icons/fa6";

const RecordTrainingNavbar = () => {
  const [openList, setOpenList] = useState(false);
  const location = useLocation(null);
  const pathname = location.pathname.split("/")[2];

  return (
    <nav className="bg-softGray p-4 w-full text-lg min-h-full pt-20">
      <div className="h-full">
        <h3
          className="text-darkGray flex gap-3 items-center cursor-pointer hover:text-deepBlue hover:bg-lightBlue p-2"
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
            className={`cursor-pointer hover:text-deepBlue ${
              pathname === "cases" ? "bg-lightBlue" : null
            }`}
          >
            <NavLink to="/training/cases" className="w-full pl-6 block p-1">
              Cases
            </NavLink>
          </li>
          <li
            className={`cursor-pointer hover:text-deepBlue ${
              pathname === "procedures" ? "bg-lightBlue" : null
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
          className={`mt-6 cursor-pointer hover:text-deepBlue hover:bg-lightBlue p-2 ${
            pathname === "self_learning" ? "bg-lightBlue" : null
          }`}
        >
          <NavLink to="/training/self_learning" className="w-full block">
            Self Learning
          </NavLink>
        </li>

        <li
          className={`mt-6 cursor-pointer hover:text-deepBlue hover:bg-lightBlue p-2 ${
            pathname === "direct_learning" ? "bg-lightBlue" : null
          }`}
        >
          <NavLink to="/training/direct_learning" className="w-full block">
            Direct Learning
          </NavLink>
        </li>
        <li
          className={`mt-6 cursor-pointer hover:text-deepBlue hover:bg-lightBlue p-2 ${
            pathname === "assessments" ? "bg-lightBlue" : null
          }`}
        >
          <NavLink to="/training/assessments" className="w-full block">
            Assessments
          </NavLink>
        </li>

        <li
          className={`mt-6 cursor-pointer hover:text-deepBlue hover:bg-lightBlue p-2 ${
            pathname === "end_round_reflections" ? "bg-lightBlue" : null
          }`}
        >
          <NavLink
            to="/training/end_round_reflections"
            className="w-full block"
          >
            End Round Reflections
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default RecordTrainingNavbar;
