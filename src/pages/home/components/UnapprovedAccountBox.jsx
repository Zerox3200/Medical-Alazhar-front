import React from "react";
import { Link } from "react-router";
import { useApproveAccountMutation } from "../../../services/api/apiSlice";
import { toast, ToastContainer } from "react-toastify";

const UnapprovedAccountBox = ({ fullname, id, userType }) => {
  const [approveAccount, { isSuccess }] = useApproveAccountMutation();

  const handleApproval = async () => {
    try {
      await approveAccount({
        userId: id,
        approved: true,
      }).unwrap();

      if (isSuccess) {
        toast.success("Approved");
      }
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <>
      <ToastContainer position="top-center" />
      <div className="flex justify-between items-center gap-2 bg-softGray p-3 rounded-sm mb-4">
        <h3 className="text-md text-mediumGray">
          <Link
            to={`/admin/${userType}/${id}`}
            className="hover:text-mediumBlue"
          >
            {fullname}
          </Link>
        </h3>
        <div className="flex justify-between items-center gap-2">
          {/* <button
            type="submit"
            className="cursor-pointer bg-error py-1 px-3 rounded-sm text-red-200"
          >
            reject
          </button> */}

          <button
            type="submit"
            className="cursor-pointer bg-emeraldGreen py-1 px-2 rounded-sm text-green-200"
            onClick={handleApproval}
          >
            accept
          </button>
        </div>
      </div>
    </>
  );
};

export default UnapprovedAccountBox;
