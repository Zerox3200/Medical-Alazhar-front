import React, { useState } from "react";
import RoundBox from "./RoundBox.jsx";
import { useGetRoundQuery } from "../../../../services/admin/api/hooks/roundHooks.js";
import SupervisorsBox from "./SupervisorsBox.jsx";
import InternsBox from "./InternsBox.jsx";

const tabMenu = [
  { label: "Rounds", value: "rounds" },
  { label: "Supervisors", value: "supervisors" },
  { label: "Interns", value: "interns" },
];

const SupervisorContent = ({ data: { supervisor } }) => {
  const { data } = useGetRoundQuery({ roundId: supervisor?.round });

  const [tabIndex, setTabIndex] = useState(0);
  const [tabName, setTabName] = useState("rounds");

  return (
    <div className="bg-white rounded-md p-6 shadow-md mt-8">
      {/* Tab navigator */}
      <ul className="flex items-center gap-4 mb-8 border-b-1 border-mistyMorning pb-6">
        {tabMenu.map((tab, i) => {
          return (
            <li
              className={`${
                tabIndex === i
                  ? "text-secondary border-secondary"
                  : "border-transparent"
              } cursor-pointer font-medium border-b-2`}
              key={i}
              onClick={() => {
                setTabIndex(i);
                setTabName(tab.value);
              }}
            >
              {tab.label}
            </li>
          );
        })}
      </ul>

      {/* Tab Content */}
      <div className="grid grid-cols-3 gap-4">
        {tabIndex === 0 && tabName === "rounds" ? (
          <RoundBox data={data} />
        ) : tabIndex === 1 && tabName === "supervisors" ? (
          <SupervisorsBox data={data} />
        ) : tabIndex === 2 && tabName === "interns" ? (
          <InternsBox data={data} />
        ) : null}
      </div>
    </div>
  );
};

export default SupervisorContent;
