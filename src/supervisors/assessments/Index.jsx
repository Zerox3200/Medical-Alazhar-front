import React from "react";
import AddAssessment from "./AddAssessment";
import AssessmentBox from "./AssessmentBox";
import SearchBar from "../components/SearchBar";
import Select from "react-select";
import { useGetAssessmentsQuery } from "../../services/supervisor/api/hooks/supervisorHooks";
import { useSelector } from "react-redux";
import Button from "../components/Button";
import { Link } from "react-router";

const Assessments = () => {
  const { id } = useSelector((state) => state.auth.user);
  const { data } = useGetAssessmentsQuery({
    supervisorId: id,
    roundId: "686670fa40be3a58b2335e4a",
  });

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center gap-4">
        <div className="w-3/6">
          <SearchBar placeholder="Find intern..." />
        </div>
        <div className="w-2/6">
          <Select placeholder="Wave" options={[]} isClearable />
        </div>
        <div className="w-1/6">
          <Link
            to="/assessments/add"
            className="py-2 px-4 rounded-md bg-mediumBlue hover:bg-lightBlue  block text-center text-white"
          >
            Add Assessment
          </Link>
        </div>
      </div>

      {/* Show assessments */}
      <div className="grid grid-cols-4 gap-6">
        {data?.assessments?.length > 0 ? (
          data?.assessments?.map((assessment) => {
            return <AssessmentBox assessment={assessment} />;
          })
        ) : (
          <p className="text-3xl text-center text-lightRed col-span-full mt-42 capitalize">
            No assessments added yet
          </p>
        )}
      </div>
    </div>
  );
};

export default Assessments;
