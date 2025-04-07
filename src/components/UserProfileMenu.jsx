import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useGetUserQuery, useLogoutMutation } from "../services/api/apiSlice";
import { clearAuth } from "../services/slices/authSlice";
import { persistor } from "../store/store";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";

const UserProfile = () => {
  const { id, role } = useSelector((state) => state.auth.user || {});

  const { data } = useGetUserQuery({ userId: id, role }, { skip: !id });

  const username =
    (data?.user?.fullname?.split(" ").slice(0, 2).join(" ") ??
      `${data?.user?.firstname ?? ""} ${data?.user?.lastname ?? ""}`.trim()) ||
    "Guest";

  const userImage = data?.user.profileImage;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logout, { isLoading }] = useLogoutMutation();

  const [opened, setOpened] = useState(false);

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(clearAuth());
      await persistor.purge();
      navigate("/login");
    } catch (err) {
      toast.error("Logout error:", err);
    }
  };

  return (
    <div
      className={`relative text-center ${!opened ? "overflow-hidden " : null}`}
      onClick={() => setOpened(!opened)}
    >
      <ToastContainer />
      <div
        className={`text-softGray flex justify-between items-center cursor-pointer p-2 ${
          !opened ? "rounded-md" : "rounded-t-md"
        }`}
      >
        <p>
          {userImage ? (
            <img
              src={"http://localhost:3000/" + userImage}
              alt="Profile"
              className="w-14 h-14 border-mediumGray/10 cursor-pointer rounded-full p-2 object-cover"
            />
          ) : (
            <FaUserCircle />
          )}
        </p>
        <div className="">
          <p className="text-sm font-medium">{username}</p>
          <p className="text-xs text-left text-softGray">{role}</p>
        </div>
      </div>

      <div
        className={`absolute translate-y-[12px] -right-2 bg-crispWhite shadow-2xl rounded-b-md w-52 min-h-20 p-2 text-darkGray ${
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
            disabled={isLoading}
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
