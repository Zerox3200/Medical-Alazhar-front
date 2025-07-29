import React, { useState } from "react";
import _ from "lodash";
import { Link, useParams } from "react-router";
import { useGetRoundQuery } from "../../../services/admin/api/hooks/roundHooks";
import { Chip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  {
    field: "fullname",
    headerName: "Fullname",
    width: 200,
    flex: 1,
    renderCell: (cell) => {
      return (
        <Link
          to={`/supervisors/${cell.row._id}`}
          className="hover:text-mediumBlue"
        >
          {cell.value}
        </Link>
      );
    },
  },
  {
    field: "hospital",
    headerName: "Hospital",
    width: 120,
    flex: 1,
    renderCell: (cell) => {
      return <span>{_.startCase(cell.value)}</span>;
    },
  },
  { field: "phone", headerName: "Phone", width: 120, flex: 1 },
  {
    field: "speciality",
    headerName: "Speciality",
    width: 120,
    flex: 1,
    renderCell: (cell) => {
      return <span>{_.startCase(cell.value)}</span>;
    },
  },
  {
    field: "role",
    headerName: "Role",
    width: 120,
    flex: 1,
    renderCell: (cell) => {
      return <span>{_.capitalize(cell.value)}</span>;
    },
  },
];

const RoundDataBox = ({ label, data, customPStyle }) => {
  return (
    <p
      className={`col-span-1 border-r-1 border-cloudVeil p-6 flex flex-col justify-center items-center text-lg ${customPStyle}`}
    >
      <span className="text-primary/60">{label}</span>
      <span className="text-xl font-semibold text-secondary">{data}</span>
    </p>
  );
};

const Round = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const { roundId } = useParams();
  const { data, isLoading, isError } = useGetRoundQuery({ roundId });

  const roundData = data?.round?.[0] || {};

  const { coordinator, supervisors = [] } = roundData;
  let members = [];
  switch (tabIndex) {
    case 0:
      members = coordinator ? [{ ...coordinator, id: coordinator._id }] : [];
      break;
    case 1:
      members = supervisors.map((member) => ({ ...member, id: member._id }));
      break;
    case 2:
      members = roundData?.waves
        ?.flatMap((wave) => wave.interns)
        ?.map((member) => ({ ...member, id: member._id }));
      break;
    default:
      members = [];
  }

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading round data</div>;

  return (
    <div>
      <div className="p-6">
        <div className="shadow-md rounded-md bg-white border-1 border-cloudVeil">
          <div className="flex items-center gap-6 p-4 border-b-1 border-cloudVeil ">
            <h1 className="text-2xl font-medium text-secondary">
              {_.startCase(roundData?.name)}
            </h1>
          </div>
          <div className="grid grid-cols-5">
            <RoundDataBox
              label="Duration"
              data={
                roundData?.duration === 1
                  ? roundData?.duration + " Month"
                  : roundData?.duration + " Months"
              }
            />
            <RoundDataBox
              label="Year Level"
              data={roundData?.numericYear === 1 ? "MI-1" : "MI-2"}
            />
            <RoundDataBox label="Waves" data={roundData?.waves?.length} />
          </div>
        </div>
      </div>
      <ul className="flex gap- p-6 bg-white border-t-1 border-b-1 border-cloudVeil">
        {["Coordinator", "Supervisors", "Interns"].map((link, i) => {
          return (
            <li
              className={`${
                tabIndex === i ? "bg-cloudVeil/60 text-pink" : ""
              } p-2 cursor-pointer`}
              key={i}
              onClick={() => setTabIndex(i)}
            >
              {link}
            </li>
          );
        })}
      </ul>
      {/* Round team */}

      <div className="col-span-full bg-flashWhite rounded-md shadow-md p-6">
        <DataGrid
          rows={members}
          columns={columns}
          disableColumnMenu
          disableColumnSorting
          disableRowSelectionOnClick
          disableColumnResize
          checkboxSelection
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5, page: 0 },
            },
          }}
          pageSizeOptions={[5]}
          sx={{
            height: 380,
            backgroundColor: "#f5f5f5",
            "& .MuiDataGrid-columnHeader": {
              backgroundColor: "#fff",
              color: "#2e4156",
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
  );
};

export default Round;
