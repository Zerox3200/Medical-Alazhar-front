import React from "react";
import { Link } from "react-router";

const ProfileApproval = () => {
  return (
    <div className="bg-primary/40 fixed w-full h-full top-0 left-0 z-50 flex flex-col items-center justify-center text-2xl">
      <div className="bg-flashWhite text-center p-4 text-secondary rounded-md w-1/3 h-1/3 flex flex-col items-center justify-center ">
        <div>
          <p>
            Upload your personal image and national ID image to be approved.
          </p>
        </div>
        <div>
          Complete your{" "}
          <Link
            to="/profile"
            className="hover:text-mediumBlue text-lightBlue font-bold underline inline cursor-pointer"
          >
            profile
          </Link>{" "}
          now
        </div>
      </div>
    </div>
  );
};

export default ProfileApproval;
