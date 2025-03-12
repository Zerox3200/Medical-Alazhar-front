import React from "react";
import profileImg from "../../assets/images/profile.png";

const internInfoHeadings = [
  "Name",
  "National ID/Passport Number",
  "Order of graduate",
  "Faculty ID Number",
  "Nationality",
  "Year of graduation",
  "Grade",
];
const internInfo = [
  "Mahmoud Samy Mohamed",
  "30005011404592",
  142,
  142,
  "Egyptian",
  2024,
  "A+",
];

const RenderInternInfo = () => {
  return internInfo.map((intern, i) => {
    return (
      <React.Fragment key={i}>
        <li className="items-center mb-4">
          <span className="block text-mediumGray col-span-1">
            {internInfoHeadings[i]}
          </span>
          <span className="block font-semibold col-span-1">{intern}</span>
        </li>
      </React.Fragment>
    );
  });
};

const Profile = () => {
  return (
    <div className="p-10">
      <div className="">
        {/* Main Intern Info */}
        <h2 className="text-4xl font-semibold text-mediumGray mb-6">
          Main Information
        </h2>

        <div className="shadow-md p-4">
          {/* Profile Image */}
          <div className="w-28">
            <img
              src={profileImg}
              alt="Profile"
              className="border-1 border-mediumGray/10 shadow-sm cursor-pointer rounded-full p-2 "
            />
          </div>
          <div className="mt-6">
            <ul className="text-lg w-2/3">{RenderInternInfo()}</ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
