import React from "react";
import { FaUserPlus } from "react-icons/fa6";
import { RiTeamFill } from "react-icons/ri";
import { IoMdDownload } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import LightButton from "../../components/LightButton";
import DarkButton from "../../components/DarkButton";

const Header = () => {
  return (
    <div className="flex items-center justify-between p-6">
      <div className="flex items-center gap-4">
        <h1 className="p-3 rounded-md bg-white shadow-sm border-[1px] border-cloudVeil text-3xl text-hotPink">
          <RiTeamFill />
        </h1>
        <h2 className="flex flex-col gap-1">
          <span className="text-xl text-primary">Supervisors</span>
          <span className="text-secondary/60 text-md">
            Manage your supervisors and coordinators
          </span>
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <LightButton icon={<IoMdDownload />} label="Export" />
        <DarkButton icon={<FaUserPlus />} label="Add Supervisor" />
      </div>
    </div>
  );
};

export default Header;
