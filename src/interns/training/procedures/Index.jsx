import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  FaCheckCircle,
  FaPlus,
  FaRegEdit,
  FaRegTrashAlt,
} from "react-icons/fa";
import EmptyData from "../components/EmptyData";
import AddProcedure from "./add/Index";
import Button from "../../components/Button";
import {
  useDeleteProcedureMutation,
  useGetAllProceduresQuery,
} from "../../../services/api/internApiSlice";
import _ from "lodash";
import { HiOutlineDocumentSearch } from "react-icons/hi";
import { IoCloseCircle } from "react-icons/io5";
import { Link } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import ConfirmDeleteMessage from "./procedure/ConfirmDeleteMessage";
import SearchAndFilters from "../components/SearchAndFilters";

const Procedures = () => {
  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(new Date());
  const { data: proceduresData } = useGetAllProceduresQuery();
  const [openWarningAlert, setOpenWarningAlert] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [procedureId, setProcedureId] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [deleteProcedure] = useDeleteProcedureMutation();

  const columns = [
    {
      field: "round",
      headerName: "Round",
      minWidth: 150,
      flex: 1,
      renderCell: (cell) => {
        return (
          <Link
            to={`/training/procedures/${cell.row._id}`}
            className="cursor-pointer"
          >
            {_.startCase(cell.value.name)}
          </Link>
        );
      },
    },
    {
      field: "skill",
      headerName: "Skill",
      minWidth: 150,
      flex: 1,
      renderCell: (cell) => {
        return <p>{_.startCase(cell.value)}</p>;
      },
    },
    { field: "date", headerName: "Date", minWidth: 120, flex: 1 },
    { field: "venue", headerName: "Venue", minWidth: 150, flex: 1 },
    { field: "hospitalRecord", headerName: "Hospital Record", width: 150 },
    {
      field: "performanceLevel",
      headerName: "Performance Level",
      width: 150,
    },
    {
      field: "procedureState",
      headerName: "State",
      width: 120,
      renderCell: (cell) => {
        return (
          <div className="h-full w-full flex items-center text-xl">
            {cell.value === "accepted" && (
              <FaCheckCircle className="text-emeraldGreen" title={cell.value} />
            )}
            {cell.value === "rejected" && (
              <IoCloseCircle className="text-error" title={cell.value} />
            )}
            {cell.value === "under_review" && (
              <HiOutlineDocumentSearch
                className="text-mistyMorning"
                title={_.startCase(cell.value)}
              />
            )}
          </div>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 90,
      renderCell: (cell) => (
        <div className="flex items-center justify-center gap-3 text-mediumGray h-full">
          <Link to={`/training/procedures/${cell.row._id}`}>
            <FaRegEdit
              className="text-xl cursor-pointer hover:text-hotPink"
              aria-label="Edit"
              title="Edit"
            />
          </Link>
          <FaRegTrashAlt
            className="text-xl cursor-pointer hover:text-error"
            aria-label="Delete"
            title="Delete"
            onClick={() => {
              setProcedureId(cell.row._id);
              setOpenWarningAlert(true);
            }}
          />
        </div>
      ),
    },
  ];

  const procedures = proceduresData?.data?.map((c) => {
    return {
      ...c,
      id: c._id,
      date: new Date(c.date).toISOString().split("T")[0],
    };
  });

  const acceptedProcedures = procedures?.filter(
    ({ procedureState }) => procedureState === "accepted"
  );

  const rejectedProcedures = procedures?.filter(
    ({ procedureState }) => procedureState === "rejected"
  );

  const underReviewProcedures = procedures?.filter(
    ({ procedureState }) => procedureState === "under_review"
  );

  const handleDeleteProcedure = async () => {
    try {
      const response = await deleteProcedure({ procedureId });
      if (response?.data?.code === 200) {
        toast.success(response?.data?.message);
      }
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  if (confirmDelete && procedureId) {
    return handleDeleteProcedure()
      .then((res) => console.log(res))
      .catch((error) => {
        throw new Error(error);
      });
  }
  return (
    <>
      <ConfirmDeleteMessage
        openWarningAlert={openWarningAlert}
        setConfirmDelete={setConfirmDelete}
        handleClose={() => setOpenWarningAlert(false)}
      />
      <Toaster />
      <AddProcedure open={open} handleClose={handleClose} />
      {procedures?.length > 0 ? (
        <div className="shadow-md p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-4xl text-secondary">Procedures</h2>
            <div className="">
              <Button
                handleClick={handleOpen}
                icon={<FaPlus />}
                label="Add Procedure"
              />
            </div>
          </div>

          {/* Search and Filters */}
          <SearchAndFilters
            dateFromValue={dateFrom}
            handleDateFrom={setDateFrom}
            dateToValue={dateTo}
            handleDateTo={setDateTo}
          />

          {/* Procedures Statistics */}
          <div className="mb-4 flex flex-col items-center gap-10 text-primary font-medium text-lg bg-white shadow-md rounded-lg p-6">
            <div className="flex items-start gap-10 border-b-1 border-silverFrost/40 w-full pb-4">
              <h3>
                Total:{" "}
                <span className="font-semibold text-secondary">
                  {procedures?.length}
                </span>{" "}
                procedures
              </h3>
              <h3>
                Accepted:{" "}
                <span className="font-semibold text-emeraldGreen">
                  {acceptedProcedures?.length}
                </span>{" "}
                procedures
              </h3>
              <h3>
                Under Review:{" "}
                <span className="font-semibold text-mediumBlue">
                  {underReviewProcedures?.length}
                </span>{" "}
                procedures
              </h3>
              <h3>
                Rejected:{" "}
                <span className="font-semibold text-darkRed">
                  {rejectedProcedures?.length}
                </span>{" "}
                procedures
              </h3>
            </div>
            <div className="grid grid-cols-6 w-full">
              <div className="!w-full col-span-full">
                <DataGrid
                  rows={procedures}
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
                  sx={{
                    backgroundColor: "#f5f5f5",
                    "& .MuiDataGrid-columnHeader": {
                      backgroundColor: "#fff",
                      color: "#1a2d42",
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
        </div>
      ) : (
        <EmptyData setOpen={setOpen} />
      )}
    </>
  );
};

export default Procedures;
