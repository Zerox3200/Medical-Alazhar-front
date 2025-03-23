import React from "react";
import ProfileSidebar from "./components/ProfileSidebar";
import Content from "./components/Content";

const Profile = () => {
  return (
    <div className="grid grid-cols-8 gap-10">
      <div className="col-span-2">
        <ProfileSidebar />
      </div>
      <div className="col-span-6">{/* <Content /> */}</div>
    </div>
  );
};

export default Profile;
