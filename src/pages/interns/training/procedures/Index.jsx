import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import EmptyData from "../components/EmptyData";
import SearchBar from "../components/SearchBar";
import AddProcedure from "./add/Index";

const columns = [
  { field: "round", headerName: "Round", minWidth: 150, flex: 1 },
  { field: "procedure", headerName: "Procedure", minWidth: 150, flex: 1 },
  { field: "date", headerName: "Date", minWidth: 120, flex: 1 },
  { field: "venue", headerName: "Venue", minWidth: 150, flex: 1 },
  { field: "hospitalRecord", headerName: "Hospital Record", width: 150 },
  {
    field: "performanceLevel",
    headerName: "Performance Level",
    width: 150,
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

let rows = [
  {
    id: 1,
    round: "General Surgery",
    patientSerial: 355212,
    caseType: "Swellings and inguino-scrotal swellings",
    date: "01/04/2024",
    epa: "EPA 16",
    expectedLevel: "A",
  },
  {
    id: 3,
    round: "Obs & Gyn",
    patientSerial: 454465,
    caseType: "Swellings and inguino-scrotal swellings",
    date: "12/10/2024",
    epa: "EPA 6",
    expectedLevel: "C",
  },
  {
    id: 2,
    round: "General Surgery",
    patientSerial: 424555,
    caseType: "Ischemic Limb",
    date: "15/06/2024",
    epa: "EPA 11",
    expectedLevel: "B",
  },
  {
    id: 4,
    round: "Medicine",
    patientSerial: 169824,
    caseType: "Varicose Veins",
    date: "17/03/2024",
    epa: "EPA 20",
    expectedLevel: "A",
  },
  {
    id: 6,
    round: "Urology",
    patientSerial: 150515,
    caseType: "Anal Disorders",
    date: "01/04/2024",
    epa: "EPA 1",
    expectedLevel: "A",
  },
  {
    id: 7,
    round: "Neurology",
    patientSerial: 445421,
    caseType: "Breast Masses",
    date: "01/04/2024",
    epa: "EPA 5",
    expectedLevel: "C",
  },
  {
    id: 8,
    round: "Radiology",
    patientSerial: 312545,
    caseType:
      "Common infections (e.g., peri-anal infection, breast infection, hand infection, face infection, erysipelas)",
    date: "01/04/2024",
    epa: "EPA 14",
    expectedLevel: "C",
  },
  {
    id: 9,
    round: "Cardiology",
    patientSerial: 215435,
    caseType: "Common neck swellings (thyroid, lymph nodes)s",
    date: "01/04/2024",
    epa: "EPA 17",
    expectedLevel: "B",
  },
];

const Procedures = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <AddProcedure open={open} handleClose={handleClose} />
      {rows.length > 0 ? (
        <div className="shadow-md p-10">
          <h2 className="col-span-1 text-4xl text-mediumGray">Procedures</h2>
          <div className="grid grid-cols-4 gap-10 items-center mt-4 mb-8">
            {/* Search bar */}
            <div className="col-span-3">
              <SearchBar />
            </div>
            <div className="col-span-1">
              <h2
                onClick={handleOpen}
                className="w-fit ml-auto border-1 border-deepBlue text-lg rounded-sm text-deepBlue hover:bg-deepBlue hover:text-crispWhite  cursor-pointer py-2 px-4"
              >
                Add Procedure
              </h2>
            </div>
          </div>

          {/* Procedures Statistics */}
          <div className="mb-4 flex items-center gap-10">
            <h3>
              Total: <span className="font-semibold text-mediumGray">45</span>{" "}
              procedures
            </h3>
            <h3>
              Accepted:{" "}
              <span className="font-semibold text-emeraldGreen">15</span>{" "}
              procedures
            </h3>
            <h3>
              Not accepted: <span className="font-semibold text-error">30</span>{" "}
              procedures
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
                checkboxSelection
                sx={{
                  backgroundColor: "#f5f5f5",
                  "& .MuiDataGrid-columnHeader": {
                    backgroundColor: "#2d9c9c",
                    color: "#fff",
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
      ) : (
        <EmptyData />
      )}
    </>
  );
};

export default Procedures;
