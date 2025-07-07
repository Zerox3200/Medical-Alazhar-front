/** Major imports **/
import React, { useState } from "react";
import { LinearProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import _ from "lodash";
import { Link } from "react-router";
import toast, { Toaster } from "react-hot-toast";

/** APIs **/
import {
  useCases,
  useDeleteCaseMutation,
} from "../../../services/intern/api/hooks/casesHooks";

/** Components **/
import EmptyData from "../components/EmptyData";
import ConfirmDeleteMessage from "../components/ConfirmDeleteMessage";
import SearchAndFilters from "../components/SearchAndFilters";

/** Icons **/
import { FaCheckCircle, FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";
import { HiOutlineDocumentSearch } from "react-icons/hi";

const CasesSummary = () => {
  // Filtering states
  const [chipValue, setChipValue] = useState(null);
  const [dateFrom, setDateFrom] = useState(new Date("2024-03-01"));
  const [dateTo, setDateTo] = useState(new Date());
  const [venue, setVenue] = useState({});
  const [searchValue, setSearchValue] = useState("");

  const [deleteCase] = useDeleteCaseMutation();
  const [openWarningAlert, setOpenWarningAlert] = useState(false);
  const [caseId, setCaseId] = useState(null);
  const {
    cases: casesData,
    isLoading,
    isError,
  } = useCases({
    filters: {
      state: _.snakeCase(chipValue),
      dateFrom: dateFrom?.toISOString(),
      dateTo: dateTo?.toISOString(),
      venue: _.snakeCase(venue?.value),
      searchTerm: _.snakeCase(searchValue),
    },
  });

  // Delete non accepted cases
  const handleDeleteCase = async () => {
    try {
      const response = await deleteCase({ caseId }).unwrap();
      if (response?.code === 200) {
        toast.success(response?.message);
      }
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  /*Columns*/
  const columns = [
    {
      field: "roundId",
      headerName: "Round",
      minWidth: 150,
      flex: 1,
      renderCell: (cell) => {
        return (
          <Link
            to={`/training/cases/${cell.row._id}`}
            className="cursor-pointer"
          >
            {_.startCase(cell.value?.name)}
          </Link>
        );
      },
    },
    {
      field: "patientSerial",
      headerName: "Patient serial",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "caseType",
      headerName: "Case Type",
      minWidth: 300,
      flex: 1,
      renderCell: (cell) => {
        return <p>{_.startCase(cell.value)}</p>;
      },
    },
    { field: "date", headerName: "Date", minWidth: 120, flex: 1 },
    { field: "epas", headerName: "EPA", width: 90 },
    {
      field: "expectedLevel",
      headerName: "Expected Level",
      width: 120,
    },
    {
      field: "state",
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
          <Link to={`/training/cases/${cell.row._id}`}>
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
              setCaseId(cell.row._id);
              setOpenWarningAlert(true);
            }}
          />
        </div>
      ),
    },
  ];

  const cases = casesData?.cases?.map((c) => {
    return {
      ...c,
      id: c._id,
      date: new Date(c.date).toISOString().split("T")[0],
    };
  });

  const acceptedCases = cases?.filter(({ state }) => state === "accepted");

  const rejectedCases = cases?.filter(({ state }) => state === "rejected");

  const underReviewCases = cases?.filter(
    ({ state }) => state === "under_review"
  );

  return (
    <>
      <ConfirmDeleteMessage
        deletedObject="Case"
        handleDeleteObject={handleDeleteCase}
        openWarningAlert={openWarningAlert}
        handleClose={() => setOpenWarningAlert(false)}
      />
      <Toaster />
      <div>
        <div className="flex justify-between items-center">
          <h2 className="text-4xl text-secondary">Cases</h2>
          <div className="">
            <Link
              to="/training/cases/add"
              className="p-3 rounded-lg bg-mediumBlue hover:bg-lightBlue text-white"
            >
              Add Case
            </Link>
          </div>
        </div>

        {/* Search and Filters */}
        <SearchAndFilters
          placeholder="Search by round name or case type"
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

        {/* Cases Statistics */}
        <div className="mb-4 flex flex-col items-center gap-10 text-primary font-medium text-lg bg-white shadow-md rounded-lg p-6">
          <div className="flex items-start gap-10 border-b-1 border-silverFrost/40 w-full pb-4">
            <h3>
              Total:{" "}
              <span className="font-semibold text-secondary">
                {cases?.length}
              </span>{" "}
              cases
            </h3>
            <h3>
              Accepted:{" "}
              <span className="font-semibold text-emeraldGreen">
                {acceptedCases?.length}
              </span>{" "}
              cases
            </h3>
            <h3>
              Under Review:{" "}
              <span className="font-semibold text-mediumBlue">
                {underReviewCases?.length}
              </span>{" "}
              cases
            </h3>
            <h3>
              Rejected:{" "}
              <span className="font-semibold text-darkRed">
                {rejectedCases?.length}
              </span>{" "}
              cases
            </h3>
          </div>
          <div className="grid grid-cols-6 w-full">
            <div className="!w-full col-span-full">
              <DataGrid
                rows={cases}
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

export default CasesSummary;
