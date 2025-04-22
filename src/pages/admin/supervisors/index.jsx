import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { TbMoodCry } from "react-icons/tb";
import { FaCheckCircle, FaSearch } from "react-icons/fa";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import _ from "lodash";
import { useGetAllSupervisorsQuery } from "../../../services/api/adminApiSlice";
import Input from "../../auth/components/Input";

const columns = [
  {
    field: "firstname",
    headerName: "Firstname",
    width: 200,
    flex: 1,
    renderCell: (cell) => {
      return (
        <Link
          to={`/admin/supervisors/${cell.row._id}`}
          className="hover:text-mediumBlue"
        >
          {cell.value}
        </Link>
      );
    },
  },
  {
    field: "lastname",
    headerName: "Lastname",
    width: 200,
    flex: 1,
    renderCell: (cell) => {
      return (
        <Link
          to={`/admin/supervisors/${cell.row._id}`}
          className="hover:text-mediumBlue"
        >
          {cell.value}
        </Link>
      );
    },
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 140,
  },
  { field: "hospital", headerName: "Hospital", width: 120 },
  { field: "currentRound", headerName: "Current Round", width: 120 },
  {
    field: "approved",
    headerName: "Approved",
    width: 90,
    renderCell: ({ row: { approved } }) => {
      return (
        <div
          className="flex items-center justify-center gap-3 text-mediumGray h-full"
          onClick={() => {}}
        >
          {approved ? (
            <FaCheckCircle
              className="text-xl text-emeraldGreen"
              title="approved"
            />
          ) : (
            <FaCheckCircle className="text-xl" title="not approved" />
          )}
        </div>
      );
    },
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

const Supervisors = () => {
  const {
    user: { id },
  } = useSelector((state) => state.auth);

  const { data, isLoading } = useGetAllSupervisorsQuery({ skip: !id });

  console.log("data", data);

  let supervisors = data?.supervisors?.map((supervisor) => {
    return {
      ...supervisor,
      id: supervisor._id,
      hospital: _.startCase(supervisor.hospital),
    };
  });

  return (
    <>
      {supervisors?.length > 0 && !isLoading ? (
        <div className="shadow-md p-10">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl text-mediumGray">Supervisors</h2>
            <div className="relative w-2/3">
              <Input
                placeholder="search"
                type="search"
                customStyle="indent-8"
              />
              <p className="absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer text-lg text-mediumGray/80">
                <FaSearch />
              </p>
            </div>
          </div>

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

export default Supervisors;
