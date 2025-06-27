import React from "react";
import StatsBox from "./components/StatsBox";
import { FaUserMd, FaBookMedical } from "react-icons/fa";
import {
  HiOutlineArrowNarrowUp,
  HiOutlineArrowNarrowDown,
} from "react-icons/hi";
import { FaHeartPulse } from "react-icons/fa6";
import { MdSupervisorAccount } from "react-icons/md";
import {
  // useGetAllCasesQuery,
  // useGetAllInternsQuery,
  useSupervisors,
} from "../../services/admin/api/hooks/supervisorHooks";
import CasesLogged from "./charts/CasesLogged";
import PassedRounds from "./charts/PassedRounds";
import RecentAccounts from "./components/RecentAccounts";

const Dashboard = () => {
  // const { data: interns } = useGetAllInternsQuery();
  // const { data: cases } = useGetAllCasesQuery();
  const { supervisors } = useSupervisors();

  return (
    <div className="flex flex-col gap-10 p-6">
      {/* Statistics */}
      <div className="grid grid-cols-4 gap-4">
        {/* Interns */}
        <StatsBox
          heading="Interns"
          lineColor="bg-pink"
          // subHeading={interns?.count}
          icon={<FaUserMd />}
          iconBg="bg-pink/30"
          iconColor="text-hotPink"
          boxStatus={
            <span className="text-emeraldGreen flex items-center gap-[1px]">
              <HiOutlineArrowNarrowUp />
              6.4%
            </span>
          }
        />
        {/* Cases Logged */}
        <StatsBox
          heading="Cases"
          lineColor="bg-mediumBlue"
          // subHeading={cases?.count}
          icon={<FaHeartPulse />}
          iconBg="bg-lightBlue/30"
          iconColor="text-mediumBlue"
          boxStatus={
            <span className="text-lightRed flex items-center gap-[1px]">
              <HiOutlineArrowNarrowDown />
              3.2%
            </span>
          }
        />

        {/* Procedures Logged */}
        <StatsBox
          heading="Procedures"
          lineColor="bg-emeraldGreen"
          subHeading="5,902"
          icon={<FaBookMedical />}
          iconBg="bg-mediumGreen/20"
          iconColor="text-emeraldGreen"
          boxStatus={
            <span className="text-lightRed flex items-center gap-[1px]">
              <HiOutlineArrowNarrowDown />
              1.4%
            </span>
          }
        />

        {/* Supervisors Logged */}
        <StatsBox
          heading="Supervisors"
          lineColor="bg-lightRed"
          subHeading={supervisors?.count}
          icon={<MdSupervisorAccount />}
          iconBg="bg-lightRed/20"
          iconColor="text-darkRed"
          boxStatus={
            <span className="text-emeraldGreen flex items-center gap-[1px]">
              <HiOutlineArrowNarrowUp />
              9.1%
            </span>
          }
        />
      </div>

      {/* Charts */}
      <div className="bg-white p-6 grid grid-cols-2 shadow-md rounded-sm shadow-silverFrost">
        <div className="col-span-1">
          <CasesLogged />
        </div>
        <div className="col-span-1">
          <PassedRounds />
        </div>
      </div>

      {/* Recent accounts */}
      <div className="bg-white shadow-md rounded-sm shadow-silverFrost">
        <h1 className="border-b border-mistyMorning p-4 text-2xl font-medium text-primary">
          Recent accounts
        </h1>
        <div className="p-4">
          <RecentAccounts />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
