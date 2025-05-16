import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { FaPlus, FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import EmptyData from "../components/EmptyData";
import SearchWithFilters from "../../components/SearchWithFilters";
import Button from "../../components/Button";
import SearchBar from "../../components/SearchBar";
// import AddProcedure from "./add/Index";

const columns = [
  { field: "activity", headerName: "Activity", minWidth: 150, flex: 1 },
  { field: "title", headerName: "Title", minWidth: 150, flex: 1 },
  { field: "date", headerName: "Date", minWidth: 120, flex: 1 },
  { field: "evidence", headerName: "Evidence", minWidth: 150, flex: 1 },
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

let rows = [];
const SelfLearning = () => {
  return (
    <>
      {/* <AddProcedure open={open} handleClose={handleClose} /> */}
      {rows.length > 0 ? (
        <div className="shadow-md p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-4xl text-secondary">Self Learned Activity</h2>
            <div className="">
              <Button
                // handleClick={handleOpen}
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
                Total: <span className="font-semibold text-secondary">43</span>{" "}
                activities
              </h3>
              <h3>
                Accepted:{" "}
                <span className="font-semibold text-emeraldGreen">24</span>{" "}
                activities
              </h3>
              <h3>
                Under Review:{" "}
                <span className="font-semibold text-mediumBlue">15</span>{" "}
                activities
              </h3>
              <h3>
                Rejected: <span className="font-semibold text-darkRed">18</span>{" "}
                activities
              </h3>
            </div>
            <div className="grid grid-cols-6 w-full">
              <div className="!w-full col-span-full">
                <DataGrid
                  rows={rows}
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

export default SelfLearning;
