import React from "react";
import { IoMdDownload } from "react-icons/io";
import LightButton from "./LightButton";
import DarkButton from "./DarkButton";
import { FaPlus } from "react-icons/fa";

const PagesHeader = ({
  headerTitle,
  headerDescription,
  headerIcon,
  buttonTitle,
  handleDarkButtonClick,
}) => {
  return (
    <div className="flex items-center justify-between p-6">
      <div className="flex items-center gap-4">
        <h1 className="p-3 rounded-md bg-white shadow-sm border-[1px] border-cloudVeil text-3xl text-hotPink">
          {headerIcon}
        </h1>
        <h2 className="flex flex-col gap-1">
          <span className="text-xl text-primary">{headerTitle}</span>
          <span className="text-secondary/60 text-md">{headerDescription}</span>
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <LightButton icon={<IoMdDownload />} label="Export" />
        <DarkButton
          icon={<FaPlus />}
          label={buttonTitle}
          handleClick={handleDarkButtonClick}
        />
      </div>
    </div>
  );
};

export default PagesHeader;
