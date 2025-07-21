import React from "react";
import { useSelector } from "react-redux";
// import { useGetUserQuery } from "../../../services/api/apiSlice";
import RotationsProgress from "./components/RotationsProgress";
import Loader from "../../components/Loader";
import PersonalInfoHeader from "./components/PersonalInfoHeader";
import CurrentRoundProgress from "./components/CurrentRoundProgress";

const InternHome = () => {
  // const { id, role } = useSelector((state) => state.auth.user || {});

  // const { data, error, isLoading } = useGetUserQuery(
  //   { userId: id, role },
  //   { skip: !id }
  // );

  // if (!id) return <div>Please log in.</div>;
  // if (isLoading)
  //   return (
  //     <div>
  //       <Loader />
  //     </div>
  //   );
  // if (error)
  //   return <div>Error: {error.data?.message || "Failed to load user"}</div>;

  return (
    <div className="p-6">
      {/* Intern Personal Information */}
      <div className="grid grid-cols-2">
        {/* Rotations Progress */}
        {/* <RotationsProgress /> */}
        {/* Current Round Progress */}
        {/* <CurrentRoundProgress /> */}
      </div>
    </div>
  );
};

export default InternHome;
