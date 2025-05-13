import React, { useContext, useState } from "react";
import { createContext } from "react";

const TrainingContext = createContext();

export const TrainingProvider = ({ children }) => {
  const [filteredList, setFilteredList] = useState();
  // const [filteredProcedures, setFilteredProcedures] = useState();
  const [selectedRound, setSelectedRound] = useState();

  return (
    <TrainingContext.Provider
      value={{
        filteredList,
        setFilteredList,
        selectedRound,
        setSelectedRound,
      }}
    >
      {children}
    </TrainingContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTrainingContext = () => useContext(TrainingContext);
