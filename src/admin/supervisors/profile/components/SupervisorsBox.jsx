import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { Link } from "react-router";
import _ from "lodash";

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
  { field: "hospital", headerName: "Hospital", width: 120, flex: 1 },
  { field: "phone", headerName: "Phone", width: 120, flex: 1 },
  {
    field: "speciality",
    headerName: "Speciality",
    width: 120,
    flex: 1,
    renderCell: (cell) => {
      return <span t>{_.startCase(cell.value)}</span>;
    },
  },
  { field: "role", headerName: "Role", width: 120, flex: 1 },
  //   { field: "coordinator", headerName: "Coordinator", width: 120, flex: 1 },
  //   { field: "interns", headerName: "Interns", width: 120, flex: 1 },
];
const SupervisorsBox = ({ data }) => {
  const supervisors = data?.round.flatMap((roundData) =>
    roundData.supervisors.map((s) => ({ ...s, id: s._id }))
  );

  return (
    <div className="col-span-full bg-flashWhite p-4 rounded-md shadow-md">
      <DataGrid
        rows={supervisors}
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

export default SupervisorsBox;
