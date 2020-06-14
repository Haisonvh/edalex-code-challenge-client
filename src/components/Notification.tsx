import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

interface Props {
  open: boolean;
  handleClose: Function;
  message:String;
}

export default function Notification(props:Props) {

  const handleCloseNotification = () => {
    props.handleClose();
  };
  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={props.open}
        autoHideDuration={3000}
        onClose={handleCloseNotification}
        message={props.message}
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseNotification}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
}
