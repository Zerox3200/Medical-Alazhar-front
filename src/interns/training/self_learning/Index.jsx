import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { FaCheckCircle, FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import EmptyData from "../components/EmptyData";
import toast, { Toaster } from "react-hot-toast";
import { LinearProgress } from "@mui/material";
import {
  useDeleteSelfLearningMutation,
  useSelfLearnings,
} from "../../../services/intern/api/hooks/selfLearningHooks";
import _ from "lodash";
import { IoCloseCircle } from "react-icons/io5";
import { HiOutlineDocumentSearch } from "react-icons/hi";
import { Link } from "react-router";
import ConfirmDeleteMessage from "../components/ConfirmDeleteMessage";
import SearchAndFilters from "../components/SearchAndFilters";

const SelfLearning = () => {
  // Filtering states
  const [chipValue, setChipValue] = useState(null);
  const [dateFrom, setDateFrom] = useState(new Date("2024-03-01"));
  const [dateTo, setDateTo] = useState(new Date());
  const [searchValue, setSearchValue] = useState("");

  const [openWarningAlert, setOpenWarningAlert] = useState(false);
  const [activityId, setActivityId] = useState(null);
  const { selfLearnings, isError, isLoading } = useSelfLearnings({
    filters: {
      state: _.snakeCase(chipValue),
      dateFrom: dateFrom?.toISOString(),
      dateTo: dateTo?.toISOString(),
      searchTerm: _.snakeCase(searchValue),
    },
  });

  const [deleteSelfLearning] = useDeleteSelfLearningMutation();

  const handleDeleteSelfLearning = async () => {
    try {
      const response = await deleteSelfLearning({ activityId }).unwrap();
      if (response?.code === 200) {
        toast.success(response?.message);
      }
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  const columns = [
    {
      field: "learnedActivity",
      headerName: "Activity",
      minWidth: 150,
      flex: 1,
      renderCell: (cell) => <p>{_.startCase(cell.value)}</p>,
    },
    { field: "activityTitle", headerName: "Title", minWidth: 150, flex: 1 },
    { field: "date", headerName: "Date", minWidth: 120, flex: 1 },
    {
      field: "selfLearningActivityEvidence",
      headerName: "Evidence",
      minWidth: 150,
      flex: 1,
      renderCell: (cell) => {
        return (
          <p className="h-full flex justify-start items-center">
            <img
              src={"http://localhost:3000/" + cell.value}
              className="w-10 h-10  "
            />
          </p>
        );
      },
    },
    {
      field: "state",
      headerName: "State",
      width: 120,
      renderCell: (cell) => {
        return (
          <div className="h-full w-full flex items-center text-xl">
            {cell.value === "accepted" && (
              <FaCheckCircle className="text-emeraldGreen" title={cell.value} />
            )}
            {cell.value === "rejected" && (
              <IoCloseCircle className="text-error" title={cell.value} />
            )}
            {cell.value === "under_review" && (
              <HiOutlineDocumentSearch
                className="text-mistyMorning"
                title={_.startCase(cell.value)}
              />
            )}
          </div>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 90,
      renderCell: (cell) => (
        <div className="flex items-center justify-center gap-3 text-mediumGray h-full">
          <Link to={`/training/self-learning-activities/${cell.row._id}`}>
            <FaRegEdit
              className="text-xl cursor-pointer hover:text-hotPink"
              aria-label="Edit"
              title="Edit"
            />
          </Link>
          <FaRegTrashAlt
            className="text-xl cursor-pointer hover:text-error"
            aria-label="Delete"
            title="Delete"
            onClick={() => {
              setActivityId(cell.row._id);
              setOpenWarningAlert(true);
            }}
          />
        </div>
      ),
    },
  ];

  const activities = selfLearnings?.data?.map((activity) => {
    return {
      ...activity,
      id: activity._id,
      date: new Date(activity.date).toISOString().split("T")[0],
    };
  });

  const acceptedActivities = activities?.filter(
    ({ state }) => state === "accepted"
  );

  const rejectedActivities = activities?.filter(
    ({ state }) => state === "rejected"
  );

  const underReviewActivities = activities?.filter(
    ({ state }) => state === "under_review"
  );

  return (
    <>
      <ConfirmDeleteMessage
        deletedObject="Activity"
        handleDeleteObject={handleDeleteSelfLearning}
        openWarningAlert={openWarningAlert}
        handleClose={() => setOpenWarningAlert(false)}
      />
      <Toaster />
      <div>
        <div className="flex justify-between items-center">
          <h2 className="text-4xl text-secondary">Self Learning Activities</h2>
          <div className="">
            <Link
              to="/training/self-learning-activities/add"
              className="p-3 rounded-lg bg-mediumBlue hover:bg-lightBlue text-white"
            >
              Add Self Learning Activity
            </Link>
          </div>
        </div>
        {/* Search and Filters */}
        <SearchAndFilters
          placeholder="Search by round name or skill"
          dateFromValue={dateFrom}
          handleDateFrom={setDateFrom}
          dateToValue={dateTo}
          handleDateTo={setDateTo}
          chipValue={chipValue}
          setChipValue={setChipValue}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
        {/* Self learned Statistics */}
        <div className="mb-4 flex flex-col items-center gap-10 text-primary font-medium text-lg bg-white shadow-md rounded-lg p-6">
          <div className="flex items-start gap-10 border-b-1 border-silverFrost/40 w-full pb-4">
            <h3>
              Total:{" "}
              <span className="font-semibold text-secondary">
                {activities?.length}
              </span>{" "}
              activities
            </h3>
            <h3>
              Accepted:{" "}
              <span className="font-semibold text-emeraldGreen">
                {acceptedActivities?.length}
              </span>{" "}
              activities
            </h3>
            <h3>
              Under Review:{" "}
              <span className="font-semibold text-mediumBlue">
                {underReviewActivities?.length}
              </span>{" "}
              activities
            </h3>
            <h3>
              Rejected:{" "}
              <span className="font-semibold text-darkRed">
                {rejectedActivities?.length}
              </span>{" "}
              activities
            </h3>
          </div>
          <div className="grid grid-cols-6 w-full">
            <div className="!w-full col-span-full">
              <DataGrid
                rows={activities}
                columns={columns}
                disableColumnMenu
                disableColumnSorting
                disableRowSelectionOnClick
                disableColumnResize
                initialState={{
                  pagination: {
                    paginationModel: { pageSize: 5, page: 0 },
                  },
                }}
                sx={{
                  backgroundColor: "#f5f5f5",
                  "& .MuiDataGrid-columnHeader": {
                    backgroundColor: "#fff",
                    color: "#1a2d42",
                  },
                  "& .MuiDataGrid-cell:focus": {
                    outline: "none",
                  },
                  "& .MuiDataGrid-columnHeader:focus": {
                    outline: "none",
                  },
                }}
                loading={isLoading}
                error={isError}
                slots={{
                  loadingOverlay: LinearProgress,
                  noRowsOverlay: EmptyData,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelfLearning;
