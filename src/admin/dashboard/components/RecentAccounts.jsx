import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { ToastContainer, toast } from "react-toastify";
import { FaCheckCircle } from "react-icons/fa";
import {
  useApproveAccountMutation,
  useGetNotApprovedUsersQuery,
} from "../../../services/api/adminApiSlice";

const getColumns = (handleAction) => [
  {
    field: "fullname",
    headerName: "Fullname",
    width: 200,
    flex: 1,
    renderCell: () => {
      // return (
      //   <Link
      //     to={`/admin/interns/${cell.row._id}`}
      //     className="hover:text-mediumBlue"
      //   >
      //     {cell.value}
      //   </Link>
      // );
    },
  },
  {
    field: "hospital",
    headerName: "Hospital",
    width: 120,
    renderCell: (cell) => {
      return <span>{cell.value}</span>;
    },
  },
  { field: "phone", headerName: "Phone", width: 120, flex: 1 },
  { field: "idOrPassport", headerName: "ID / Passport", width: 120, flex: 1 },
  { field: "role", headerName: "Role", width: 120, flex: 1 },
  {
    field: "approve",
    headerName: "Approve",
    width: 120,
    renderCell: ({ row }) => {
      return (
        <button
          className="text-xl flex items-center h-full cursor-pointer"
          title="approve"
          onClick={() => handleAction(row.id)}
        >
          <FaCheckCircle className="text-silverFrost" />
        </button>
      );
    },
  },
];

const RecentAccounts = () => {
  const { data } = useGetNotApprovedUsersQuery();

  const users = data?.users.map((user) => ({
    ...user,
    id: user._id,
    idOrPassport: user.idOrPassport?.number,
  }));

  const [approveAccount, status] = useApproveAccountMutation();

  const handleAction = async (rowId) => {
    await approveAccount({
      userId: rowId,
      approved: true,
    }).unwrap();
  };

  const columns = getColumns(handleAction);

  useEffect(() => {
    if (status.isSuccess) {
      toast.success("Account approved");
    }

    if (status.isError) {
      toast.error("Account not approved");
    }
  }, [status.isError, status.isSuccess]);

  return (
    <div>
      <ToastContainer position="top-center" />
      <DataGrid
        rows={users}
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
