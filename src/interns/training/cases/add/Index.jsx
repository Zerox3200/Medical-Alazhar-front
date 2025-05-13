import React from "react";
import MainThemeOfCase from "./MainThemeOfCase";
import MainInfo from "./MainInfo";
import { Modal, Tooltip, Button } from "@mui/material";
import { FaCircleInfo } from "react-icons/fa6";

const AddCase = ({ open, handleClose }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="flex items-center justify-center overflow-y-scroll"
    >
      <div className="p-6 bg-softGray rounded outline-0 w-5/6">
        <h1 className="text-3xl font-semibold">Add New Case</h1>

        <div className="mt-4 grid grid-cols-12 items-start gap-6">
          {/* Main Information */}
          <div className="col-span-6 grid grid-cols-4 gap-6 items-center shadow-md p-6 h-full">
            <MainInfo />
          </div>
          {/* Main Theme of Case */}
          <div className="col-span-6 grid grid-cols-4 gap-6 items-center shadow-md p-6 h-full">
            <MainThemeOfCase />
          </div>

          <div className="col-span-6 shadow-md p-6">
            {/* Case Summary */}
            <label className="text-md font-medium mb-2">Case Summary</label>
            <textarea
              className="border-1 border-mediumGray/20 block w-full h-20 resize-none rounded-sm outline-0 p-2"
              id="case-summary"
            />
          </div>
          {/* Self Reflection */}
          <div className="col-span-6 shadow-md p-6">
            <label className="text-md font-medium flex gap-1 mb-2">
              Self-reflection:
              <Tooltip
                title="What did I do right?, What needs more development?, Plan for further development"
                placement="top"
                color="#0d6efd"
              >
                <FaCircleInfo className="text-xs" />
              </Tooltip>
            </label>
            <textarea
              className="border-1 border-mediumGray/20 block w-full h-20 resize-none rounded-sm outline-0 p-2"
              id="self-reflection"
            />
          </div>
        </div>
        {/* Submit Button */}
        <div className="col-span-full mt-4">
          <Button variant="contained" color="primary" fullWidth>
            Add
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AddCase;
