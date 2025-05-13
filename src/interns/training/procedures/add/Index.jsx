import React from "react";
import Select from "react-select";
import RoundSelector from "../../components/RoundSelector";
import Skill from "../../components/Skill";
import TrainingDatePicker from "../../components/TrainingDatePicker";
import SeenAt from "../../components/SeenAt";
import TrainingInput from "../../components/TrainingInput";
import trainingData from "../../data";
import { Button, Modal } from "@mui/material";

const AddProcedure = ({ open, handleClose }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="flex items-center justify-center"
    >
      <div className="p-6 bg-softGray rounded outline-0 w-4/6">
        <h1 className="text-3xl">Add New Procedure</h1>
        <div className="mt-8 shadow-md p-4 gap-4 grid grid-cols-2">
          <RoundSelector listType={trainingData.procedures.proceduresList} />
          <Skill />
          <TrainingDatePicker />
          <SeenAt />
          <div className="col-span-1">
            <TrainingInput
              labelId="hospital-record"
              labelTitle="Hospital record"
              inputId="hospital-record"
            />
          </div>
          <div className="col-span-1">
            <label className="text-md font-medium block mb-2">
              Performance Level
            </label>
            <Select
              className="block w-full"
              options={trainingData.procedures.performanceLevels}
              placeholder="Performance Level"
            />
          </div>

          {/* Submit Button */}
          <div className="col-span-full">
            <Button variant="contained" color="primary" fullWidth>
              Add
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddProcedure;
