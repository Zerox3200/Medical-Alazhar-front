import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useSelector } from "react-redux";
import { useIntern } from "../../services/intern/api/hooks/authHooks";
import _ from "lodash";

const Progress = () => {
  const { role, id } = useSelector((state) => state.auth.user || {});
  const { internData, isLoading } = useIntern({
    userRole: role,
    userId: id,
    internId: id,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">Loading...</div>
    );
  }

  if (!internData) {
    return <div className="text-center py-10">No intern data available</div>;
  }

  // Helper functions
  const calculateCompletionPercentage = (items) => {
    if (!items || items.length === 0) return 0;
    const completed = items.filter(
      (item) =>
        item.caseState === "approved" || item.procedureState === "approved"
    ).length;
    return Math.round((completed / items.length) * 100);
  };

  const countItemsByState = (items, state) => {
    return items.filter(
      (item) => item.caseState === state || item.procedureState === state
    ).length;
  };

  // Current round data
  const currentRound = internData?.intern?.trainingProgress.find(
    (round) => round.roundId === internData?.intern?.currentRound.roundId
  );

  // All rounds data
  const allCases = internData?.intern?.trainingProgress.flatMap(
    (round) => round.cases || []
  );
  const allProcedures = internData?.intern?.trainingProgress.flatMap(
    (round) => round.procedures || []
  );
  const allSelfLearning = internData?.intern?.trainingProgress.flatMap(
    (round) => round.selfLearning || []
  );
  const allDirectLearning = internData?.intern?.trainingProgress.flatMap(
    (round) => round.directLearning || []
  );

  // Calculate stats
  const totalCases = allCases.length;
  const totalProcedures = allProcedures.length;
  const totalSelfLearning = allSelfLearning.length;
  const totalDirectLearning = allDirectLearning.length;

  const approvedCases = countItemsByState(allCases, "approved");
  const approvedProcedures = countItemsByState(allProcedures, "approved");
  const approvedSelfLearning = countItemsByState(allSelfLearning, "approved");
  const approvedDirectLearning = countItemsByState(
    allDirectLearning,
    "approved"
  );

  // Data for MUI DataGrid
  const roundsColumns = [
    { field: "roundName", headerName: "Round", flex: 1 },
    {
      field: "cases",
      headerName: "Cases",
      width: 120,
      renderCell: (params) => (
        <div className="flex space-x-2">
          <span className="text-green-600">{params.row.approvedCases}</span>
          <span>/</span>
          <span>{params.row.totalCases}</span>
        </div>
      ),
    },
    {
      field: "procedures",
      headerName: "Procedures",
      width: 120,
      renderCell: (params) => (
        <div className="flex space-x-2">
          <span className="text-green-600">
            {params.row.approvedProcedures}
          </span>
          <span>/</span>
          <span>{params.row.totalProcedures}</span>
        </div>
      ),
    },
    {
      field: "completion",
      headerName: "Completion",
      width: 150,
      renderCell: (params) => (
        <div className="w-8 h-8">
          <CircularProgressbar
            value={params.row.completionPercentage}
            text={`${params.row.completionPercentage}%`}
            styles={buildStyles({
              textSize: "32px",
              pathColor:
                params.row.completionPercentage === 100 ? "#10B981" : "#3B82F6",
              textColor: "#374151",
            })}
          />
        </div>
      ),
    },
    { field: "status", headerName: "Status", width: 120 },
  ];

  const roundsRows = internData?.intern?.trainingProgress.map((round) => ({
    id: round._id,
    roundName: _.startCase(round?.roundId?.name),
    totalCases: round.cases?.length,
    approvedCases: countItemsByState(round.cases || [], "approved"),
    totalProcedures: round.procedures?.length || 0,
    approvedProcedures: countItemsByState(round.procedures || [], "approved"),
    completionPercentage: calculateCompletionPercentage([
      ...(round.cases || []),
      ...(round.procedures || []),
    ]),
    status: round.completed ? "Completed" : "In Progress",
  }));

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            <span className="text-lightBlue">
              {internData?.intern?.englishName}'s
            </span>{" "}
            Training Progress
          </h1>
          <p className="text-gray-600">
            {internData?.intern?.hospital} • {internData?.intern?.internLevel}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-center">
            <p className="text-sm text-gray-500">Internship Start</p>
            <p className="font-medium">
              {new Date(
                internData?.intern?.internshipStartDate
              ).toLocaleDateString("en-US", {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
          <div className="h-10 border-l border-gray-300"></div>
          <div className="text-center">
            <p className="text-sm text-gray-500">Current Round</p>
            <p className="font-medium">
              {internData?.intern?.currentRound?.roundId?.name}
            </p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Cases Card */}
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

      {/* Current Round Focus */}
      {currentRound && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Current Round Progress
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Cases */}
            <div className="border rounded-lg p-4">
              <h3 className="font-medium text-gray-700 mb-2">Cases</h3>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16">
                  <CircularProgressbar
                    value={calculateCompletionPercentage(currentRound.cases)}
                    text={`${calculateCompletionPercentage(
                      currentRound.cases
                    )}%`}
                    styles={buildStyles({
                      textSize: "32px",
                      pathColor: "#3B82F6",
                      textColor: "#374151",
                    })}
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-500">
                    Completed:{" "}
                    {countItemsByState(currentRound.cases, "approved")}
                  </p>
                  <p className="text-sm text-gray-500">
                    Pending:{" "}
                    {countItemsByState(currentRound.cases, "under_review")}
                  </p>
                  <p className="text-sm text-gray-500">
                    Total: {currentRound.cases?.length || 0}
                  </p>
                </div>
              </div>
            </div>

            {/* Procedures */}
            <div className="border rounded-lg p-4">
              <h3 className="font-medium text-gray-700 mb-2">Procedures</h3>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16">
                  <CircularProgressbar
                    value={calculateCompletionPercentage(
                      currentRound.procedures
                    )}
                    text={`${calculateCompletionPercentage(
                      currentRound.procedures
                    )}%`}
                    styles={buildStyles({
                      textSize: "32px",
                      pathColor: "#10B981",
                      textColor: "#374151",
                    })}
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-500">
                    Completed:{" "}
                    {countItemsByState(currentRound.procedures, "approved")}
                  </p>
                  <p className="text-sm text-gray-500">
                    Pending:{" "}
                    {countItemsByState(currentRound.procedures, "under_review")}
                  </p>
                  <p className="text-sm text-gray-500">
                    Total: {currentRound.procedures?.length || 0}
                  </p>
                </div>
              </div>
            </div>

            {/* Learning Activities */}
            <div className="border rounded-lg p-4">
              <h3 className="font-medium text-gray-700 mb-2">
                Learning Activities
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Self Learning:</span>
                  <span>
                    {countItemsByState(currentRound.selfLearning, "approved")}/
                    {currentRound.selfLearning?.length || 0}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Direct Learning:</span>
                  <span>
                    {countItemsByState(currentRound.directLearning, "approved")}
                    /{currentRound.directLearning?.length || 0}
                  </span>
                </div>
                <div className="pt-2">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-500"
                      style={{
                        width: `${Math.round(
                          ((countItemsByState(
                            currentRound.selfLearning,
                            "approved"
                          ) +
                            countItemsByState(
                              currentRound.directLearning,
                              "approved"
                            )) /
                            ((currentRound.selfLearning?.length || 0) +
                              (currentRound.directLearning?.length || 0))) *
                            100 || "0%"
                        )}`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* All Rounds Table */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          All Training Rounds
        </h2>
        <div className="h-96 w-full">
          <DataGrid
            rows={roundsRows}
            columns={roundsColumns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            components={{ Toolbar: GridToolbar }}
            disableSelectionOnClick
          />
        </div>
      </div>
    </div>
  );
};

export default Progress;
