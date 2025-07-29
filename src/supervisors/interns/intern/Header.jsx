import React from "react";
import _ from "lodash";

const Header = ({ internData }) => {
  console.log(internData?.data);
  return (
    <div className="p-6 flex gap-6 items-center border-b border-mistyMorning">
      <div className="w-32 h-32 rounded-full shadow-lg overflow-hidden">
        <img src={"http://localhost:3000/" + internData?.data?.profileImage} />
      </div>
      <div className="flex justify-between gap-12 text-secondary font-semibold">
        <div className="">
          <h1>{internData?.data?.fullname}</h1>
          <h2>{internData?.data?.arabicName}</h2>
        </div>
        <div>
          <h3>{internData?.data?.email}</h3>
          <h3>{internData?.data?.phone.toString().slice(2)}</h3>
        </div>
        <div>
          <h3>{internData?.data?.nationality}</h3>
          <h3>{_.startCase(internData?.data?.hospital)} Hospital</h3>
        </div>
      </div>
    </div>
  );
};

export default Header;
