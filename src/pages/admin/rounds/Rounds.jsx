import React from "react";
import RoundsSidebar from "./components/RoundsSidebar";
import RoundsContent from "./RoundsContent";

const Rounds = () => {
  return (
    <div className="grid grid-cols-6 relative">
      <div className="col-span-1">
        <RoundsSidebar />
      </div>
      <div className="col-span-5">
        <RoundsContent />
      </div>
    </div>
  );
};

export default Rounds;
