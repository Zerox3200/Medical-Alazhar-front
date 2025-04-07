import React from "react";
import { useSelector } from "react-redux";
import { useGetUserQuery } from "../../../services/api/apiSlice";
import Loader from "../../../components/Loader";
import ProfileSidebar from "./components/ProfileSidebar";
import SupervisorContent from "../../profile/components/SupervisorContent";
import InternContent from "./components/InternContent";
import { useSearchParams } from "react-router";

const UserProfile = () => {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");

  console.log("userId", userId);

  const { id, role } = useSelector((state) => state.auth.user || {});

  const { data, error, isLoading } = useGetUserQuery(
    { userId: id, role },
    { skip: !id }
  );

  if (!id) {
    return <div>Loading...</div>;
  }
  if (isLoading)
    return (
      <div>
        <Loader />
      </div>
    );
  if (error)
    return <div>Error: {error.data?.message || "Failed to load user"}</div>;

  return (
    <div className="grid grid-cols-8 gap-10">
      <div className="col-span-2">
        <ProfileSidebar data={data} />
      </div>
      {/* <div className="col-span-6">
        {role === "intern" ? (
          <InternContent data={data} />
        ) : (
          <SupervisorContent data={data} />
        )}
      </div> */}
    </div>
  );
};

export default UserProfile;
