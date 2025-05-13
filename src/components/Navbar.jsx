import React from "react";
import { Link, NavLink } from "react-router";
import { useSelector } from "react-redux";

import logo from "../assets/images/logo.jpg";

// Supervisors Navbar
const supervisorsNavLinks = [
  {
    title: "home",
    label: "Home",
  },
  {
    title: "rounds?round_name=internal_medicine",
    label: "Rounds",
  },
  {
    title: "interns",
    label: "Interns",
  },
  {
    title: "supervisors",
    label: "Supervisors",
  },
  {
    title: "coordinators",
    label: "Coordinators",
  },
];

const navLinks = [
  {
    title: "home",
    label: "Home",
  },
  {
    title: "training",
    label: "Training",
  },
  {
    title: "courses",
    label: "Courses",
  },
  {
    title: "portfolio",
    label: "Portfolio",
  },
  {
    title: "contact_us",
    label: "Contact Us",
  },
];

const Navbar = () => {
  const { token, user } = useSelector((state) => state.auth);

  const isAuthenticated = !!token && !!user;

  return (
    <div className="px-8 p-2 fixed z-50 bg-white text-secondary border-b-1 border-mistyMorning/40 w-full min-h-[80px] flex justify-between items-center">
      <h2 className="font-semibold text-2xl">
        <Link to="/">
          <img src={logo} className="w-20 h-20 rounded-full" />
        </Link>
      </h2>

      {/* Links */}
      {isAuthenticated && (
        <ul className="flex gap-8">
          {user.role === "admin"
            ? supervisorsNavLinks.map((navLink, i) => {
                return (
                  <React.Fragment key={i}>
                    <li className="hover:text-lightBlue">
                      <NavLink
                        className={({ isActive }) =>
                          isActive ? "text-lightBlue" : null
                        }
                        to={
                          navLink.title === "home"
                            ? "/"
                            : `/admin/${navLink.title}`
                        }
                      >
                        {navLink.label}
                      </NavLink>
                    </li>
                  </React.Fragment>
                );
              })
            : navLinks.map((navLink, i) => {
                return (
                  <React.Fragment key={i}>
                    <li className="hover:text-lightBlue">
                      <NavLink
                        className={({ isActive }) =>
                          isActive ? "text-lightBlue" : null
                        }
                        to={
                          navLink.title === "home" ? "/" : `/${navLink.title}`
                        }
                      >
                        {navLink.label}
                      </NavLink>
                    </li>
                  </React.Fragment>
                );
              })}
        </ul>
      )}

      {/* Authentication Links */}
      {isAuthenticated ? (
        <div>{/* <UserProfileMenu /> */}</div>
      ) : (
        <div className="flex">
          <Link to="/auth/login" className="hover:underline">
            Login
          </Link>
          <p className="mx-2">/</p>
          <Link to="/auth/signup" className="hover:underline">
            Signup
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
