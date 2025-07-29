import React from "react";
import _ from "lodash";
import { DataGrid } from "@mui/x-data-grid";
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
          {_.startCase(cell.value)}
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
    width: 120,
  },

  {
    field: "hospital",
    headerName: "Hospital",
    width: 120,
    renderCell: (cell) => <span>{_.startCase(cell.value)}</span>,
  },
];

const RoundBox = ({ data }) => {
  const round = data?.round.map((roundData) => {
    return {
      ...roundData,
      id: roundData._id,
    };
  });

  return (
    <div className="col-span-full bg-flashWhite p-4 rounded-md shadow-md">
      <DataGrid
        rows={round}
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

export default RoundBox;
