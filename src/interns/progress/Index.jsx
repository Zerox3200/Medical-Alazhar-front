import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useSelector } from "react-redux";
import { useIntern } from "../../services/intern/api/hooks/authHooks";
import _ from "lodash";
import CurrentRoundProgress from "./CurrentRoundProgress";
import ProgressHeader from "./ProgressHeader";
import TrainingSummary from "./TrainingSummary";

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
        item.caseState === "accepted" ||
        item.procedureState === "accepted" ||
        item.activityState === "accepted"
    ).length;
    return Math.round((completed / items.length) * 100);
  };

  const countItemsByState = (items, state) => {
    return items.filter(
      (item) =>
        item.caseState === state ||
        item.procedureState === state ||
        item.activityState === state
    ).length;
  };

  // Current round data
  const currentRound = internData?.intern?.trainingProgress.find(
    (round) =>
      round.roundId._id === internData?.intern?.currentRound.roundId._id
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
        <div className="w-full h-full flex justify-start items-center">
          <div className="w-8 h-8r">
            <CircularProgressbar
              value={params.row.completionPercentage}
              text={`${params.row.completionPercentage}%`}
              styles={buildStyles({
                textSize: "32px",
                pathColor:
                  params.row.completionPercentage === 100
                    ? "#10B981"
                    : "#3B82F6",
                textColor: "#374151",
              })}
            />
          </div>
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
    <div className="p-6 bg-flashWhite min-h-screen">
      {/* Header */}
      <ProgressHeader internData={internData} />
      {/* Current round progress */}
      <CurrentRoundProgress
        currentRound={currentRound}
        countItemsByState={countItemsByState}
        calculateCompletionPercentage={calculateCompletionPercentage}
      />

      {/* All Training Summary */}
      <TrainingSummary
        internData={internData}
        countItemsByState={countItemsByState}
      />

      {/* All Rounds Table */}
      <div className="bg-white p-6 rounded-md shadow">
        <h2 className="text-xl font-semibold mb-4 text-primary/60">
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
