import React from "react";
import { Link, NavLink } from "react-router";
import logo from "../assets/images/logo.jpg";

const navLinks = [
  {
    title: "home",
    label: "Home",
  },
  {
    title: "about",
    label: "About",
  },
  {
    title: "courses",
    label: "Courses",
  },
  {
    title: "contact_us",
    label: "Contact Us",
  },
];

const MainNavbar = () => {
  return (
    <div className="px-8 p-2 fixed z-50 bg-white text-secondary border-b-1 border-mistyMorning/40 w-full min-h-[80px] flex items-center">
      <h2 className="font-semibold text-2xl">
        <Link to="/">
          <img src={logo} className="w-20 h-20 rounded-full" />
        </Link>
      </h2>

      {/* Links */}
      <ul className="flex gap-8 mx-auto">
        {navLinks.map((navLink, i) => {
          return (
            <React.Fragment key={i}>
              <li className="hover:text-lightBlue">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-lightBlue" : null
                  }
                  to={navLink.title === "home" ? "/" : `/${navLink.title}`}
                >
                  {navLink.label}
                </NavLink>
              </li>
            </React.Fragment>
          );
        })}
      </ul>
    </div>
  );
};

export default MainNavbar;
