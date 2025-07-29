import React from "react";
import { useRounds } from "../../../services/admin/api/hooks/roundHooks";
import { DataGrid } from "@mui/x-data-grid";
import _ from "lodash";
import { Link } from "react-router";

const columns = [
  {
    field: "name",
    headerName: "Name",
    width: 200,
    flex: 1,
    renderCell: (cell) => {
      return (
        <Link to={`/rounds/${cell.row._id}`} className="hover:text-mediumBlue">
          {_.startCase(cell.value)}
        </Link>
      );
    },
  },
  {
    field: "waves",
    headerName: "Number of waves",
    width: 150,
    renderCell: (cell) => {
      return <div>{cell?.value?.length} waves</div>;
    },
  },
  {
    field: "interns",
    headerName: "Total number of interns",
    width: 180,
    renderCell: (cell) => {
      return (
        <div>{cell?.row?.waves?.flatMap((w) => w.interns)?.length} interns</div>
      );
    },
  },
  {
    field: "duration",
    headerName: "Duartion",
    width: 120,
    renderCell: (cell) => {
      return (
        <span>
          {+cell.value > 1 ? cell.value + " Months" : cell.value + " Month"}
        </span>
      );
    },
  },

  {
    field: "numericYear",
    headerName: "Year level",
    width: 90,
  },
  {
    field: "hospital",
    headerName: "Hospital",
    width: 120,
    renderCell: (cell) => {
      return <span>{_.startCase(cell.value)}</span>;
    },
  },
];

const RoundsData = ({
  durationValue,
  hospitalValue,
  levelValue,
  inputValue,
}) => {
  const filters = {};
  if (durationValue?.value) filters.duration = durationValue.value;
  if (hospitalValue?.value) filters.hospital = _.startCase(hospitalValue.value);
  if (levelValue?.value) filters.numericYear = levelValue.value;
  if (inputValue) filters.name = inputValue;

  const { roundsData } = useRounds(filters);

  const rounds = roundsData?.rounds?.map((round) => {
    return {
      ...round,
      id: round._id,
    };
  });

  return (
    <div className="px-6">
      <DataGrid
        rows={rounds}
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

export default RoundsData;
