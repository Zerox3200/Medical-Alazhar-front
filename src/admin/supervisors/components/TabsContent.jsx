import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { TbMoodCry } from "react-icons/tb";
import { Link } from "react-router";
import _ from "lodash";
import { useAdminSupervisors } from "../../../services/admin/api/hooks/supervisorHooks";

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
          {cell.value.split(" ").splice(1, 3).join(" ")}
        </Link>
      );
    },
  },

  {
    field: "role",
    headerName: "Role",
    width: 140,
    flex: 1,
  },
  {
    field: "speciality",
    headerName: "Speciality",
    width: 140,
    flex: 1,
    renderCell: (cell) => <span>{_.startCase(cell.value)}</span>,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 140,
    flex: 1,
  },
  {
    field: "hospital",
    headerName: "Hospital",
    width: 120,
    flex: 1,
    renderCell: (cell) => <span>{_.startCase(cell.value)}</span>,
  },
  { field: "round", headerName: "Round", width: 120, flex: 1 },
];

// This Component is rendered when there are no cases
const EmptyData = () => {
  return (
    <div className="flex justify-center items-center flex-col relative translate-y-2/3">
      <p className="text-emeraldGreen text-5xl">
        <TbMoodCry />
      </p>
      <h3 className="text-4xl text-emeraldGreen font-semibold flex items-end">
        No supervisors
      </h3>
    </div>
  );
};
const TabsContent = ({ userType }) => {
  const { adminSupervisors, isLoading } = useAdminSupervisors({
    role: userType === "all" ? undefined : userType.slice(0, -1),
  });

  let supervisors = adminSupervisors?.supervisors?.map((supervisor) => {
    return {
      ...supervisor,
      id: supervisor._id,
    };
  });

  return (
    <div className="px-6">
      {supervisors?.length > 0 && !isLoading ? (
        <div>
          <div className="grid grid-cols-6 w-full">
            <div className="!w-full col-span-full">
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
          </div>
        </div>
      ) : (
        <EmptyData />
      )}
    </div>
  );
};

export default TabsContent;
