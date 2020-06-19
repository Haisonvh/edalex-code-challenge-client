import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {MessageEntity} from '../api/MessageEntity'
import {getAllMessages,postMessages,deleteMessages} from "../api/ApiClient";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Grid from '@material-ui/core/Grid';
import TableView from "./TableView";
import Notification from "./Notification"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(6, 0, 3),
    },
    lightBulb: {
      verticalAlign: 'middle',
      marginRight: theme.spacing(1),
    },
    button: {
      margin: theme.spacing(2),
    },
    textField:{
      margin:theme.spacing(2),
    },
    container: {
      display: 'grid',
      gridTemplateColumns: 'repeat(12, 1fr)',
      gridGap: theme.spacing(3),
    },
  }),
);

export default function MainBody() {

  //const { collection, loadCollection } = useCollection();
  const [collection, setCollection] = React.useState<MessageEntity[]>([]);
  const loadCollection = () => {
    getAllMessages()
      .then(collection => setCollection(collection))
      .catch(error => {
        //console.log(error);
        handleOpenNotification('Cannot get data')});
  };

  const [message, setMessage] = React.useState('');
  const [openNotification,setOpenNotification] = React.useState(false);
  const [notificationMess,setNotificationMess] = React.useState('');

  //pre-load the list
  React.useEffect(() => {
    loadCollection();
  },[]);

  const addNewMessage = e => {
    e.preventDefault();
    var data:MessageEntity={id:0, message:message, link:''};
    postMessages(data)
      .then(()=>loadCollection()).then(() => setMessage(""))
      .catch(error => {
        //console.log(error);
        handleOpenNotification('Cannot add message')});
  };

  const deleteMessage = (data:MessageEntity) => {
    deleteMessages(data.id)
      .then(()=>loadCollection())
      .catch(error => {
        //console.log(error);
        handleOpenNotification('Cannot delete message')});
  }

  const handleOpenNotification = (mess:string) => {
    console.log(mess);
    setOpenNotification(true);
    setNotificationMess(mess);
  }

  const handleCloseNotification = () => {
    setOpenNotification(false);
  }

  const classes = useStyles();

  return (
    <div style={{ width: '100%' }}>
      <form onSubmit={addNewMessage}>
        <Grid container spacing={1}>
          <Grid item xs={10}>
            <TextField
              data-testid="test-textfield-add"
              className={classes.textField}
              value = {message}
              required
              id="standard-required"
              label="Required"
              fullWidth
              onChange = {event => setMessage(event.target.value)} />
          </Grid>
          <Grid item xs={2}>
            <Button
              data-testid="test-button-add"
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              className={classes.button}
              startIcon={<AddCircleIcon />}
              >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>

      <Box display="flex" justifyContent="center">
        <TableView data={collection} deleteAction={deleteMessage}/>
      </Box>
      <Notification open = {openNotification} handleClose = {handleCloseNotification} message = {notificationMess}/>
    </div>
  );
}
