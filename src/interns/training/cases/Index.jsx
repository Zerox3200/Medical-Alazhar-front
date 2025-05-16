import React, { useState } from "react";
import Button from "../../components/Button";
import { DataGrid } from "@mui/x-data-grid";
import {
  FaCheckCircle,
  FaPlus,
  FaRegEdit,
  FaRegTrashAlt,
} from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";
import { HiOutlineDocumentSearch } from "react-icons/hi";
import SearchBar from "../../components/SearchBar";
import EmptyData from "../components/EmptyData";
import AddCase from "./add/Index";
import { useGetAllCasesQuery } from "../../../services/api/internApiSlice";
import _ from "lodash";

const columns = [
  { field: "round", headerName: "Round", minWidth: 150, flex: 1 },
  {
    field: "patientSerial",
    headerName: "Patient serial",
    minWidth: 150,
    flex: 1,
  },
  { field: "caseType", headerName: "Case Type", minWidth: 300, flex: 1 },
  { field: "date", headerName: "Date", minWidth: 120, flex: 1 },
  { field: "epas", headerName: "EPA", width: 90 },
  {
    field: "expectedLevel",
    headerName: "Expected Level",
    width: 120,
  },
  {
    field: "caseState",
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

const CasesSummary = () => {
  const { data: casesData } = useGetAllCasesQuery();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const cases = casesData?.data?.map((c) => {
    return {
      ...c,
      id: c._id,
      round: c.round,
      date: new Date(c.date).toDateString(),
    };
  });

  const acceptedCases = cases?.filter(
    ({ caseState }) => caseState === "accepted"
  );

  const rejectedCases = cases?.filter(
    ({ caseState }) => caseState === "rejected"
  );

  const underReviewCases = cases?.filter(
    ({ caseState }) => caseState === "under_review"
  );

  return (
    <>
      <AddCase open={open} handleClose={handleClose} />
      {cases?.length > 0 ? (
        <div className="shadow-md p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-4xl text-secondary">Cases</h2>
            <div className="">
              <Button
                handleClick={handleOpen}
                icon={<FaPlus />}
                label="Add Case"
              />
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 flex items-center justify-between gap-4 mt-4 mb-8">
            {/* Search bar */}
            <div className="w-2/4">
              <SearchBar placeholder="Search cases..." />
            </div>
            {/* Filters */}
            <div className="w-1/3">
              <p>Filters</p>
            </div>
          </div>

          {/* Cases Statistics */}
          <div className="mb-4 flex flex-col items-center gap-10 text-primary font-medium text-lg bg-white shadow-md rounded-lg p-6">
            <div className="flex items-start gap-10 border-b-1 border-silverFrost/40 w-full pb-4">
              <h3>
                Total:{" "}
                <span className="font-semibold text-secondary">
                  {cases?.length}
                </span>{" "}
                cases
              </h3>
              <h3>
                Accepted:{" "}
                <span className="font-semibold text-emeraldGreen">
                  {acceptedCases?.length}
                </span>{" "}
                cases
              </h3>
              <h3>
                Under Review:{" "}
                <span className="font-semibold text-mediumBlue">
                  {underReviewCases?.length}
                </span>{" "}
                cases
              </h3>
              <h3>
                Rejected:{" "}
                <span className="font-semibold text-darkRed">
                  {rejectedCases?.length}
                </span>{" "}
                cases
              </h3>
            </div>
            <div className="grid grid-cols-6 w-full">
              <div className="!w-full col-span-full">
                <DataGrid
                  rows={cases}
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

export default CasesSummary;
