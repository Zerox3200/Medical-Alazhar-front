import React, { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import {
  Box,
  Button,
  List,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";
import { FaPen } from "react-icons/fa6";
import DarkButton from "../../../components/DarkButton";
import { useChangeSupervisorRoleMutation } from "../../../../services/api/adminApiSlice";
import { useParams } from "react-router";

const options = ["coordinator", "supervisor"];

const ConfirmationDialogRaw = (props) => {
  const params = useParams();
  const [changeSueprvisorRole] = useChangeSupervisorRoleMutation();

  const { onClose, value: valueProp, open, ...other } = props;
  const [value, setValue] = useState(valueProp);
  const radioGroupRef = useRef(null);

  useEffect(() => {
    if (!open) setValue(valueProp);
  }, [valueProp, open]);

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const handleCancel = () => onClose();

  const handleOk = async () => {
    onClose(value);
    const response = await changeSueprvisorRole({
      supervisorId: params?.supervisorId,
      role: value,
    }).unwrap();
    if (response?.code === 200) toast.success(response?.message);
    if (response?.code !== 200) toast.error(response?.message);
  };

  const handleChange = (event) => setValue(event.target.value);

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
      maxWidth="xs"
      open={open}
      slotProps={{ transition: { onEntering: handleEntering } }}
      {...other}
    >
      <DialogTitle>Select Role</DialogTitle>
      <DialogContent dividers>
        <RadioGroup
          ref={radioGroupRef}
          aria-label="role"
          name="role"
          value={value}
          onChange={handleChange}
        >
          {options.map((option) => (
            <FormControlLabel
              value={option}
              key={option}
              control={<Radio />}
              label={option}
            />
          ))}
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleOk}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
};

const RoleList = () => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const handleClickListItem = () => {
    setOpen(true);
  };

  const handleClose = (newValue) => {
    setOpen(false);

    if (newValue) {
      setValue(newValue);
    }
  };

  return (
    <Box>
      <ToastContainer position="top-center" />
      <List component="div" role="group">
        <DarkButton
          label="Change Role"
          icon={<FaPen />}
          handleClick={handleClickListItem}
        />

        <ConfirmationDialogRaw
          id="supervisor-role"
          keepMounted
          open={open}
          onClose={handleClose}
          value={value}
        />
      </List>
    </Box>
  );
};

export default RoleList;
