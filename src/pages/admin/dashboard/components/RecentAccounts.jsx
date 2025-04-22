import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { IoCloseCircleSharp } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
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
          to={`/admin/interns/${cell.row._id}`}
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
    renderCell: (cell) => {
      return <span>{_.startCase(cell.value)}</span>;
    },
  },
  { field: "phone", headerName: "Phone", width: 120, flex: 1 },
  { field: "nationalId", headerName: "National ID", width: 120, flex: 1 },
  {
    field: "approved",
    headerName: "Approved",
    width: 120,
    renderCell: (cell) => {
      return (
        <p className="text-2xl flex justify-center items-center h-full">
          {cell.row.approved ? (
            <FaCheckCircle className="text-mediumGreen" />
          ) : (
            <IoCloseCircleSharp className="text-error" />
          )}
        </p>
      );
    },
  },
];
const rows = [
  {
    id: 1,
    fullname: "Mahmoud Samy Mohamed",
    hospital: "Al Hussein",
    phone: "01019798532",
    nationalId: "30005011404592",
    approved: true,
  },
  {
    id: 2,
    fullname: "Ibrahim Mohamed Shendy",
    hospital: "Sayed Galal",
    phone: "01019798532",
    nationalId: "30005011404592",
    approved: false,
  },
  {
    id: 3,
    fullname: "Mahmoud Gabr Helmy",
    hospital: "Sayed Galal",
    phone: "01019798532",
    nationalId: "30005011404592",
    approved: false,
  },
  {
    id: 4,
    fullname: "Mahmoud Gabr Helmy",
    hospital: "Sayed Galal",
    phone: "01019798532",
    nationalId: "30005011404592",
    approved: false,
  },
  {
    id: 5,
    fullname: "Mahmoud Gabr Helmy",
    hospital: "Sayed Galal",
    phone: "01019798532",
    nationalId: "30005011404592",
    approved: false,
  },
  {
    id: 6,
    fullname: "Mahmoud Gabr Helmy",
    hospital: "Sayed Galal",
    phone: "01019798532",
    nationalId: "30005011404592",
    approved: false,
  },
];

const RecentAccounts = () => {
  return (
    <div>
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

export default RecentAccounts;
