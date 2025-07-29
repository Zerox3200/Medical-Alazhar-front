import React from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";

const TrainingSummary = ({ internData, countItemsByState }) => {
  // All rounds data
  const allCases = internData?.data?.trainingProgress.flatMap(
    (round) => round.cases || []
  );

  const allProcedures = internData?.data?.trainingProgress.flatMap(
    (round) => round.procedures || []
  );
  const allSelfLearning = internData?.data?.trainingProgress.flatMap(
    (round) => round.selfLearning || []
  );
  const allDirectLearning = internData?.data?.trainingProgress.flatMap(
    (round) => round.directLearning || []
  );

  // Calculate stats
  const totalCases = allCases.length;
  const totalProcedures = allProcedures.length;
  const totalSelfLearning = allSelfLearning.length;
  const totalDirectLearning = allDirectLearning.length;

  const approvedCases = countItemsByState(allCases, "accepted");
  const approvedProcedures = countItemsByState(allProcedures, "accepted");
  const approvedSelfLearning = countItemsByState(allSelfLearning, "accepted");
  const approvedDirectLearning = countItemsByState(
    allDirectLearning,
    "accepted"
  );

  return (
    <div className="bg-white p-6 rounded-md shadow my-8">
      <h2 className="text-xl font-semibold mb-4 text-primary/60">
        All Training Summary
      </h2>
      {/* Cases Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium text-gray-700">Cases</h3>
              <p className="text-3xl font-bold mt-2">
                {approvedCases}
                <span className="text-gray-400 text-xl">/{totalCases}</span>
              </p>
            </div>
            <div className="w-16 h-16">
              <CircularProgressbar
                value={(approvedCases / totalCases) * 100 || 0}
                text={`${Math.round((approvedCases / totalCases) * 100) || 0}%`}
                styles={buildStyles({
                  textSize: "32px",
                  pathColor: "#3B82F6",
                  textColor: "#374151",
                })}
              />
            </div>
          </div>
          <div className="mt-4 flex justify-between text-sm">
            <span className="text-gray-500">
              Pending: {countItemsByState(allCases, "under_review")}
            </span>
            <span className="text-gray-500">
              Rejected: {countItemsByState(allCases, "rejected")}
            </span>
          </div>
        </div>

        {/* Procedures Card */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium text-gray-700">Procedures</h3>
              <p className="text-3xl font-bold mt-2">
                {approvedProcedures}
                <span className="text-gray-400 text-xl">
                  /{totalProcedures}
                </span>
              </p>
            </div>
            <div className="w-16 h-16">
              <CircularProgressbar
                value={(approvedProcedures / totalProcedures) * 100 || 0}
                text={`${
                  Math.round((approvedProcedures / totalProcedures) * 100) || 0
                }%`}
                styles={buildStyles({
                  textSize: "32px",
                  pathColor: "#10B981",
                  textColor: "#374151",
                })}
              />
            </div>
          </div>
          <div className="mt-4 flex justify-between text-sm">
            <span className="text-gray-500">
              Pending: {countItemsByState(allProcedures, "under_review")}
            </span>
            <span className="text-gray-500">
              Rejected: {countItemsByState(allProcedures, "rejected")}
            </span>
          </div>
        </div>

        {/* Self Learning Card */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium text-gray-700">
                Self Learning
              </h3>
              <p className="text-3xl font-bold mt-2">
                {approvedSelfLearning}
                <span className="text-gray-400 text-xl">
                  /{totalSelfLearning}
                </span>
              </p>
            </div>
            <div className="w-16 h-16">
              <CircularProgressbar
                value={(approvedSelfLearning / totalSelfLearning) * 100 || 0}
                text={`${
                  Math.round(
                    (approvedSelfLearning / totalSelfLearning) * 100
                  ) || 0
                }%`}
                styles={buildStyles({
                  textSize: "32px",
                  pathColor: "#F59E0B",
                  textColor: "#374151",
                })}
              />
            </div>
          </div>
          <div className="mt-4 flex justify-between text-sm">
            <span className="text-gray-500">
              Pending: {countItemsByState(allSelfLearning, "under_review")}
            </span>
            <span className="text-gray-500">
              Rejected: {countItemsByState(allSelfLearning, "rejected")}
            </span>
          </div>
        </div>

        {/* Direct Learning Card */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium text-gray-700">
                Direct Learning
              </h3>
              <p className="text-3xl font-bold mt-2">
                {approvedDirectLearning}
                <span className="text-gray-400 text-xl">
                  /{totalDirectLearning}
                </span>
              </p>
            </div>
            <div className="w-16 h-16">
              <CircularProgressbar
                value={
                  (approvedDirectLearning / totalDirectLearning) * 100 || 0
                }
                text={`${
                  Math.round(
                    (approvedDirectLearning / totalDirectLearning) * 100
                  ) || 0
                }%`}
                styles={buildStyles({
                  textSize: "32px",
                  pathColor: "#8B5CF6",
                  textColor: "#374151",
                })}
              />
            </div>
          </div>
          <div className="mt-4 flex justify-between text-sm">
            <span className="text-gray-500">
              Pending: {countItemsByState(allDirectLearning, "under_review")}
            </span>
            <span className="text-gray-500">
              Rejected: {countItemsByState(allDirectLearning, "rejected")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingSummary;
