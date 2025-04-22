import React, { useEffect, useMemo, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { IoCloseCircleSharp } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import { useGetAllInternsQuery } from "../../../services/api/adminApiSlice";
import { Button } from "@mui/material";
import AddIntern from "./AddIntern";
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
  { field: "cases", headerName: "Cases Logged", width: 120, flex: 1 },
  { field: "procedures", headerName: "Procedures", width: 120, flex: 1 },
  { field: "assessments", headerName: "Assessments", width: 120, flex: 1 },
  {
    field: "passed",
    headerName: "Passed",
    width: 120,
    renderCell: (cell) => {
      return (
        <p className="text-2xl flex justify-center items-center h-full">
          {cell.row.currentRound.passed ? (
            <FaCheckCircle className="text-mediumGreen" />
          ) : (
            <IoCloseCircleSharp className="text-error" />
          )}
        </p>
      );
    },
  },
];

const RoundDataGrid = ({ roundName, selectedHospital }) => {
  const [open, setOpen] = useState(false);
  const [currentRoundForInterns, setCurrentRoundForInterns] = useState(null);
  const [searchedInterns, setSearchedInterns] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    user: { id },
  } = useSelector((state) => state.auth);
  const { data } = useGetAllInternsQuery({ skip: !id });

  const interns = useMemo(() => {
    return data?.interns?.map((intern) => ({
      ...intern,
      id: intern._id,
    }));
  }, [data?.interns]);

  useEffect(() => {
    if (interns && interns.length > 0) {
      const filteredInterns = interns.filter(
        (intern) =>
          intern?.currentRound?.title === roundName &&
          intern.hospital === selectedHospital
      );
      setCurrentRoundForInterns(filteredInterns);
    }
  }, [interns, roundName, selectedHospital]);

  useEffect(() => {
    if (!interns) return;
    const filtered = interns.filter((intern) => {
      const regex = new RegExp(searchValue, "i");
      return (
        regex.test(intern.fullname) && intern.hospital === selectedHospital
      );
    });
    setSearchedInterns(filtered);
  }, [interns, searchValue, selectedHospital]);

  return (
    <div>
      <div className="mb-8 flex justify-between items-center gap-4">
        <input
          className="border-1 border-mediumGray/30 p-2 w-2/3 rounded-sm outline-0"
          type="search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Find an intern..."
        />
        <Button
          sx={{ textTransform: "none" }}
          color="primary"
          variant="contained"
          onClick={handleOpen}
        >
          Add Intern
        </Button>
      </div>
      <DataGrid
        rows={searchValue.length > 0 ? searchedInterns : currentRoundForInterns}
        columns={columns}
        disableColumnMenu
        disableColumnSorting
        disableRowSelectionOnClick
        disableColumnResize
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

      <AddIntern
        roundName={roundName}
        open={open}
        setOpen={setOpen}
        handleOpen={handleOpen}
        handleClose={handleClose}
        selectedHospital={selectedHospital}
      />
    </div>
  );
};

export default RoundDataGrid;
