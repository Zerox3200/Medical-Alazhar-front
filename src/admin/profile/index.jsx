import React from "react";
import { FaCheck, FaCheckCircle, FaEnvelope } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { useGetAdminQuery } from "../../services/api/adminApiSlice";
import { useSelector } from "react-redux";
import { MdEdit } from "react-icons/md";

import _ from "lodash";

const Profile = () => {
  const { id } = useSelector((state) => state.auth?.user);

  const { data, isLoading, isFetching, isSuccess } = useGetAdminQuery({
    adminId: id,
  });

  // Last Seen
  const seenDate = new Date(data?.admin?.lastLogin);
  const lastLoginDate = seenDate.toLocaleString();

  // Join At
  const joinDate = new Date(data?.admin?.createdAt);
  const joinAtDate = joinDate.toLocaleString();

  return (
    <div className="flex flex-col gap-10">
      <div className="bg-white shadow-md flex items-center justify-between p-6 rounded-md">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div className="">
            <img
              className="w-42 h-42 object-cover"
              src={"http://localhost:3000/" + data?.admin?.profileImage}
              alt="profile-image"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="font-semibold text-xl text-secondary">
              {data?.admin?.fullname}
            </h1>
            <h2 className="text-lg text-primary">
              Professor of Vascular Surgery
            </h2>
            <p>
              Last Login: <span className="text-hotPink">{lastLoginDate}</span>
            </p>
            <p className="text-primary flex items-center gap-2">
              {_.capitalize(data?.admin?.role)}{" "}
              <FaCheckCircle className="text-emeraldGreen" title="verified" />
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <p className="flex items-center gap-2">
            <FaEnvelope className="text-hotPink" /> abdallah.elmallah@gmail.com
          </p>
          <p className="flex items-center gap-2">
            <FaPhoneAlt className="text-hotPink" /> +201012458574
          </p>
        </div>
      </div>

      {/* Personal Details */}
      <div className="bg-white shadow-md rounded-md">
        <div className="flex justify-between items-center border-b-[1px] border-cloudVeil p-6">
          <h1 className="text-primary text-xl font-medium">Personal Details</h1>
          <p>
            <MdEdit className="text-mistyMorning cursor-pointer hover:text-silverFrost text-xl" />
          </p>
        </div>

        <div className="p-6">
          <div>
            <div className="flex gap-2">
              <span>Joined</span>
              <span className="font-medium">{joinAtDate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
