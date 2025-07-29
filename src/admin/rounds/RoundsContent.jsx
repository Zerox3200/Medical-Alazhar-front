import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setOpenNewRoundModal } from "../../services/slices/adminSlice";
import { GiMedicalPackAlt } from "react-icons/gi";
import RoundsData from "./components/RoundsData";
import PagesHeader from "../components/PagesHeader";
import RoundsFilterAndSearchBar from "./components/RoundsFilterAndSearchBar";

const RoundsContent = () => {
  const [durationValue, setDurationValue] = useState();
  const [hospitalValue, setHospitalValue] = useState();
  const [levelValue, setLevelValue] = useState();
  const [inputValue, setInputValue] = useState();

  const dispatch = useDispatch();
  const dispatchNewRound = () =>
    dispatch(setOpenNewRoundModal({ openNewRoundModal: true }));

  return (
    <div className="flex flex-col">
      <PagesHeader
        headerTitle="Rounds"
        headerDescription="Manage your rounds and see updates"
        headerIcon={<GiMedicalPackAlt />}
        buttonTitle="New Round"
        handleDarkButtonClick={dispatchNewRound}
      />

      <RoundsFilterAndSearchBar
        durationValue={durationValue}
        setDurationValue={setDurationValue}
        hospitalValue={hospitalValue}
        setHospitalValue={setHospitalValue}
        levelValue={levelValue}
        setLevelValue={setLevelValue}
        setInputValue={setInputValue}
      />
      <RoundsData
        durationValue={durationValue}
        hospitalValue={hospitalValue}
        levelValue={levelValue}
        inputValue={inputValue}
      />
    </div>
  );
};

export default RoundsContent;
