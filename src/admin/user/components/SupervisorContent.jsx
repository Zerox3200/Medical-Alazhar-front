import React from "react";
import InfoBox from "./InfoBox";

const SupervisorContent = ({ data: { user } }) => {
  const { firstname, lastname, email, phone } = user;

  return (
    <div className="mt-8">
      {/*  Personal Information */}
      <div className="shadow-md p-4">
        <h2 className="text-2xl font-semibold text-mediumGray mb-6">
          Personal Information
        </h2>
        <div className="mt-6">
          <ul className="text-md grid grid-cols-2">
            <InfoBox label="First Name" value={firstname} />
            <InfoBox label="Last Name" value={lastname} />
            <InfoBox label="Email" value={email} />
            <InfoBox label="Phone" value={"+20" + phone} />
          </ul>
        </div>
      </div>

      {/* Academic Information */}
      <div className="shadow-md p-4 mt-10">
        <h2 className="text-2xl font-semibold text-mediumGray mb-6">
          Academic Information
        </h2>
        <div className="mt-6">
          {/* <ul className="text-md grid grid-cols-2">
            <InfoBox
              label="Faculty of Graduation"
              value={facultyOfGraduation}
            />
            <InfoBox label="Year of Graduation" value={yearOfGraduation} />
            <InfoBox label="Order of Graduate" value={orderOfGraduate} />
            <InfoBox label="Grade" value={grade} />
          </ul> */}
        </div>
      </div>

      {/* Identification Details */}
      <div className="shadow-md p-4 my-10">
        <h2 className="text-2xl font-semibold text-mediumGray mb-6">
          Identification Details
        </h2>
        <div className="mt-6">
          {/* <ul className="text-md grid grid-cols-2">
            <InfoBox label="Hospital ID Number" value={facultyIDNumber} />
            <InfoBox
              label={
                idOrPassport.type === "nationalID"
                  ? "National ID"
                  : "PassportNumber"
              }
              value={idOrPassport?.number}
            />
            <InfoBox label="Hospital" value={hospital + " Hospital"} />
          </ul> */}
        </div>
      </div>
    </div>
  );
};

export default SupervisorContent;
