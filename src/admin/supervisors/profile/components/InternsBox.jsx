import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { Link } from "react-router";

const columns = [
  {
    field: "fullname",
    headerName: "Fullname",
    width: 200,
    flex: 1,
    renderCell: (cell) => {
      return (
        <Link to={`/interns/${cell.row._id}`} className="hover:text-mediumBlue">
          {cell.value}
        </Link>
      );
    },
  },
  { field: "facultyIDNumber", headerName: "ID Number", width: 120, flex: 1 },
  { field: "hospital", headerName: "Hospital", width: 120, flex: 1 },
  { field: "phone", headerName: "Phone", width: 120, flex: 1 },
  { field: "nationality", headerName: "Nationality", width: 120, flex: 1 },
  { field: "role", headerName: "Role", width: 120, flex: 1 },
];
const InternsBox = ({ data }) => {
  const interns = data?.round.flatMap((roundData) =>
    roundData.interns.map((s) => ({ ...s, id: s._id }))
  );

  return (
    <div className="col-span-full bg-flashWhite p-4 rounded-md shadow-md">
      <DataGrid
        rows={interns}
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

export default InternsBox;
