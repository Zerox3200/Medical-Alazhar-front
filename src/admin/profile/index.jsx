import React from "react";
import { FaCheckCircle, FaEnvelope } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { useAdmin } from "../../services/admin/api/hooks/adminHooks";
import { useSelector } from "react-redux";

import _ from "lodash";

const Profile = () => {
  const { id } = useSelector((state) => state.auth?.user);

  const { adminData } = useAdmin({
    adminId: id,
  });

  // Last Seen
  const seenDate = new Date(adminData?.admin?.lastLogin);
  const lastLoginDate = seenDate.toLocaleString();

  return (
    <div className="flex flex-col gap-10 m-6">
      <div className="bg-white shadow-md flex items-center justify-between p-6 rounded-md">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div className="">
            <img
              className="w-42 h-42 object-cover"
              src={"http://localhost:3000/" + adminData?.admin?.profileImage}
              alt="profile-image"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="font-semibold text-xl text-secondary">
              {adminData?.admin?.fullname}
            </h1>
            <p>
              Last Login: <span className="text-hotPink">{lastLoginDate}</span>
            </p>
            <p className="text-primary flex items-center gap-2">
              {_.capitalize(adminData?.admin?.role)}{" "}
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
    </div>
  );
};

export default Profile;
