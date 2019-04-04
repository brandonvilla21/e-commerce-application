import React, { FormEvent, FunctionComponent } from 'react'
import gql from 'graphql-tag'
import { Mutation, MutationFn } from 'react-apollo';
import useInput from '../../../hooks/useInput';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '700px',
    padding: '0 .5em',
  },
  textField: {
    margin: '.5em 0',
  },
  button: {
    marginTop: '.5em',
  }
});

const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token,
      user {
        id,
        name,
        email
      }
    }
  }
`;
interface MutationVariables {
  email: string
  password: string
}
interface LoginFormProps {
  onSubmitted: Function
}

const LoginForm: FunctionComponent<LoginFormProps> = ({ onSubmitted }) => {
  const email = useInput('email')
  const password = useInput('password')
  const classes = useStyles()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>, login: MutationFn<any, MutationVariables>) => {
    try {
      event.preventDefault()
      const response = await login()
      onSubmitted(response, null)
    } catch (err) {
      onSubmitted(null, err)
    }
  }

  return (
    <Mutation
      mutation={LOGIN_MUTATION}
      variables={{ email: email.value, password: password.value }}
    >
      {(login: MutationFn<any, MutationVariables>, { error, data, loading }) => (
        <form className={classes.form} method="post" onSubmit={(e: FormEvent<HTMLFormElement> ) => handleSubmit(e, login)}>
          {error && <code>{JSON.stringify(error)}</code>}
          {data && <code>{JSON.stringify(data)}</code>}
          {loading && <code>loading...</code>}

          <TextField {...email} className={classes.textField} />
          <TextField type="password" {...password} className={classes.textField} />
          <Button type="submit" variant="contained" color="primary" className={classes.button}>
            Login
          </Button>
        </form>
      )}
    </Mutation>
  )
}

export default LoginForm