import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router";
import { FaUserLarge } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";
import { BsFillGearFill } from "react-icons/bs";
import { useLogoutMutation } from "../../services/api/authApiSlice";

const AccountMenu = ({ name, role, profileImage }) => {
  const [opened, setOpened] = useState(false);
  const [toggleTheme, setToggleTheme] = useState(false);

  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="relative">
      <ToastContainer position="top-center" />
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => setOpened(!opened)}
      >
        <h2 className="relative">
          <img
            src={"http://localhost:3000/" + profileImage}
            alt="profile-image-icon"
            className="w-12 h-12 rounded-full object-cover border-[1px] border-silverFrost"
          />
          <span className="bg-emeraldGreen rounded-full w-3 h-3 absolute bottom-0 right-1"></span>
        </h2>
        <div>
          <h3 className="text-md text-secondary">{name}</h3>
          <p className="text-sm text-mistyMorning">{role}</p>
        </div>
      </div>

      {/* Account Menu */}
      <div
        className={`absolute bg-flashWhite w-full max-h-52 rounded-b-md shadow-md top-18 left-0 z-10 transition-all duration-300 ease-ou ${
          opened
            ? "opacity-100 translate-y-0 visible"
            : "invisible opacity-0 -translate-y-2"
        }`}
      >
        <ul className="p-4">
          <li>
            <Link
              to="/profile"
              className="p-2 rounded-md text-secondary flex gap-2 items-center hover:bg-pink"
            >
              <FaUserLarge /> Profile
            </Link>
          </li>
          <li>
            <Link
              to="/admin/profile"
              className="p-2 rounded-md text-secondary flex gap-2 items-center hover:bg-pink"
            >
              <BsFillGearFill /> Settings
            </Link>
          </li>
          <li
            onClick={handleLogout}
            className="p-2 rounded-md text-secondary flex gap-2 items-center hover:bg-pink cursor-pointer"
          >
            <MdLogout />
            Logout
          </li>
          <div className="bg-silverFrost h-[1px] w-full my-2"></div>
          <li className="py-2 text-secondary flex justify-between gap-2 items-center">
            Theme
            <button
              type="button"
              className={`relative rounded-full w-10 h-5 transition-colors duration-300 focus:outline-none ${
                toggleTheme ? "bg-secondary" : "bg-gray-300"
              }`}
              onClick={() => setToggleTheme(!toggleTheme)}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full transition-transform duration-300 ${
                  toggleTheme
                    ? "translate-x-5 bg-white"
                    : "translate-x-0 bg-gray-600"
                }`}
              />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AccountMenu;
