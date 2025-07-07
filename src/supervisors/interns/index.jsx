import React from "react";
import InternBox from "./InternBox";
import { useSelector } from "react-redux";
import { useSupervisorInterns } from "../../services/supervisor/api/hooks/supervisorHooks";
import SearchBar from "./SearchBar";

const Interns = () => {
  const { id } = useSelector((state) => state.auth.user);
  const { supervisorInternsData } = useSupervisorInterns({ supervisorId: id });
  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col items-start gap-3">
        <div className="w-1/2">
          <SearchBar placeholder="Find intern" />
        </div>
        <p className="text-secondary">
          Results: {supervisorInternsData?.count}
        </p>
      </div>
      <div className="grid grid-cols-4 gap-6">
        {supervisorInternsData?.data?.map((internData) => (
          <InternBox
            internData={internData}
            casesCount={
              supervisorInternsData?.data?.[0]?.trainingProgress?.[0]?.cases
                ?.length
            }
            proceduresCount={
              supervisorInternsData?.data?.[0]?.trainingProgress?.[0]
                ?.procedures?.length
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Interns;
