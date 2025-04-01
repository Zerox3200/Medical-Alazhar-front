import React from "react";

const StatsBox = ({ icon, count, title, bgColor }) => {
  return (
    <div
      className={`${bgColor} text-center shadow-md p-4 rounded-sm border-1 border-mediumGray/10 col-span-1 text-softGray flex items-center justify-center gap-4`}
    >
      <p className="w-fit text-5xl text-softGray">{icon}</p>
      <div>
        <h3 className="text-4xl font-bold">{count}</h3>
        <h2 className="text-lg">{title}</h2>
      </div>
    </div>
  );
};

export default StatsBox;
