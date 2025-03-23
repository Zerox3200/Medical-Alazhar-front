import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { FaUserCircle } from "react-icons/fa";

const UserProfile = () => {
  // const { authState, logout } = useContext(AuthContext);
  // const username = authState.user.fullname?.split(" ", 2).join(" ");

  const [opened, setOpened] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    // logout();
    navigate("/auth/login");
  };

  return (
    <div
      className={`relative text-center ${!opened ? "overflow-hidden " : null}`}
      onClick={() => setOpened(!opened)}
    >
      <div
        className={`text-softGray flex justify-between items-center gap-4 cursor-pointer p-2 ${
          !opened ? "rounded-md" : "rounded-t-md"
        }`}
      >
        <p className="text-3xl">
          <FaUserCircle />
        </p>
        {/* <p className="font-semibold">{username}</p> */}
      </div>

      <div
        className={`absolute translate-y-[26px] left-0 bg-crispWhite shadow-2xl rounded-b-md w-full min-h-20 p-2 text-darkGray ${
          opened ? "min-h-20" : "h-0"
        }`}
      >
        <div className="mb-2 flex flex-col items-start gap-2">
          <Link
            to="/profile"
            className="block w-full h-full p-2 hover:bg-softGray duration-200 transition-all"
          >
            Profile
          </Link>

          <Link
            to="/settings"
            className="block w-full h-full p-2 hover:bg-softGray duration-200 transition-all"
          >
            Settings
          </Link>
        </div>
        <div className="py-1 border-t-1 border-mediumGray/20">
          <button
            type="submit"
            onClick={handleLogout}
            className="w-full cursor-pointer hover:bg-teal duration-200 transition-all px-2 py-1"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
