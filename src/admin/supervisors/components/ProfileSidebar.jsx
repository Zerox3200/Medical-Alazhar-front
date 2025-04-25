import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoCloseCircle } from "react-icons/io5";
import ImagePopper from "./ImagePopper";

const ProfileSidebar = ({ data: { intern } }) => {
  const date = new Date(intern?.lastLogin);
  const lastLoginDate = date.toLocaleString();

  return (
    <div className="p-8 shadow-md border-r-1 border-mediumGray/20 h-full">
      {/* Profile Image */}
      <div className="mb-10">
        <div className="rounded-sm mb-4 relative group bg-softray h-64 flex flex-center justify-center">
          {intern?.profileImage ? (
            <ImagePopper
              src={"http://localhost:3000/" + intern?.profileImage}
              alt={intern?.fullname}
              imageWidth="w-64"
              imageHeight="w-44"
            />
          ) : (
            <FaRegCircleUser className="text-6xl block m-auto text-mediumGray" />
          )}
        </div>
        <div className="text-md text-darkGray text-center">
          <h3 className="text-xl flex justify-center items-center gap-1">
            <span>{intern?.role}</span>
            <span>
              {intern?.approved ? (
                <FaCheckCircle className="text-emeraldGreen" title="approved" />
              ) : (
                <IoCloseCircle className="text-darkGray" title="not approved" />
              )}
            </span>
          </h3>
          <p className="text-mediumGray">
            Last login in <strong>{lastLoginDate}</strong>
          </p>
        </div>
      </div>
      <div className="w-full h-[1px] bg-mediumGray/40"></div>
      <ul className="py-10">
        <li className="text-lg px-4 py-2 cursor-pointer duration-150 transition-colors hover:bg-softGray">
          General Information
        </li>
        <li className="text-lg px-4 py-2 cursor-pointer duration-150 transition-colors hover:bg-softGray">
          Cases
        </li>
        <li className="text-lg px-4 py-2 cursor-pointer duration-150 transition-colors hover:bg-softGray">
          Courses
        </li>
        <li className="text-lg px-4 py-2 cursor-pointer duration-150 transition-colors hover:bg-softGray">
          Change Password
        </li>
      </ul>
    </div>
  );
};

export default ProfileSidebar;
