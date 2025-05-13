import React, { useState } from "react";
import InfoBox from "./InfoBox";
import ImagePopper from "./ImagePopper";
import { FaRegCircleUser } from "react-icons/fa6";
import { PiCertificateLight } from "react-icons/pi";
import { TiBusinessCard } from "react-icons/ti";
import Button from "../../components/Button";

const InternContent = ({ data: { intern }, linkIndex, linkValue }) => {
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

  const handleChange = (e) => {
    console.log(e.target);
  };

  const dateOfBirth = "01/05/2000";

  return (
    <div className="bg-white p-6">
      {/* Personal Information */}
      {linkIndex === 0 && linkValue === "personal_information" && (
        <>
          <div>
            <h2 className="text-2xl font-semibold text-secondary mb-6">
              Personal Information
            </h2>
          </div>
          <div className="mt-6 text-md grid grid-cols-2 gap-4">
            <InfoBox
              label="Fullname"
              value={fullname}
              id="fullname"
              handleChange={handleChange}
            />
            <InfoBox label="Date of birth" value={dateOfBirth} id="dob" />
            <InfoBox label="Email" value={email} id="email" />
            <InfoBox label="Phone" value={phone} id="phone" />
            <InfoBox label="Nationality" value={nationality} id="nationality" />
            <InfoBox
              label={
                idOrPassport?.type === "nationalID"
                  ? "National ID"
                  : "PassportNumber"
              }
              value={idOrPassport?.number}
              id="idOrPassport"
            />
          </div>
          {/* Action Buttons */}
          <div className="flex justify-between items-center gap-4 mt-10">
            <Button
              label="Discard changes"
              customClass="bg-transparent border-1 border-mediumBlue !text-mediumBlue hover:bg-transparent"
            />
            <Button label="Save changes" />
          </div>
        </>
      )}

      {/* Identitiy Information */}
      {linkIndex === 1 && linkValue === "identitiy_information" && (
        <>
          <h2 className="text-2xl font-semibold text-secondary mb-6">
            Identitiy Information
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
          {/* Action Buttons */}
          <div className="flex justify-between items-center gap-4 mt-10">
            <Button
              label="Discard changes"
              customClass="bg-transparent border-1 border-mediumBlue !text-mediumBlue hover:bg-transparent"
            />
            <Button label="Save changes" />
          </div>
        </>
      )}

      {/* Academic Information */}
      {linkIndex === 2 && linkValue === "academic_information" && (
        <>
          <h2 className="text-2xl font-semibold text-secondary mb-6">
            Academic Information
          </h2>

          <div className="mt-6 text-md grid grid-cols-2 gap-4">
            <InfoBox
              label="Faculty of Graduation"
              value={facultyOfGraduation}
              id="facultyOfGraduation"
            />
            <InfoBox
              label="Year of Graduation"
              value={yearOfGraduation}
              id="yearOfGraduation"
            />
            <InfoBox
              label="Order of Graduate"
              value={orderOfGraduate}
              id="orderOfGraduate"
            />
            <InfoBox label="Grade" value={grade} id="grade" />
            <InfoBox
              label="Hospital ID Number"
              value={facultyIDNumber}
              id="facultyIDNumber"
            />

            <InfoBox
              label="Hospital"
              value={hospital + " Hospital"}
              id="hospital"
            />
          </div>
          {/* Action Buttons */}
          <div className="flex justify-between items-center gap-4 mt-10">
            <Button
              label="Discard changes"
              customClass="bg-transparent border-1 border-mediumBlue !text-mediumBlue hover:bg-transparent"
            />
            <Button label="Save changes" />
          </div>
        </>
      )}
    </div>
  );
};

export default InternContent;
