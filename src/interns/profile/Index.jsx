import React, { useEffect, useState } from "react";
import ProfileSidebar from "./components/ProfileSidebar";
import InternContent from "./components/InternContent";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useIntern } from "../../services/intern/api/hooks/authHooks";

const Profile = () => {
  const [linkIndex, setLinkIndex] = useState(0);
  const [linkValue, setLinkValue] = useState("personal_information");
  const { role, id } = useSelector((state) => state.auth.user || {});

  const { internData, isLoading, error } = useIntern({
    userRole: role,
    userId: id,
    internId: id,
  });
  console.log(internData);

  if (!id) return <div>Please log in.</div>;
  if (isLoading) return <Loader />;
  if (error)
    return <div>Error: {error.data?.message || "Failed to load user"}</div>;
  return (
    <div className="grid grid-cols-8 gap-6 p-6">
      <div className="col-span-2">
        <ProfileSidebar
          intern={internData?.intern}
          linkIndex={linkIndex}
          setLinkIndex={setLinkIndex}
          linkValue={linkValue}
          setLinkValue={setLinkValue}
        />
      </div>

      <div className="col-span-6 bg-white p-6 rounded-sm shadow-sm">
        <InternContent
          intern={internData?.intern}
          linkIndex={linkIndex}
          linkValue={linkValue}
        />
      </div>
    </div>
  );
};

export default Profile;
