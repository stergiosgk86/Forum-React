import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function ActionAlerts() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Alert onClose={() => {}}>You're successfully registered. Please login to continue!</Alert>
      <Alert
        action={
          <Button color="inherit" size="small">
            UNDO
          </Button>
        }
      >
        You're successfully registered. Please login to continue!
      </Alert>
    </div>
  );
}

export default ActionAlerts;