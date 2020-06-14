import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

interface Props {
  open: boolean;
  handleClose: Function;
  message:String;
  messId:number;
}


export default function InfoDialog(props:Props) {
  const handleCloseDialog = () => {
    props.handleClose();
  };
  return (
    <React.Fragment>
      <Dialog
        open={props.open}
        disableEscapeKeyDown = {true}
        disableBackdropClick = {true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm"
      >
        <DialogTitle id="alert-dialog-title">
          {"Message id:" } {props.messId}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
