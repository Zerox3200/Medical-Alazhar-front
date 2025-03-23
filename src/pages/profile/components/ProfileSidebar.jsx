import React from "react";
import profileImg from "../../../assets/images/profile.jpg";
import { FaUserEdit, FaCheckCircle } from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";

const ProfileSidebar = () => {
  // const [file, setFile] = useState(null);
  // const [uploadProfileImage, { isLoading }] = useUploadProfileImageMutation();

  // const handleFileChange = (event) => {
  //   setFile(event.target.files[0]); // Store the selected file
  // };

  // const handleUpload = async () => {
  //   if (!file) {
  //     alert("Please select a file first!");
  //     return;
  //   }
  //   const formData = new FormData();
  //   formData.append("profile-image", file); // 'profileImage' should match your API's expected field name

  //   try {
  //     const response = await uploadProfileImage({
  //       internId: "67dc8d794dfd9c4908693e48",
  //       imageFile: formData,
  //     }).unwrap();
  //     console.log("Upload successful:", response);
  //   } catch (err) {
  //     console.error("Upload failed:", err);
  //   }
  // };

  return (
    <div className="p-8 shadow-md border-r-1 border-mediumGray/20 h-full">
      {/* Profile Image */}
      <div className="mb-10">
        <div className="rounded-sm mb-4 relative group">
          {/* <input type="file" accept="image/*" onChange={handleFileChange} />
          <button onClick={handleUpload} disabled={isLoading}>
            {isLoading ? "Uploading..." : "Upload Image"}
          </button> */}
          <img
            src={profileImg}
            alt="Profile"
            className="w-full border-1 border-mediumGray/10 shadow-sm cursor-pointer rounded-sm p-2 "
          />
          <div className="bg-darkGray/20 absolute w-full h-full inset-0 opacity-0 duration-200 transition-all group-hover:opacity-100 flex justify-center items-center text-softGray text-6xl">
            <FaUserEdit className="cursor-pointer" />
          </div>
        </div>
        <div className="text-md text-darkGray text-center">
          <h3 className="text-xl flex justify-center items-center gap-1">
            <span></span>
            <span>
              {/* {approved ? (
                <FaCheckCircle className="text-emeraldGreen" title="approved" />
              ) : (
                <IoCloseCircle className="text-darkGray" title="not approved" />
              )} */}
            </span>
          </h3>
          <p className="text-mediumGray">
            {/* Last login in <strong>{date.toLocaleString()}</strong> */}
          </p>
        </div>
      </div>
      <div className="w-full h-[1px] bg-mediumGray/40"></div>
      <ul className="py-10">
        <li className="text-lg px-4 py-2 cursor-pointer duration-150 transition-colors hover:bg-softGray">
          General Information
        </li>
        <li className="text-lg px-4 py-2 cursor-pointer duration-150 transition-colors hover:bg-softGray">
          Cases
        </li>
        <li className="text-lg px-4 py-2 cursor-pointer duration-150 transition-colors hover:bg-softGray">
          Courses
        </li>
        <li className="text-lg px-4 py-2 cursor-pointer duration-150 transition-colors hover:bg-softGray">
          Change Password
        </li>
      </ul>
    </div>
  );
};

export default ProfileSidebar;
