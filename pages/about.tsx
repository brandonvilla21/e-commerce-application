import '../lib/bootstrap';
// --- Post bootstrap -----
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import Link from 'next/link';

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  },
}));

function About() {
  const classes = useStyles({});
  const [text, setText] = useState('Click one more time mate')
  return (
    <div className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Ajalax Solutions
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        ayuwoki
      </Typography>
      <Typography gutterBottom>
        <Link href="/">
          <a>Go to the main page</a>
        </Link>
      </Typography>
      <Button onClick={() => setText('Too much click for today mate')} variant="contained" color="primary">
        {text}
      </Button>
    </div>
  );
}

export default About;
