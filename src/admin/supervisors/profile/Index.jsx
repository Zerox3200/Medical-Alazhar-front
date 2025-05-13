import React from "react";
import Header from "./components/Header";
import SupervisorContent from "./components/SupervisorContent";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { useGetSingleSupervisorQuery } from "../../../services/api/adminApiSlice";
import Loader from "../../../components/Loader";
const SupervisorProfile = () => {
  const { supervisorId } = useParams();

  const { id } = useSelector((state) => state.auth.user || {});

  const { data, error, isLoading } = useGetSingleSupervisorQuery({
    supervisorId,
  });

  if (!id) return <div>Please log in.</div>;
  if (isLoading) return <Loader />;
  if (error)
    return <div>Error: {error.data?.message || "Failed to load user"}</div>;

  return (
    <div className="p-6">
      <Header data={data} />
      <SupervisorContent data={data} />
    </div>
  );
};

export default SupervisorProfile;
