import React, { useContext, useState } from "react";
import { createContext } from "react";

const CasesContext = createContext();

export const CasesProvider = ({ children }) => {
  const [filteredCases, setFilteredCases] = useState();
  const [selectedRound, setSelectedRound] = useState();

  return (
    <CasesContext.Provider
      value={{
        filteredCases,
        setFilteredCases,
        selectedRound,
        setSelectedRound,
      }}
    >
      {children}
    </CasesContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCasesContext = () => useContext(CasesContext);
