import React from "react";
import { useSelector } from "react-redux";
import { useGetMyInternQuery } from "../../../services/supervisor/api/hooks/supervisorHooks";
import { useParams } from "react-router";
import Header from "./Header";
import Content from "./Content";

const Intern = () => {
  const { internId } = useParams();
  const { id } = useSelector((state) => state.auth.user);
  const { data: internData } = useGetMyInternQuery({
    supervisorId: id,
    internId,
  });

  return (
    <div className="px-20 py-10">
      <div className="shadow-xl rounded-lg bg-white">
        {/* Header */}
        <Header internData={internData} />
        {/* Content */}
        <Content trainingProgress={internData?.data?.trainingProgress} />
      </div>
    </div>
  );
};

export default Intern;
