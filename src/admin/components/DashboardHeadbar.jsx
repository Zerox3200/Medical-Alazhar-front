import React, { useEffect, useState } from "react";
import { FaCalendarPlus } from "react-icons/fa";
import { useAdmin } from "../../services/admin/api/hooks/adminHooks.js";
import AccountMenu from "./AccountMenu.jsx";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader";

const DashboardHeadbar = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [adminName, setAdminName] = useState("Guest");
  const date = new Date();
  const today = date.toDateString();

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const { id, role } = useSelector((state) => state.auth?.user);

  const { data, isLoading, isFetching, isSuccess } = useAdmin({
    adminId: id,
  });

  useEffect(() => {
    if (isSuccess) {
      setAdminName(data?.admin?.fullname);
    }
  }, [data?.admin?.fullname, isSuccess]);

  if (isLoading)
    return (
      <div>
        <Loader />
      </div>
    );
  if (isFetching) return <p>Refreshing...</p>;

  return (
    <div className="bg-white shadow-md shadow-silverFrost/20 px-6 py-4 flex justify-between items-center">
      {/* Welcome and date */}
      <div className="">
        <h1 className="text-2xl text-secondary">
          Welcome Back Dr.{" "}
          <span className="font-bold">{adminName.split(" ")[0]}</span>
        </h1>
        <p className="flex items-center gap-1 font-medium text-secondary mt-1">
          <span className="flex items-center gap-1">
            <FaCalendarPlus className="text-hotPink" /> <span>{today}</span>
          </span>
          <span className="inline-block mx-2">|</span>
          <span>{time}</span>
        </p>
      </div>
      <div className="flex justify-end">
        <AccountMenu
          profileImage={data?.admin?.profileImage}
          name={adminName.split(" ")[0] + " " + adminName.split(" ")[1]}
          role={role}
        />
      </div>
    </div>
  );
};

export default DashboardHeadbar;
