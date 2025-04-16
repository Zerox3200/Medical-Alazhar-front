import React from "react";
import InfoBox from "./InfoBox";
import ImagePopper from "./ImagePopper";
import { FaRegCircleUser } from "react-icons/fa6";
import { PiCertificateLight } from "react-icons/pi";
import { TiBusinessCard } from "react-icons/ti";

const InternContent = ({ data: { intern } }) => {
  const {
    fullname,
    email,
    phone,
    nationality,
    facultyOfGraduation,
    yearOfGraduation,
    orderOfGraduate,
    grade,
    facultyIDNumber,
    idOrPassport,
    hospital,
  } = intern;

  return (
    <div className="mt-8">
      {/*  Personal Information */}
      <div className="shadow-md p-4 mb-8">
        <h2 className="text-2xl font-semibold text-mediumGray mb-6">
          Personal Information
        </h2>
        <div className="mt-6">
          <ul className="text-md grid grid-cols-2">
            <InfoBox label="Fullname" value={fullname} />
            <InfoBox label="Email" value={email} />
            <InfoBox label="Phone" value={"+20" + phone} />
            <InfoBox label="Nationality" value={nationality} />
          </ul>
        </div>
      </div>

      <div className="shadow-md p-4">
        <h2 className="text-2xl font-semibold text-mediumGray mb-6">
          Identities
        </h2>
        <div className="rounded-sm mb-4 relative group min-h-64 grid grid-cols-2 gap-6">
          <div className="col-span-1 bg-softGray gap-4 min-h-48">
            {intern?.nationalIDImage ? (
              <ImagePopper
                src={"http://localhost:3000/" + intern?.nationalIDImage}
                alt={intern?.fullname}
                imageWidth="w-64"
                imageHeight="h-64"
              />
            ) : (
              <TiBusinessCard className="text-6xl block m-auto h-full text-mediumGray" />
            )}
          </div>
          <div className="col-span-1 bg-softGray gap-4 min-h-48">
            {intern?.mbbchCertificateImage ? (
              <ImagePopper
                src={"http://localhost:3000/" + intern?.mbbchCertificateImage}
                alt={intern?.fullname}
                imageWidth="w-64"
                imageHeight="h-64"
              />
            ) : (
              <PiCertificateLight className="text-6xl block m-auto h-full text-mediumGray" />
            )}
          </div>
        </div>
      </div>

      {/* Academic Information */}
      <div className="shadow-md p-4 mt-10">
        <h2 className="text-2xl font-semibold text-mediumGray mb-6">
          Academic Information
        </h2>
        <div className="mt-6">
          <ul className="text-md grid grid-cols-2">
            <InfoBox
              label="Faculty of Graduation"
              value={facultyOfGraduation}
            />
            <InfoBox label="Year of Graduation" value={yearOfGraduation} />
            <InfoBox label="Order of Graduate" value={orderOfGraduate} />
            <InfoBox label="Grade" value={grade} />
          </ul>
        </div>
      </div>

      {/* Identification Details */}
      <div className="shadow-md p-4 my-10">
        <h2 className="text-2xl font-semibold text-mediumGray mb-6">
          Identification Details
        </h2>
        <div className="mt-6">
          <ul className="text-md grid grid-cols-2">
            <InfoBox label="Hospital ID Number" value={facultyIDNumber} />
            <InfoBox
              label={
                idOrPassport?.type === "nationalID"
                  ? "National ID"
                  : "PassportNumber"
              }
              value={idOrPassport?.number}
            />
            <InfoBox label="Hospital" value={hospital + " Hospital"} />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InternContent;
