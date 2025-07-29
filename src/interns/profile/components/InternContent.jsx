import React, { useEffect, useState } from "react";
import InfoBox from "./InfoBox";
import { PiCertificateLight } from "react-icons/pi";
import { TiBusinessCard } from "react-icons/ti";
import Button from "../../components/Button";
import IdentityUploader from "./IdentityUploader";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import {
  useUploadMBBCHCertificateImageMutation,
  useUploadNationalIDImageMutation,
} from "../../../services/common/uploadApiSlice";
import { FaCamera, FaEye, FaEyeSlash } from "react-icons/fa";
import Input from "./Input";
import { useChangePasswordMutation } from "../../../services/common/authApiSlice";

const InternContent = ({ intern, linkIndex, linkValue }) => {
  const [visibleCurrentPassword, setVisibleCurrentPassword] = useState(false);
  const [visibleNewPassword, setVisibleNewPassword] = useState(false);
  const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false);
  const [IDImage, setIDImage] = useState(null);
  const [certificateImage, setCertificateImage] = useState(null);
  const [openCertificateUploaderModal, setOpenCertificateUploaderModal] =
    useState(false);
  const [openIDUploaderModal, setOpenIDUploaderModal] = useState(false);
  const { id } = useSelector((state) => state.auth.user);

  const [changePassword] = useChangePasswordMutation();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  /* MBBCH Certificate Handler */
  const [
    uploadMBBCHCertificateImage,
    { isLoading: certificateLoading, isSuccess: certificateSuccess },
  ] = useUploadMBBCHCertificateImageMutation();
  const handleMBBCHImageUpload = async () => {
    if (!certificateImage) {
      return toast.error("Please select an image");
    }
    const formData = new FormData();
    formData.append("mbbch-certificate-image", certificateImage);
    try {
      const response = await uploadMBBCHCertificateImage({
        internId: id,
        imageFile: formData,
      });
      if (response?.data?.code === 200) {
        toast.success(response?.data?.message);
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };

  /* National ID Handler */
  const [
    uploadNationalIDImage,
    { isLoading: IDLoading, isSuccess: IDSuccess },
  ] = useUploadNationalIDImageMutation();
  const handleIDImageUpload = async () => {
    if (!IDImage) {
      return toast.error("Please select an image");
    }
    const formData = new FormData();
    formData.append("nationalID-image", IDImage);
    try {
      const response = await uploadNationalIDImage({
        internId: id,
        imageFile: formData,
      });
      if (response?.data?.code === 200) {
        toast.success(response?.data?.message);
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };

  const [fullnameValue, setfullnameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [nationalityValue, setNationalityValue] = useState("");
  // const [idOrPassportValue, setIdOrPassportValue] = useState("");
  const [dateOfBirthValue, setDateOfBirthValue] = useState(new Date());

  const dateOfBirth = intern?.dob;

  // Convert Date Of Birth
  const date = new Date(dateOfBirth);
  const DOB = date.toLocaleDateString();

  useEffect(() => {
    setfullnameValue(intern?.fullname);
    setEmailValue(intern?.email);
    setPhoneValue(intern?.phone);
    setNationalityValue(intern?.nationality);
    // setIdOrPassportValue(idOrPassport);
    setDateOfBirthValue(intern?.dob);
  }, [intern]);

  // Dispatch password change
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      const response = await changePassword({
        userId: id,
        currentPassword,
        newPassword,
        confirmPassword,
      }).unwrap();

      if (response?.code === 200) {
        toast.success(response?.message);
      }
    } catch (error) {
      toast.error(error.data?.message),
        Object.keys(error.data?.errors).forEach((field) => {
          setError(error.data?.errors[field]?.path, {
            type: "manual",
            message: toast.error(error.data?.errors[field]?.msg),
          });
        });
    }
  };

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
              label="English name"
              value={fullnameValue}
              id="fullname"
              handleChange={(e) => setfullnameValue(e.target.value)}
            />
            <InfoBox
              label="Date of birth"
              value={DOB}
              id="dob"
              handleChange={(e) => setDateOfBirthValue(e.target.value)}
            />
            <InfoBox
              label="Email"
              value={emailValue}
              id="email"
              handleChange={(e) => setEmailValue(e.target.value)}
            />
            <InfoBox
              label="Phone"
              type="tel"
              pattern="[0-9]{10}"
              title="Please enter a 10-digit phone number"
              value={phoneValue}
              id="phone"
              handleChange={(e) => setPhoneValue(e.target.value)}
            />
            <InfoBox
              label="Nationality"
              value={nationalityValue}
              id="nationality"
              handleChange={(e) => setNationalityValue(e.target.value)}
            />
            <InfoBox
              label={
                intern?.idOrPassport?.type === "nationalID"
                  ? "National ID"
                  : "PassportNumber"
              }
              value={intern?.idOrPassport?.number}
              id="idOrPassport"
              // handleChange={(e) => setIdOrPassportValue(e.target.value)}
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
          <div className="rounded-sm mb-4 relative grid grid-cols-2 gap-6">
            <div className="col-span-1 bg-softGray gap-4">
              {!intern?.nationalIDImage ? (
                <div
                  className="hover:cursor-pointer hover:bg-secondary/20 flex justify-center items-center h-72"
                  onClick={() => setOpenIDUploaderModal(true)}
                >
                  <IdentityUploader
                    openIdentitiyUploaderModal={openIDUploaderModal}
                    setOpenIdentitiyUploaderModal={setOpenIDUploaderModal}
                    image={IDImage}
                    setImage={setIDImage}
                    isLoading={IDLoading}
                    isSuccess={IDSuccess}
                    handleImageUpload={handleIDImageUpload}
                    imageId="nationalID-image"
                    imageLabel="National ID image"
                  />

                  <TiBusinessCard className="text-6xl block m-auto text-mistyMorning" />
                </div>
              ) : (
                <div className="group relative overflow-hidden">
                  <IdentityUploader
                    openIdentitiyUploaderModal={openIDUploaderModal}
                    setOpenIdentitiyUploaderModal={setOpenIDUploaderModal}
                    image={IDImage}
                    setImage={setIDImage}
                    isLoading={IDLoading}
                    isSuccess={IDSuccess}
                    handleImageUpload={handleIDImageUpload}
                    imageId="nationalID-image"
                    imageLabel="National ID image"
                  />

                  <img
                    src={"http://localhost:3000/" + intern?.nationalIDImage}
                    className="w-full h-72 object-cover"
                  />
                  <div className="w-full h-full opacity-0 group-hover:opacity-100 translation-all duration-300 absolute top-0 left-0 bg-primary/20 text-white text-4xl flex justify-center items-center">
                    <FaCamera
                      className="cursor-pointer "
                      onClick={() => setOpenIDUploaderModal(true)}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="col-span-1 bg-softGray gap-4">
              {!intern?.mbbchCertificateImage ? (
                <div
                  className="hover:cursor-pointer hover:bg-secondary/20 flex justify-center items-center h-72"
                  onClick={() => setOpenCertificateUploaderModal(true)}
                >
                  <IdentityUploader
                    openIdentitiyUploaderModal={openCertificateUploaderModal}
                    setOpenIdentitiyUploaderModal={
                      setOpenCertificateUploaderModal
                    }
                    image={certificateImage}
                    setImage={setCertificateImage}
                    isLoading={certificateLoading}
                    isSuccess={certificateSuccess}
                    handleImageUpload={handleMBBCHImageUpload}
                    imageId="mbbch-certificate-image"
                    imageLabel="MBBCH Certificate Image"
                  />
                  <PiCertificateLight className="text-6xl block m-auto text-mistyMorning" />
                </div>
              ) : (
                <div className="group relative overflow-hidden">
                  <IdentityUploader
                    openIdentitiyUploaderModal={openCertificateUploaderModal}
                    setOpenIdentitiyUploaderModal={
                      setOpenCertificateUploaderModal
                    }
                    image={certificateImage}
                    setImage={setCertificateImage}
                    isLoading={certificateLoading}
                    isSuccess={certificateSuccess}
                    handleImageUpload={handleMBBCHImageUpload}
                    imageId="mbbch-certificate-image"
                    imageLabel="MBBCH Certificate Image"
                  />

                  <img
                    src={
                      "http://localhost:3000/" + intern?.mbbchCertificateImage
                    }
                    className="w-full h-72 object-cover"
                  />
                  <div className="w-full h-full opacity-0 group-hover:opacity-100 translation-all duration-300 absolute top-0 left-0 bg-primary/20 text-white text-4xl flex justify-center items-center">
                    <FaCamera
                      className="cursor-pointer "
                      onClick={() => setOpenCertificateUploaderModal(true)}
                    />
                  </div>
                </div>
              )}
            </div>
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
              value={intern?.facultyOfGraduation}
              id="facultyOfGraduation"
            />
            <InfoBox
              label="Year of Graduation"
              value={intern?.yearOfGraduation}
              id="yearOfGraduation"
            />
            <InfoBox
              label="Order of Graduate"
              value={intern?.orderOfGraduate}
              id="orderOfGraduate"
            />
            <InfoBox label="Grade" value={intern?.grade} id="grade" />
            <InfoBox
              label="Hospital ID Number"
              value={intern?.facultyIDNumber}
              id="facultyIDNumber"
            />

            <InfoBox
              label="Hospital"
              value={intern?.hospital + " Hospital"}
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
      {/* Change Password */}
      <form
        className="flex flex-col gap-4 text-secondary"
        onSubmit={handlePasswordChange}
      >
        {linkIndex === 3 && linkValue === "password" && (
          <>
            <div>
              <label htmlFor="current-password" className="mb-2 block">
                Current Password
              </label>
              <Input
                id="current-password"
                type={visibleCurrentPassword ? "text" : "password"}
                icon={!visibleCurrentPassword ? <FaEye /> : <FaEyeSlash />}
                handleChange={(e) => setCurrentPassword(e.target.value)}
                value={currentPassword}
                handleIconClick={() =>
                  setVisibleCurrentPassword(!visibleCurrentPassword)
                }
              />
            </div>
            <div>
              <label htmlFor="new-password" className="mb-2 block">
                New Password
              </label>
              <Input
                id="new-password"
                type={visibleNewPassword ? "text" : "password"}
                icon={!visibleNewPassword ? <FaEye /> : <FaEyeSlash />}
                handleChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
                handleIconClick={() =>
                  setVisibleNewPassword(!visibleNewPassword)
                }
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="mb-2 block">
                Confirm Password
              </label>
              <Input
                id="confirm-password"
                type={visibleConfirmPassword ? "text" : "password"}
                icon={!visibleConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                handleChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                handleIconClick={() =>
                  setVisibleConfirmPassword(!visibleConfirmPassword)
                }
              />
            </div>
            {/* Action Buttons */}
            <div className="flex justify-between items-center gap-4 mt-10">
              <Button
                label="Discard"
                customClass="bg-transparent border-1 border-mediumBlue !text-mediumBlue hover:bg-transparent"
              />
              <Button
                label="Apply changes"
                type="submit"
                handleClick={handlePasswordChange}
              />
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default InternContent;
