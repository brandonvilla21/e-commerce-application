import '../lib/bootstrap';
// --- Post bootstrap -----
import LoginForm from "../components/Login/LoginForm";
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    marginTop: '2em'
  },
  title: {
    display: 'flex',
    justifyContent: 'center'
  },
  loginForm: {
    display: 'flex',
    justifyContent: 'center'
  }
});

const Login = () => {
  const classes = useStyles()
  const handleSubmited = (res, err) => {
    console.log(res)
    console.log(err)
  }
  return (
    <div className={classes.root}>
      <Typography className={classes.title} component="h2" variant="h2" gutterBottom>Login</Typography>
      <div className={classes.loginForm}>
        <LoginForm onSubmitted={handleSubmited} />
      </div>
    </div>
  )
}

export default Login