import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {MessageEntity} from '../api/MessageEntity'
import { getAllMessages } from "../api/ApiClient";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Grid from '@material-ui/core/Grid';

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

const useCollection = () => {
  const [collection, setCollection] = React.useState<MessageEntity[]>([]);

  const loadCollection = () => {
    getAllMessages().then(collection =>
      setCollection(collection)
    );
  };

  return { collection, loadCollection };
};


export default function MainBody() {

  const { collection, loadCollection } = useCollection();
  const [message, setMessage] = React.useState('');

  //reload the list
  React.useEffect(() => {
    loadCollection();
    console.log("refresh")
  },[]);

  const addNewMessage = e => {
    //e.preventDefault();
    console.log(message);
  };

  const classes = useStyles();

  return (
    <div style={{ width: '100%' }}>
      <form onSubmit={addNewMessage}>
        <Grid container spacing={1}>
          <Grid item xs={10}>
            <TextField
              className={classes.textField}
              required
              id="standard-required"
              label="Required"
              fullWidth
              onChange = {event => setMessage(event.target.value)} />
          </Grid>
          <Grid item xs={2}>
            <Button
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
        <Typography className={classes.root} color="textSecondary">
          List here
        </Typography>
      </Box>
    </div>
  );
}
