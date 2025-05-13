import React from "react";
import logo from "../../assets/images/logo.jpg";
import { Link, NavLink } from "react-router";
import { GoHomeFill } from "react-icons/go";
import { FaHouseMedical, FaVideo } from "react-icons/fa6";
import { IoCalendarClear } from "react-icons/io5";
import { BsFillGearFill } from "react-icons/bs";
import { FaHospital, FaStethoscope, FaUsers } from "react-icons/fa";

const DashboardLinks = [
  {
    icon: <GoHomeFill />,
    label: "Dashboard",
    value: "/",
  },
  {
    icon: <IoCalendarClear />,
    label: "Calendar",
    value: "calendar",
  },
  {
    icon: <FaVideo />,
    label: "Courses",
    value: "courses",
  },
  {
    icon: <FaHospital />,
    label: "Hospitals",
    value: "/hospitals",
  },
  {
    icon: <FaHouseMedical />,
    label: "Rounds",
    value: "/rounds",
  },
  {
    icon: <FaUsers />,
    label: "Supervisors",
    value: "supervisors",
  },
  {
    icon: <FaStethoscope />,
    label: "Interns",
    value: "interns",
  },
  {
    icon: <BsFillGearFill />,
    label: "Settings",
    value: "settings",
  },
];

const DashobardSidebar = () => {
  return (
    <div className="bg-white h-full w-full text-primary text-md mb-10">
      <div className="mb-8 flex justify-center items-center border-b-[1px] border-silverFrost py-6">
        <h2 className="font-semibold text-2xl">
          <Link to="/">
            <img src={logo} className="w-20 h-20 rounded-full" />
          </Link>
        </h2>
      </div>
      <ul className="p-6">
        {DashboardLinks.map((link, i) => {
          return (
            <li className="mb-2" key={i}>
              <NavLink
                to={`${link.value}`}
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "bg-pink/30 border-1 border-hotPink rounded-md"
                      : "border-1 border-transparent"
                  } p-2 flex items-center gap-2 `
                }
              >
                <span>{link.icon}</span> {link.label}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DashobardSidebar;
