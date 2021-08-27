import React, { useState } from "react";
import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

const Notification = (props) => {
  const [notify, setNotify] = props;

  // const handleClose = () => {
  //   setShowSnackbar(false);
  // };

  return (
    <Snackbar
      open={notify.isOpen}
      autoHideDuration={6000}
      // onClose={handleClose}
      anchorOrigin={{ horizontal: "center", vertical: "top" }}
    >
      <Alert
        // onClose={handleClose}
        severity="error"
        elevation={10}
        variant="filled"
      >
        {notify.message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
