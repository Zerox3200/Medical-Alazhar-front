import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "@mui/material";
import _ from "lodash";
import { Link } from "react-router";
import {
  useAddInternToRoundMutation,
  useGetAllInternsQuery,
} from "../../../services/api/adminApiSlice";

const AddIntern = ({ roundName, open, handleClose, selectedHospital }) => {
  const [searchValue, setSearchValue] = useState("");
  const [addInternToRound] = useAddInternToRoundMutation();

  const {
    user: { id },
  } = useSelector((state) => state.auth);
  const { data } = useGetAllInternsQuery({ skip: !id });

  const [filteredInterns, setFilteredInterns] = useState([]);
  const [searchedInterns, setSearchedInterns] = useState([]);

  const interns = useMemo(() => {
    return data?.interns?.map((intern) => ({
      ...intern,
      id: intern._id,
    }));
  }, [data?.interns]);

  useEffect(() => {
    if (interns && interns.length > 0) {
      const filtered = interns.filter(
        (intern) =>
          intern?.currentRound?.title !== roundName &&
          intern.hospital === selectedHospital
      );
      setFilteredInterns(filtered);
    }
  }, [interns, roundName, selectedHospital]);

  useEffect(() => {
    if (!filteredInterns) return;
    const filtered = filteredInterns.filter((intern) => {
      const regex = new RegExp(searchValue, "i");
      return regex.test(intern.fullname);
    });
    setSearchedInterns(filtered);
  }, [filteredInterns, searchValue]);

  const handleAddInternToRound = async (intern) => {
    const { _id } = intern;
    await addInternToRound({
      internId: _id,
      currentRound: { title: roundName, completed: false },
    });
  };

  return (
    <div>
      <Modal
        className="!outline-0 !border-0"
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="bg-softGray rounded-md shadow-md p-6 fixed top-1/4 left-1/2 w-2/3 -translate-x-1/2">
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="border-1 border-mediumGray/30 p-2 w-full rounded-sm outline-0"
            type="search"
            placeholder="Search interns..."
          />

          <div className="mt-8">
            <h3 className="text-mediumGray">
              Found: {searchedInterns?.length}
            </h3>
            <ul className="mt-4 bg-mediumGray/20 rounded-md">
              <li className="grid grid-cols-3 gap-4 items-center p-2 bg-teal rounded-t-md text-lg font-semibold text-softGray">
                <p className="col-span-1">Intern</p>
                <p className="col-span-1 m-auto">Current Round</p>
                <p className="col-span-1 m-auto"></p>
              </li>
              {searchedInterns &&
                searchedInterns?.map((intern, i) => {
                  return (
                    <li
                      className="grid grid-cols-3 gap-4 items-center p-2 bg-mediumGray/10 my-2"
                      key={i}
                    >
                      <Link
                        to={`/admin/interns/${intern._id}`}
                        className="col-span-1 hover:text-teal"
                      >
                        {intern.fullname}
                      </Link>
                      <p className="col-span-1 text-teal font-semibold block text-center">
                        {_.startCase(intern.currentRound.title)}
                      </p>
                      <p
                        className="col-span-1 text-mediumBlue text-sm cursor-pointer hover:text-teal text-right"
                        onClick={() => handleAddInternToRound(intern)}
                      >
                        Add to {_.startCase(roundName)}
                      </p>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddIntern;
