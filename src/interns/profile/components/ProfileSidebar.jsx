import React from "react";
import _ from "lodash";
import { FaCheckCircle, FaIdCard, FaLock, FaUserCheck } from "react-icons/fa";
import { FaRegCircleUser, FaUser } from "react-icons/fa6";
import profileImage from "../profile.jpg";
import ImagePopper from "./ImagePopper";
import { MdLogout } from "react-icons/md";
import { PiCertificateFill } from "react-icons/pi";

const profileLinks = [
  {
    icon: <FaUser />,
    label: "Personal Information",
    value: "personal_information",
  },
  {
    icon: <FaIdCard />,
    label: "Identitiy Information",
    value: "identitiy_information",
  },
  {
    icon: <PiCertificateFill />,
    label: "Academic Information",
    value: "academic_information",
  },
  { icon: <FaLock />, label: "Password", value: "password" },
  { icon: <FaUserCheck />, label: "Account Status", value: "account_status" },
  { icon: <MdLogout />, label: "Log Out", value: "logout" },
];

const ProfileSidebar = ({
  data: { intern },
  linkIndex,
  setLinkIndex,
  setLinkValue,
}) => {
  const date = new Date(intern?.lastLogin);
  const lastLoginDate = date.toLocaleString();

  return (
    <div className="bg-white p-6 rounded-sm shadow-sm">
      <div>
        {/* Profile Image */}
        <div className="mb-4 relative group flex flex-center justify-center">
          {profileImage ? (
            <ImagePopper src={profileImage} alt={intern?.fullname} />
          ) : (
            <FaRegCircleUser className="text-6xl block m-auto text-mistyMorning" />
          )}
        </div>
        {/* Intern Info */}
        <div className="text-md text-darkGray text-center">
          <div>
            <h1 className="font-semibold text-lg text-secondary flex gap-2 items-center justify-center">
              <span>
                {intern?.fullname?.split(" ")[0] +
                  " " +
                  intern?.fullname?.split(" ")[1]}
              </span>

              <span>
                {intern?.approved ? (
                  <FaCheckCircle
                    className="text-emeraldGreen"
                    title="approved"
                  />
                ) : (
                  <FaCheckCircle
                    className="text-silverFrost"
                    title="not approved"
                  />
                )}
              </span>
            </h1>
          </div>
          <h3 className="text-xl flex justify-center items-center gap-1">
            <span>{_.capitalize(intern?.role)}</span>
          </h3>
          <p className="text-mediumGray">
            Last login in <strong>{lastLoginDate}</strong>
          </p>
        </div>
      </div>
      {/* Separator */}
      <div className="border-b-1 border-dased border-secondary w-full h-1 my-6"></div>
      <ul className="py-6 text-secondary">
        {profileLinks.map((link, i) => {
          return (
            <li
              className={`flex gap-3 items-center text-lg px-4 py-2 cursor-pointer duration-150 transition-colors border-lightBlue ${
                linkIndex === i ? "bg-lightBlue/20 border-r-4" : ""
              }`}
              key={i}
              onClick={() => {
                setLinkIndex(i);
                setLinkValue(link.value);
              }}
            >
              <span className={`${linkIndex === i ? "text-mediumBlue" : ""}`}>
                {link.icon}
              </span>{" "}
              <span>{link.label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ProfileSidebar;
