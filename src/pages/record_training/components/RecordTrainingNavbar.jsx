import React, { useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa6";

const RecordTrainingNavbar = () => {
  const [openList, setOpenList] = useState(false);

  return (
    <nav className="bg-softGray p-4 w-full text-lg h-full pt-20">
      <div>
        <h3
          className={`text-darkGray flex gap-3 items-center cursor-pointer hover:text-deepBlue hover:bg-lightBlue p-2 ${
            openList ? "bg-lightBlue" : ""
          }`}
          onClick={() => setOpenList(!openList)}
        >
          WPBL{" "}
          {!openList ? (
            <FaChevronRight className="text-sm" />
          ) : (
            <FaChevronDown className="text-sm" />
          )}
        </h3>
        <ul
          className={`text-md pl-6 h-0 overflow-hidden bg-lightBlue ${
            openList ? "h-fit" : ""
          }`}
        >
          <li className="cursor-pointer hover:text-deepBlue p-1">Cases</li>
          <li className="cursor-pointer hover:text-deepBlue p-1">Procedures</li>
        </ul>
      </div>
      <ul>
        <li className="mt-6 cursor-pointer hover:text-deepBlue hover:bg-lightBlue p-2">
          Self Learning
        </li>
        <li className="mt-6 cursor-pointer hover:text-deepBlue hover:bg-lightBlue p-2">
          Direct Learning
        </li>
        <li className="mt-6 cursor-pointer hover:text-deepBlue hover:bg-lightBlue p-2">
          Assessment
        </li>
        <li className="mt-6 cursor-pointer hover:text-deepBlue hover:bg-lightBlue p-2">
          End Round Reflection
        </li>
      </ul>
    </nav>
  );
};

export default RecordTrainingNavbar;
