import React from "react";
import InfoBox from "./InfoBox";
import ImagePopper from "./ImagePopper";
import { FaRegCircleUser } from "react-icons/fa6";
import { PiCertificateLight } from "react-icons/pi";
import { TiBusinessCard } from "react-icons/ti";

const SupervisorContent = ({ data: { supervisor } }) => {
  const { fullname, email, phone, hospital } = supervisor;

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
          </ul>
        </div>
      </div>

      <div className="shadow-md p-4">
        <h2 className="text-2xl font-semibold text-mediumGray mb-6">
          Identities
        </h2>
        <div className="rounded-sm mb-4 relative group min-h-64 grid grid-cols-2 gap-6">
          <div className="col-span-1 bg-softGray gap-4 min-h-48">
            {supervisor?.nationalIDImage ? (
              <ImagePopper
                src={"http://localhost:3000/" + supervisor?.nationalIDImage}
                alt={supervisor?.firstname}
                imageWidth="w-64"
                imageHeight="h-64"
              />
            ) : (
              <TiBusinessCard className="text-6xl block m-auto h-full text-mediumGray" />
            )}
          </div>
          <div className="col-span-1 bg-softGray gap-4 min-h-48">
            {supervisor?.mbbchCertificateImage ? (
              <ImagePopper
                src={
                  "http://localhost:3000/" + supervisor?.mbbchCertificateImage
                }
                alt={supervisor?.fullname}
                imageWidth="w-64"
                imageHeight="h-64"
              />
            ) : (
              <PiCertificateLight className="text-6xl block m-auto h-full text-mediumGray" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupervisorContent;
