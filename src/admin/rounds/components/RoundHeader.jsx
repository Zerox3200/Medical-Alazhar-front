import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { useGetAllSupervisorsQuery } from "../../../services/api/adminApiSlice";
import { Link } from "react-router";
import _ from "lodash";
import PagesHeader from "../../components/PagesHeader";

const RoundHeader = ({ roundName, selectedHospital, setSelectedHospital }) => {
  const [supervisors, setSupervisors] = useState(null);
  const [coordinator, setCoordinator] = useState(null);
  const { data, isSuccess } = useGetAllSupervisorsQuery();

  useEffect(() => {
    if (isSuccess) setSupervisors(data?.supervisors);
  }, [isSuccess, data?.supervisors]);

  useEffect(() => {
    const filterCoordinator = supervisors?.filter(
      (supervisor) =>
        supervisor.speciality === roundName &&
        supervisor.role === "coordinator" &&
        supervisor.hospital === selectedHospital
    );
    if (filterCoordinator) setCoordinator(...filterCoordinator);
  }, [roundName, selectedHospital, supervisors]);

  return (
    <div>
      {/* Round Header Data */}
      <div>
        {/* <div className="flex items-center gap-4 justify-end">
          <div className="flex gap-2">
            <label htmlFor="al_hussein">Al Hussein</label>
            <input
              type="radio"
              placeholder="Al Hussein"
              name="hospital"
              id="al_hussein"
              value="al_hussein"
              checked={selectedHospital === "al_hussein"}
              onChange={() => setSelectedHospital("al_hussein")}
            />
          </div>
          <div className="flex gap-2">
            <label htmlFor="sayed_galal">Sayed Galal</label>
            <input
              type="radio"
              placeholder="Sayed Galal"
              name="hospital"
              id="sayed_galal"
              value="sayed_galal"
              checked={selectedHospital === "sayed_galal"}
              onChange={() => setSelectedHospital("sayed_galal")}
            />
          </div>
        </div> */}
        <h1 className="mb-4 text-4xl">Rounds</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <h2 className="">Coordinator: </h2>
            <Link to={`/admin/coordinators/${coordinator?._id}`}>
              <Chip
                size="small"
                color="primary"
                clickable
                avatar={<Avatar>{coordinator?.firstname.slice(0, 1)}</Avatar>}
                label={
                  _.startCase(coordinator?.firstname) +
                  " " +
                  _.startCase(coordinator?.lastname)
                }
              />
            </Link>
          </div>
          {/* Supervisors */}
          <ul className="flex gap-2 items-center">
            <p className="">Supervisors:</p>
            <Stack direction="row" spacing={1}>
              {supervisors?.map((supervisor, i) => {
                if (
                  supervisor.role === "supervisor" &&
                  supervisor.speciality === roundName &&
                  supervisor.hospital === selectedHospital
                ) {
                  return (
                    <Link to={`/admin/supervisors/${supervisor?._id}`} key={i}>
                      <Chip
                        size="small"
                        color="secondary"
                        clickable
                        avatar={
                          <Avatar>
                            {_.startCase(supervisor.firstname)?.slice(0, 1)}
                          </Avatar>
                        }
                        label={
                          _.startCase(supervisor.firstname) +
                          " " +
                          _.startCase(supervisor.lastname)
                        }
                      />
                    </Link>
                  );
                }
              })}
            </Stack>
          </ul>
        </div>
      </div>

      {/* Round Date */}
      <div className="my-4">
        <div>
          Current Round Starts from{" "}
          <Chip size="small" label="01 March 2025" color="warning" /> to{" "}
          <Chip size="small" label="31 May 2025" color="warning" />
        </div>
      </div>
    </div>
  );
};

export default RoundHeader;
