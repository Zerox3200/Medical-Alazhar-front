import React, { useState } from "react";
import { LinearProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { FaCheckCircle, FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import EmptyData from "../components/EmptyData";
import {
  useDeleteProcedureMutation,
  useProcedures,
} from "../../../services/intern/api/hooks/proceduresHooks";
import _ from "lodash";
import { HiOutlineDocumentSearch } from "react-icons/hi";
import { IoCloseCircle } from "react-icons/io5";
import { Link } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import ConfirmDeleteMessage from "../components/ConfirmDeleteMessage";
import SearchAndFilters from "../components/SearchAndFilters";

const Procedures = () => {
  // Filtering states
  const [chipValue, setChipValue] = useState(null);
  const [dateFrom, setDateFrom] = useState(new Date("2024-03-01"));
  const [dateTo, setDateTo] = useState(new Date());
  const [venue, setVenue] = useState({});
  const [searchValue, setSearchValue] = useState("");

  const [openWarningAlert, setOpenWarningAlert] = useState(false);
  const [procedureId, setProcedureId] = useState(null);
  const [deleteProcedure] = useDeleteProcedureMutation();
  const {
    procedures: proceduresData,
    isLoading,
    isError,
  } = useProcedures({
    filters: {
      procedureState: _.snakeCase(chipValue),
      dateFrom: dateFrom?.toISOString(),
      dateTo: dateTo?.toISOString(),
      venue: _.snakeCase(venue?.value),
      searchTerm: _.snakeCase(searchValue),
    },
  });

  const handleDeleteProcedure = async () => {
    try {
      const response = await deleteProcedure({ procedureId }).unwrap();
      if (response?.code === 200) {
        toast.success(response?.message);
      }
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  const columns = [
    {
      field: "roundId",
      headerName: "Round",
      minWidth: 150,
      flex: 1,
      renderCell: (cell) => {
        return (
          <Link
            to={`/training/procedures/${cell.row._id}`}
            className="cursor-pointer"
          >
            {_.startCase(cell.value?.name)}
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
    {
      field: "venue",
      headerName: "Venue",
      minWidth: 150,
      flex: 1,
      renderCell: (cell) => {
        return <p>{_.startCase(_.startCase(cell.value))}</p>;
      },
    },
    { field: "hospitalRecord", headerName: "Hospital Record", width: 150 },
    {
      field: "performanceLevel",
      headerName: "Performance Level",
      width: 150,
      renderCell: (cell) => {
        return <p>{_.startCase(_.startCase(cell.value))}</p>;
      },
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

  const procedures = proceduresData?.data?.map((p) => {
    return {
      ...p,
      id: p._id,
      date: new Date(p.date).toISOString().split("T")[0],
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

  return (
    <>
      <ConfirmDeleteMessage
        deletedObject="Procedure"
        handleDeleteObject={handleDeleteProcedure}
        openWarningAlert={openWarningAlert}
        handleClose={() => setOpenWarningAlert(false)}
      />
      <Toaster />
      <div>
        <div className="flex justify-between items-center">
          <h2 className="text-4xl text-secondary">Procedures</h2>
          <div className="">
            <Link
              to="/training/procedures/add"
              className="p-3 rounded-lg bg-mediumBlue hover:bg-lightBlue text-white"
            >
              Add Procedure
            </Link>
          </div>
        </div>
        {/* Search and Filters */}
        <SearchAndFilters
          placeholder="Search by round name or skill"
          dateFromValue={dateFrom}
          handleDateFrom={setDateFrom}
          dateToValue={dateTo}
          handleDateTo={setDateTo}
          chipValue={chipValue}
          setChipValue={setChipValue}
          venue={venue}
          setVenue={setVenue}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
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
                loading={isLoading}
                error={isError}
                slots={{
                  loadingOverlay: LinearProgress,
                  noRowsOverlay: EmptyData,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Procedures;
