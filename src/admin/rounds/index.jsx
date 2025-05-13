import React from "react";
import RoundsContent from "./RoundsContent";
import NewRound from "./NewRound";

const Rounds = () => {
  return (
    <div className="flex flex-col gap-10">
      <RoundsContent />
      <NewRound />
    </div>
  );
};

export default Rounds;
