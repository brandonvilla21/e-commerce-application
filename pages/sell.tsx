import React from 'react';
import { makeStyles } from '@material-ui/styles';
import CreateItem from '../components/Item/CreateItem';

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  },
}));

function Index() {
  const classes = useStyles({});
  return (
    <div className={classes.root}>
      <p>Sell page</p>
      <CreateItem/>
    </div>
  );
}

export default Index;
