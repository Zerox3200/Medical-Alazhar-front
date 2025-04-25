import React, { useState } from "react";
import RoundHeader from "./components/RoundHeader";
import RoundDataGrid from "./RoundDataGrid";
import { useSearchParams } from "react-router";

const RoundsContent = () => {
  const [selectedHospital, setSelectedHospital] = useState("al_hussein");
  const [searchParams] = useSearchParams();
  const roundName = searchParams.get("round_name");

  return (
    <div className="p-3 pt-10 bg-softGray">
      <RoundHeader
        roundName={roundName}
        selectedHospital={selectedHospital}
        setSelectedHospital={setSelectedHospital}
      />

      {/* Round Content Data */}
      <RoundDataGrid
        roundName={roundName}
        selectedHospital={selectedHospital}
      />
    </div>
  );
};

export default RoundsContent;
