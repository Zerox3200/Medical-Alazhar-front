import React from "react";
import { useRounds } from "../../../services/admin/api/hooks/roundHooks";
import { DataGrid } from "@mui/x-data-grid";
import _ from "lodash";
import { Link } from "react-router";

const columns = [
  {
    field: "name",
    headerName: "Name",
    width: 200,
    flex: 1,
    renderCell: (cell) => {
      return (
        <Link to={`/rounds/${cell.row._id}`} className="hover:text-mediumBlue">
          {cell.value}
        </Link>
      );
    },
  },

  {
    field: "duration",
    headerName: "Duartion",
    width: 120,
    renderCell: (cell) => {
      return (
        <span>
          {+cell.value > 1 ? cell.value + " Months" : cell.value + " Month"}
        </span>
      );
    },
  },
  {
    field: "numericYear",
    headerName: "Year level",
    width: 90,
  },
  {
    field: "order",
    headerName: "Order",
    width: 90,
  },
  { field: "hospital", headerName: "Hospital", width: 120 },
  { field: "startDate", headerName: "Start date", width: 150 },
  { field: "endDate", headerName: "End date", width: 150 },
  {
    field: "state",
    headerName: "State",
    width: 120,
    renderCell: (cell) => {
      return (
        <div className="text-center">
          <span
            className={`${
              cell.value === "Completed"
                ? "bg-emeraldGreen/40 text-mediumGreen"
                : "bg-lightBlue/40 text-mediumBlue"
            }  p-2 rounded-xl`}
          >
            <span className="mr-2"> {cell.value}</span>
            <span
              className={`${
                cell.value === "Completed"
                  ? "bg-emeraldGreen"
                  : " bg-mediumBlue"
              } rounded-full w-3 h-3 inline-block`}
            ></span>
          </span>
        </div>
      );
    },
  },
];

const RoundsData = ({
  stateValue,
  durationValue,
  hospitalValue,
  levelValue,
  inputValue,
}) => {
  const filters = {};
  if (stateValue?.value) filters.state = stateValue.value;
  if (durationValue?.value) filters.duration = durationValue.value;
  if (hospitalValue?.value) filters.hospital = _.startCase(hospitalValue.value);
  if (levelValue?.value) filters.numericYear = levelValue.value;
  if (inputValue) filters.name = inputValue;

  const { data } = useRounds(filters);

  const rounds = data?.rounds?.map((round) => {
    return {
      ...round,
      id: round._id,
      startDate: new Date(round.startDate).toDateString(),
      endDate: new Date(round.endDate).toDateString(),
    };
  });

  return (
    <div className="px-6">
      <DataGrid
        rows={rounds}
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
  );
};

export default RoundsData;
