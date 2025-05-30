import React from "react";
import { Modal } from "@mui/material";
import Button from "../../components/Button";

const ConfirmDeleteMessage = ({
  openWarningAlert,
  handleClose,
  deletedObject,
  handleDeleteObject,
}) => {
  return (
    <Modal
      open={openWarningAlert}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="flex items-center justify-center"
    >
      <div className="p-6 bg-white">
        <p className="mb-6 text-xl font-semibold">
          Are you sure you want to delete this {deletedObject}
        </p>
        <div className="flex items-center gap-4 w-3/6 ml-auto">
          <Button
            label="Delete"
            customClass="!bg-error !border-error"
            handleClick={async () => {
              await handleDeleteObject();
              handleClose();
            }}
          />
          <Button
            label="Cancel"
            customClass=""
            handleClick={() => handleClose()}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDeleteMessage;
