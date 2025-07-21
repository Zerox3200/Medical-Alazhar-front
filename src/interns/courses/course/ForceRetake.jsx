import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import toast from "react-hot-toast";
import { useSubmitQuizProgressMutation } from "../../../services/intern/api/hooks/coursesHooks";

const EnforceRetake = ({
  open,
  setOpen,
  forceRetake,
  setForceRetake,
  quiz,
  selectedAnswers,
}) => {
  const [submitQuizProgress] = useSubmitQuizProgressMutation();
  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async () => {
    try {
      const response = await submitQuizProgress({
        courseId: quiz?.courseId,
        quizId: quiz?._id,
        forceRetake: !!forceRetake,
        answers: selectedAnswers,
      }).unwrap();

      console.log("response", response);
      if (response.status === "success") {
        toast.success(response?.message);
      }
    } catch (error) {
      toast.custom(() => (
        <div className="bg-white rounded-md p-4 text-center border-1 border-mistyMorning/20 shadow-md">
          <p className="font-semibold text-error">
            {error?.data?.message?.split(",")[0]},
          </p>
          <p className="text-secondary">
            {error?.data?.message?.split(",")[1]}{" "}
            {error?.data?.message?.split(",")[2]}{" "}
          </p>
        </div>
      ));
    }
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent>
          <DialogContentText>
            You already passed this quiz before would you like to retake it?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => {
              handleClose();
              setForceRetake(false);
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={async () => {
              handleClose();
              setForceRetake(true);
              await onSubmit();
            }}
            autoFocus
          >
            Next attempt
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default EnforceRetake;
