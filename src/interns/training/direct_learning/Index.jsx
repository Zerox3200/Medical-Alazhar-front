import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  FaCheckCircle,
  FaPlus,
  FaRegEdit,
  FaRegTrashAlt,
} from "react-icons/fa";
import EmptyData from "../components/EmptyData";
import SearchWithFilters from "../../components/SearchWithFilters";
import Button from "../../components/Button";
import SearchBar from "../../components/SearchBar";
import AddActivity from "./add/Index";
import { useGetAllDirectLearningActivitiesQuery } from "../../../services/api/internApiSlice";
import _ from "lodash";
import { IoCloseCircle } from "react-icons/io5";
import { HiOutlineDocumentSearch } from "react-icons/hi";
import { Link } from "react-router";

const columns = [
  { field: "learnedActivity", headerName: "Activity", minWidth: 150, flex: 1 },
  { field: "activityTitle", headerName: "Title", minWidth: 150, flex: 1 },
  { field: "date", headerName: "Date", minWidth: 120, flex: 1 },
  { field: "evidence", headerName: "Evidence", minWidth: 150, flex: 1 },
  {
    field: "activityState",
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
            // setProcedureId(cell.row._id);
            // setOpenWarningAlert(true);
          }}
        />
      </div>
    ),
  },
];

const DirectLearning = () => {
  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { data: activityData } = useGetAllDirectLearningActivitiesQuery();

  const activities = activityData?.data?.map((activity) => {
    return { ...activity, id: activity._id };
  });

  const acceptedActivities = activities?.filter(
    ({ activityState }) => activityState === "accepted"
  );

  const rejectedActivities = activities?.filter(
    ({ activityState }) => activityState === "rejected"
  );

  const underReviewActivities = activities?.filter(
    ({ activityState }) => activityState === "under_review"
  );

  return (
    <>
      <AddActivity open={open} handleClose={handleClose} />
      {activityData?.data.length > 0 ? (
        <div className="shadow-md p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-4xl text-secondary">Direct Learned Activity</h2>
            <div className="">
              <Button
                handleClick={handleOpen}
                icon={<FaPlus />}
                label="Add Activity"
              />
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 gap-4 mt-4 mb-8">
            {/* Search bar */}
            <SearchWithFilters placeholder="Search cases..." />
          </div>

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
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <EmptyData setOpen={setOpen} />
      )}
    </>
  );
};

export default DirectLearning;
