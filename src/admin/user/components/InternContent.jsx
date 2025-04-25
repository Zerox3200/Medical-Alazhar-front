import React, { useState } from "react";
import InfoBox from "./InfoBox";
import { TiBusinessCard } from "react-icons/ti";
import { PiCertificateLight } from "react-icons/pi";
import {
  useUploadMBBCHCertificateImageMutation,
  useUploadNationalIDImageMutation,
} from "../../../../services/api/apiSlice";
import { toast, ToastContainer } from "react-toastify";
import ImageUpload from "./ImageUpload";

const InternContent = ({ data: { user } }) => {
  const [file, setFile] = useState(null);

  console.log("file", file);
  const [uploadNationalIDImage, { isLoading }] =
    useUploadNationalIDImageMutation();
  const [uploadMBBCHCertificateImage] =
    useUploadMBBCHCertificateImageMutation();

  const handleIDFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const uploadIDFile = async () => {
    if (!file || !user._id) {
      toast.error("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("nationalID-image", file);

    try {
      const response = await uploadNationalIDImage({
        internId: user._id,
        imageFile: formData,
      }).unwrap();
      toast.success(response.message);
      setFile(null);
    } catch (err) {
      toast.error(err.data?.message);
    }
  };

  const handleMBBCHFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const uploadMBBCHFile = async () => {
    if (!file || !user._id) {
      toast.error("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("mbbch-certificate-image", file);

    try {
      const response = await uploadMBBCHCertificateImage({
        internId: user._id,
        imageFile: formData,
      }).unwrap();
      toast.success(response.message);
      setFile(null);
    } catch (err) {
      toast.error(err.data?.message);
    }
  };
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
  } = user;

  return (
    <div className="mt-8">
      <ToastContainer />
      {/*  Personal Information */}
      <div className="shadow-md p-4">
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

      {/* Uploads */}
      <div className="shadow-md p-4">
        <h2 className="text-2xl font-semibold text-mediumGray mb-6">
          Identities
        </h2>
        <div className="mt-6 grid grid-cols-2 items-center gap-4 min-h-48">
          <ImageUpload
            inputId="nationalID-file"
            labelName="nationalID-file"
            file={file}
            handleFileChange={handleIDFileChange}
            imageType={user?.nationalIDImage}
            isLoading={isLoading}
            uploadFile={uploadIDFile}
            imagePlaceholder={
              <TiBusinessCard className="text-6xl block m-auto text-mediumGray" />
            }
          />
          <ImageUpload
            inputId="mbbchCertificate-file"
            labelName="mbbchCertificate-file"
            file={file}
            handleFileChange={handleMBBCHFileChange}
            imageType={user?.mbbchCertificateImage}
            isLoading={isLoading}
            uploadFile={uploadMBBCHFile}
            imagePlaceholder={
              <PiCertificateLight className=" text-6xl block m-auto text-mediumGray" />
            }
          />
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
                idOrPassport.type === "nationalID"
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
