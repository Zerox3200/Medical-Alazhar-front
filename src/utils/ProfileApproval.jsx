import React from "react";
import { Link } from "react-router";

const ProfileApproval = () => {
  return (
    <div className="bg-coral text-center p-4 text-crispWhite sticky top-0 left-0 z-50">
      <div>
        <p>Upload your personal image and national ID image to be approved.</p>
      </div>
      <div>
        Complete your
        <Link to="/profile" className="text-mediumGray font-bold">
          {" "}
          profile{" "}
        </Link>
        now
      </div>
    </div>
  );
};

export default ProfileApproval;
