import React, { useState } from "react";
import _ from "lodash";
import { FaPenClip, FaPhone, FaRegEnvelope } from "react-icons/fa6";
import Input from "../components/Input";
import Button from "../components/Button";
import ImageUploader from "./ImageUploader";
import { Toaster } from "react-hot-toast";
import { useSupervisor } from "../../services/supervisor/api/hooks/supervisorHooks";
import { useSelector } from "react-redux";

const EditButton = () => {
  return (
    <div className="flex items-center gap-2 bg-white border-1 border-silverFrost/20 shadow-sm h-fit p-2 rounded-md cursor-pointer text-secondary hover:text-mistyMorning transition-colors duration-150">
      <FaPenClip />
      <span>Edit</span>
    </div>
  );
};

const Profile = ({ alt }) => {
  const [openImageUploaderModal, setOpenImageUploaderModal] = useState(false);
  const { id } = useSelector((state) => state.auth.user);
  const { supervisorData } = useSupervisor({ supervisorId: id });
  return (
    <div className="p-20">
      <Toaster />
      {openImageUploaderModal ? (
        <ImageUploader
          openImageUploaderModal={openImageUploaderModal}
          setOpenImageUploaderModal={setOpenImageUploaderModal}
        />
      ) : null}
      <div className="bg-white shadow-sm p-6 rounded flex justify-between">
        <div className="flex items-center gap-6 text-secondary">
          <div>
            <img
              src={
                "http://localhost:3000/" + supervisorData?.data?.profileImage
              }
              alt={alt}
              className="w-32 h-32 object-cover rounded-full cursor-pointer border-2 border-silverFrost/20"
              onClick={setOpenImageUploaderModal}
            />
          </div>
          <div className="flex flex-col gap-1 text-secondary/60">
            <h1>
              <span className="font-semibold">
                {supervisorData?.data?.fullname}
              </span>
            </h1>
            <h3 className="flex">
              <span>{_.startCase(supervisorData?.data?.speciality)}</span>{" "}
              <span className="inline-block mx-2">/</span>
              <span>{_.startCase(supervisorData?.data?.role)}</span>
            </h3>
            <h3>{_.startCase(supervisorData?.data?.hospital)} Hospital</h3>
          </div>
        </div>
        <EditButton />
      </div>

      <div className="bg-white shadow-sm p-6 rounded mt-6">
        <div className="flex justify-between">
          <h2 className="text-2xl text-secondary font-medium mb-6">
            Contact Details
          </h2>
          <EditButton />
        </div>
        <div>
          <div className="flex flex-col gap-1 text-secondary/60">
            <h3 className="flex items-center gap-2">
              <span>
                <FaRegEnvelope />
              </span>
              <span>{supervisorData?.data?.email}</span>
            </h3>

            <h3 className="flex items-center gap-2">
              <span>
                <FaPhone />
              </span>
              <span>{supervisorData?.data?.phone.toString().slice(2)}</span>
            </h3>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm p-6 rounded mt-6">
        <h2 className="text-2xl text-secondary font-medium mb-6">
          Change Password
        </h2>
        <form>
          <div className="grid grid-cols-3 gap-4 text-secondary/60">
            <div className="col-span-1">
              <Input placeholder="Current Password" />
            </div>
            <div className="col-span-1">
              <Input placeholder="New Password" />
            </div>
            <div className="col-span-1">
              <Input placeholder="Confirm Password" />
            </div>
          </div>

          <div className="w-fit ml-auto mt-4">
            <Button label="Change password" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
