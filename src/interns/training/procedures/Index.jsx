import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  FaCheckCircle,
  FaPlus,
  FaRegEdit,
  FaRegTrashAlt,
} from "react-icons/fa";
import EmptyData from "../components/EmptyData";
import SearchBar from "../../components/SearchBar";
import AddProcedure from "./add/Index";
import Button from "../../components/Button";
import { useGetAllProceduresQuery } from "../../../services/api/internApiSlice";

const columns = [
  { field: "round", headerName: "Round", minWidth: 150, flex: 1 },
  { field: "skill", headerName: "Skill", minWidth: 150, flex: 1 },
  { field: "date", headerName: "Date", minWidth: 120, flex: 1 },
  { field: "venue", headerName: "Venue", minWidth: 150, flex: 1 },
  { field: "hospitalRecord", headerName: "Hospital Record", width: 150 },
  {
    field: "performanceLevel",
    headerName: "Performance Level",
    width: 150,
  },
  {
    field: "accepted",
    headerName: "Accepted",
    width: 120,
    renderCell: (cell) => {
      return (
        <div className="h-full w-full flex items-center text-xl">
          {cell.value ? (
            <FaCheckCircle className="text-emeraldGreen" title="accepted" />
          ) : (
            <FaCheckCircle className="text-mistyMorning" title="not accepted" />
          )}
        </div>
      );
    },
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 90,
    renderCell: () => (
      <div className="flex items-center justify-center gap-3 text-mediumGray h-full">
        <FaRegEdit
          className="text-xl cursor-pointer"
          aria-label="Edit"
          title="Edit"
        />
        <FaRegTrashAlt
          className="text-xl cursor-pointer"
          aria-label="Delete"
          title="Delete"
        />
      </div>
    ),
  },
];

const Procedures = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { data: proceduresData } = useGetAllProceduresQuery();

  const procedures = proceduresData?.data?.map((c) => {
    return {
      ...c,
      id: c._id,
      round: c.round,
      date: new Date(c.date).toDateString(),
    };
  });

  const acceptedProcedures = procedures?.filter((acceptedProcedure) =>
    Boolean(acceptedProcedure.accepted)
  );

  const notAcceptedProcedures = procedures?.filter((notAcceptedProcedure) =>
    Boolean(!notAcceptedProcedure.accepted)
  );
  return (
    <>
      <AddProcedure open={open} handleClose={handleClose} />
      {procedures?.length > 0 ? (
        <div className="shadow-md p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-4xl text-secondary">Procedures</h2>
            <div className="">
              <Button
                handleClick={handleOpen}
                icon={<FaPlus />}
                label="Add Procedure"
              />
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 flex items-center justify-between gap-4 mt-4 mb-8">
            {/* Search bar */}
            <div className="w-2/4">
              <SearchBar placeholder="Search procedures..." />
            </div>
            {/* Filters */}
            <div className="w-1/3">
              <p>Filters</p>
            </div>
          </div>

          {/* Procedures Statistics */}
          <div className="mb-4 flex flex-col items-center gap-10 text-primary font-medium text-lg bg-white shadow-md rounded-lg p-6">
            <div className="flex items-start gap-10 border-b-1 border-silverFrost/40 w-full pb-4">
              <h3>
                Total:{" "}
                <span className="font-semibold text-secondary">
                  {procedures?.length}
                </span>{" "}
                procedures
              </h3>
              <h3>
                Accepted:{" "}
                <span className="font-semibold text-emeraldGreen">
                  {" "}
                  {acceptedProcedures?.length}
                </span>{" "}
                procedures
              </h3>
              <h3>
                Not accepted:{" "}
                <span className="font-semibold text-darkRed">
                  {" "}
                  {notAcceptedProcedures?.length}
                </span>{" "}
                procedures
              </h3>
            </div>
            <div className="grid grid-cols-6 w-full">
              <div className="!w-full col-span-full">
                <DataGrid
                  rows={procedures}
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
        <EmptyData />
      )}
    </>
  );
};

export default Procedures;
