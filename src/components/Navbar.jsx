import React from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/images/logo.jpg";
import UserProfile from "./UserProfile";

const navLinks = [
  {
    title: "home",
    label: "Home",
  },
  {
    title: "record_training",
    label: "Record Training",
  },
  {
    title: "assessment",
    label: "Assessment",
  },
  {
    title: "courses",
    label: "Courses",
  },
  {
    title: "end_round_reflections",
    label: "End Round Reflections",
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

// const subLinksMenu = () => {
//   return (
//     <div className="bg-crispWhite text-mediumGray p-2 rounded-sm absolute ">
//       <ul>
//         <li>
//           WPBL
//           <ul className="">
//             <li>
//               <NavLink to="/cases">Cases</NavLink>
//             </li>
//             <li>
//               <NavLink to="/procedures">Procedures</NavLink>
//             </li>
//           </ul>
//         </li>

//         <li>
//           <NavLink to="self_learning">Self Learning</NavLink>
//         </li>
//         <li>
//           <NavLink to="direct_learning">Direct Learning</NavLink>
//         </li>
//       </ul>
//     </div>
//   );
// };

const Navbar = () => {
  // const { authState } = useContext(AuthContext);

  return (
    <div className="px-8 p-2 fixed z-50 bg-teal text-crispWhite w-full min-h-[80px] flex justify-between items-center">
      <h2 className="font-semibold text-2xl">
        <Link to="/">
          <img src={logo} className="w-20 h-20 rounded-full" />
        </Link>
      </h2>

      {/* Links */}
      {true && (
        <ul className="flex gap-8 text-softGray">
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
      )}

      {/* Authentication Links */}
      {true && true ? (
        <div>
          <UserProfile />
        </div>
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
