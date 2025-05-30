import React, { useState } from "react";
import _ from "lodash";
import ImageUploader from "./ImageUploader";
import { FaCheckCircle, FaIdCard, FaLock } from "react-icons/fa";
import { FaRegCircleUser, FaUser } from "react-icons/fa6";
import ImagePopper from "./ImagePopper";
import { MdLogout } from "react-icons/md";
import { PiCertificateFill } from "react-icons/pi";
import toast, { Toaster } from "react-hot-toast";
import { useLogoutMutation } from "../../../services/api/authApiSlice";

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
];

const ProfileSidebar = ({
  data: { intern },
  linkIndex,
  setLinkIndex,
  setLinkValue,
}) => {
  const date = new Date(intern?.lastLogin);
  const lastLoginDate = date.toLocaleString();
  const [openImageUploaderModal, setOpenImageUploaderModal] = useState(false);

  // Logout Handler
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-sm shadow-sm">
      <Toaster />
      {openImageUploaderModal ? (
        <ImageUploader
          openImageUploaderModal={openImageUploaderModal}
          setOpenImageUploaderModal={setOpenImageUploaderModal}
        />
      ) : null}
      <div>
        {/* Profile Image */}
        <div className="mb-4 relative flex flex-center justify-center overflow-hidden">
          {intern?.profileImage ? (
            <ImagePopper
              src={"http://localhost:3000/" + intern?.profileImage}
              alt={intern?.fullname}
              setOpenImageUploaderModal={setOpenImageUploaderModal}
            />
          ) : (
            <div className="h-42 flex justify-center items-center">
              <FaRegCircleUser className="text-6xl block m-auto text-mistyMorning" />
            </div>
          )}
        </div>
        {/* Intern Info */}
        <div className="text-md text-darkGray text-center">
          <div>
            <h1 className="font-semibold text-lg text-secondary flex gap-2 items-center justify-center">
              <span>
                {intern?.englishName?.split(" ")[0] +
                  " " +
                  intern?.englishName?.split(" ")[1]}
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
        <li
          className={`flex gap-3 items-center text-lg px-4 py-2 cursor-pointer duration-150 transition-colors border-lightBlue`}
          onClick={handleLogout}
        >
          <span className="text-2xl">
            <MdLogout />
          </span>{" "}
          <span>Logout</span>
        </li>
      </ul>
    </div>
  );
};

export default ProfileSidebar;
