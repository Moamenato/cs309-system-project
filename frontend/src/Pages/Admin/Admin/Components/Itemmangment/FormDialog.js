import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

const FormDialog = ({
  open,
  onClose,
  title,
  onSubmit,
  submitText = "Submit",
  isSubmitDisabled = false,
  children,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      fullWidth={true}
    >
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <form onSubmit={onSubmit}>{children}</form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onSubmit} color="primary" disabled={isSubmitDisabled}>
          {submitText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormDialog;
