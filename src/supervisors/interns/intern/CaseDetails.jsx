import React from "react";
import _ from "lodash";
import { toast, Toaster } from "react-hot-toast";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import { useAcceptTrainingDomainsMutation } from "../../../services/supervisor/api/hooks/supervisorHooks";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

const CaseDetails = ({ open, handleClose, theCase }) => {
  const { id } = useSelector((state) => state.auth.user);
  const { internId } = useParams();
  const [acceptTrainingDomains] = useAcceptTrainingDomainsMutation();

  const dispatchReview = async (updatedState) => {
    try {
      const response = await acceptTrainingDomains({
        supervisorId: id,
        internId,
        domainType: "case",
        domainId: theCase?._id,
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
      key={theCase._id}
    >
      <div className="w-7/12 m-auto bg-white p-6 focus:outline-0 rounded-lg">
        <Toaster />
        <div className="">
          <h2>
            Case type:{" "}
            <span className="text-primary/70">
              {_.startCase(theCase?.caseType)}
            </span>
          </h2>
          <h2>
            Gander:{" "}
            <span className="text-primary/70">
              {_.capitalize(theCase?.patientGender)}
            </span>
          </h2>
          <h2
            className="truncate"
            title={_.chain(theCase?.expectedLevel)
              .startCase()
              .replace(" ", ". ")}
          >
            Expected level:{" "}
            <span className="text-primary/70">
              {_.chain(theCase?.expectedLevel).startCase().replace(" ", ". ")}
            </span>
          </h2>
          <h2>
            Venue:{" "}
            <span className="text-primary/70">
              {_.startCase(theCase?.venue)}
            </span>
          </h2>
          <h2 className="">
            Age:{" "}
            <span className="text-primary/70">{theCase?.patientAge} years</span>
          </h2>
          <ul>
            EPAS:
            {theCase?.epas?.length > 0 ? (
              theCase?.epas.map((epa) => (
                <li className="block pl-4 text-primary/70">{epa}</li>
              ))
            ) : (
              <span className="text-primary/70"> none </span>
            )}
          </ul>
          <div className=" ">
            <p className="">
              Summary:{" "}
              <span className="text-primary/70">{theCase?.caseSummary}</span>
            </p>
            <p className="">
              Self reflections:{" "}
              <span className="text-primary/70">{theCase?.selfReflection}</span>
            </p>
          </div>
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

export default CaseDetails;
