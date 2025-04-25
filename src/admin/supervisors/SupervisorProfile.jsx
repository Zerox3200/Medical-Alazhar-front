import React from "react";
import ProfileSidebar from "./components/ProfileSidebar";
import SupervisorContent from "./components/SupervisorContent";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { useGetSingleSupervisorQuery } from "../../../services/api/apiSlice";
import Loader from "../../../components/Loader";
const SupervisorProfile = () => {
  const { supervisorId } = useParams();

  const { id, role } = useSelector((state) => state.auth.user || {});

  const { data, error, isLoading } = useGetSingleSupervisorQuery(
    { supervisorId, role },
    { skip: !id }
  );

  console.log("data", data);
  if (!id) return <div>Please log in.</div>;
  if (isLoading) return <Loader />;
  if (error)
    return <div>Error: {error.data?.message || "Failed to load user"}</div>;

  return (
    <div className="grid grid-cols-8 gap-10">
      <div className="col-span-2">
        <ProfileSidebar data={data} />
      </div>
      <div className="col-span-6">
        <SupervisorContent data={data} />
      </div>
    </div>
  );
};

export default SupervisorProfile;
