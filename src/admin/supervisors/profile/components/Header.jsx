import React from "react";
import _ from "lodash";
import { Chip } from "@mui/material";
import { BsEnvelope, BsTelephone } from "react-icons/bs";
import ImagePopper from "./ImagePopper";
import RoleList from "./RoleList";

const Header = ({ data: { supervisor } }) => {
  const { fullname, email, phone, hospital, role, speciality } = supervisor;
  const date = new Date(supervisor?.lastLogin);
  const lastLoginDate = date.toLocaleString();

  return (
    <div className="bg-white rounded-md p-6 shadow-md">
      <div className="flex items-center gap-6">
        <div>
          <img
            src={"https://picsum.photos/300/300"}
            alt="supervisors profile image"
            className="w-32 h-32 rounded-full object-cover"
          />
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-3">
            <Chip
              label={_.capitalize(role)}
              className="!text-lg"
              color="info"
            />
            <Chip
              label={_.capitalize(speciality)}
              className="!text-lg"
              color="secondary"
            />
            <Chip
              label={_.startCase(hospital)}
              className="!text-lg"
              color="warning"
            />
          </div>
          <h1 className="text-secondary text-2xl font-semibold mt-2">
            {fullname}
          </h1>
          <h2 className="text-primary/60 text-lg flex items-center gap-6">
            <span className="flex items-center gap-2">
              <BsEnvelope /> {email}
            </span>
            <span className="text-4xl mb-3 block">.</span>
            <span className="flex items-center gap-2">
              <BsTelephone />{" "}
              {_.chain(phone)
                .split("")
                .chunk(4)
                .map((chunk) => chunk.join(""))
                .join("-")
                .value()}
            </span>
          </h2>
          <p className="text-secondary/80">
            Last login: <span className="font-medium">{lastLoginDate}</span>
          </p>
        </div>

        <div className="self-start">
          <RoleList />
        </div>
      </div>
    </div>
  );
};

export default Header;
