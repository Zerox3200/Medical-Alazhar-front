import React from "react";
import _ from "lodash";
import { toast, Toaster } from "react-hot-toast";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import { useAcceptTrainingDomainsMutation } from "../../../services/supervisor/api/hooks/supervisorHooks";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

const ProcedureDetails = ({ open, handleClose, procedure }) => {
  const { id } = useSelector((state) => state.auth.user);
  const { internId } = useParams();
  const [acceptTrainingDomains] = useAcceptTrainingDomainsMutation();

  const dispatchReview = async (updatedState) => {
    try {
      const response = await acceptTrainingDomains({
        supervisorId: id,
        internId,
        domainType: "procedure",
        domainId: procedure?._id,
        updatedState,
      });

      if (response?.data?.data?.state === "accepted") {
        toast.success(response?.data?.data?.state);
        handleClose();
      }
      if (response?.data?.data?.state === "rejected") {
        toast.error(response?.data?.data?.state);
        handleClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="flex justify-center items-center"
      key={procedure._id}
    >
      <div className="w-7/12 m-auto bg-white p-6 focus:outline-0 rounded-lg">
        <Toaster />
        <div className="">
          <h2>
            Skill:{" "}
            <span className="text-primary/70">
              {_.startCase(procedure?.skill)}
            </span>
          </h2>
          <h2
            className="truncate"
            title={_.chain(procedure?.expectedLevel)
              .startCase()
              .replace(" ", ". ")}
          >
            Performance level:{" "}
            <span className="text-primary/70">
              {_.chain(procedure?.performanceLevel)
                .startCase()
                .replace(" ", ". ")}
            </span>
          </h2>
          <h2>
            Venue:{" "}
            <span className="text-primary/70">
              {_.startCase(procedure?.venue)}
            </span>
          </h2>
          <h2 className="">
            Hospital record:{" "}
            <span className="text-primary/70">{procedure?.hospitalRecord}</span>
          </h2>
        </div>
        <div className="flex gap-4 items-center mt-6 justify-end">
          <Button
            variant="contained"
            color="error"
            onClick={() => dispatchReview({ updatedState: "rejected" })}
          >
            Reject
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => dispatchReview({ updatedState: "accepted" })}
          >
            Accept
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ProcedureDetails;
