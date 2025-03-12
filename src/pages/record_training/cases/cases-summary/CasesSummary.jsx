import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { TbMoodCry } from "react-icons/tb";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { Link } from "react-router";

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
  { field: "epa", headerName: "EPA", width: 90 },
  {
    field: "expectedLevel",
    headerName: "Expected Level",
    width: 120,
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

// This Component is rendered when there are no cases
const EmptyData = () => {
  return (
    <div className="flex justify-center items-center flex-col relative translate-y-52">
      <p className="text-emeraldGreen text-5xl">
        <TbMoodCry />
      </p>
      <h3 className="text-4xl text-emeraldGreen font-semibold flex items-end">
        No cases to show
      </h3>
      <div className="mt-6">
        <Link
          to="/record_training/cases/add-case"
          className="bg-emeraldGreen text-lg rounded-sm text-crispWhite cursor-pointer py-1 px-4"
        >
          New Case
        </Link>
      </div>
    </div>
  );
};

const CasesSummary = () => {
  return (
    <>
      {rows.length > 0 ? (
        <div className="shadow-md p-10">
          <div className="flex justify-between items-center">
            <h2 className="text-4xl mb-8 text-mediumGray">All Cases</h2>
            <div>
              <Link
                to="/record_training/cases/add-case"
                className="bg-deepBlue text-lg rounded-sm text-crispWhite cursor-pointer py-2 px-4"
              >
                Add Case
              </Link>
            </div>
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

export default CasesSummary;
