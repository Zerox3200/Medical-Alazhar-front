import React from "react";
import ProfileSidebar from "./components/ProfileSidebar";
import InternContent from "./components/InternContent";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import Loader from "../../../components/Loader";
import { useGetSingleInternQuery } from "../../../services/api/apiSlice";

const InternProfile = () => {
  const { internId } = useParams();

  const { id, role } = useSelector((state) => state.auth.user || {});

  const { data, error, isLoading } = useGetSingleInternQuery(
    { internId, role },
    { skip: !id }
  );

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
        <InternContent data={data} />
      </div>
    </div>
  );
};

export default InternProfile;
