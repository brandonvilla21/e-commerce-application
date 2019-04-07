import React from 'react';
import { render, fireEvent, cleanup, waitForElement } from 'react-testing-library';
// this adds custom jest matchers from jest-dom
import 'jest-dom/extend-expect';
import { MockedProvider } from 'react-apollo/test-utils';
import LoginForm, { LOGIN_MUTATION } from './index';

const user = {
  email: 'mysupercool@email.com',
  password: 'supersecretstuff',
};

const mocks = [
  {
    request: {
      query: LOGIN_MUTATION,
      variables: {
        email: user.email,
        password: user.password,
      },
    },
    result: {
      data: {
        login: {
          __typename: 'AuthPayload',
          token: 'ultratoken123',
          user: {
            __typename: 'User',
            id: 'abc123',
            email: user.email,
            name,
          },
        }
      },
    },
  }
];

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

describe('<LoginFrom/>', () => {
  it('should fill the email and password fields and login in', async () => {
    // given ----------------------------
    
    const onSubmitted = jest.fn();
    const { 
      getByLabelText, 
      getByText,
      // debug,
    } = render(
      <MockedProvider mocks={mocks}>
        <LoginForm onSubmitted={onSubmitted}/>
      </MockedProvider>
    );

    // Debug is very useful to print the current component on the console.
    // debug();

    // when ----------------------------
    // Find email and password input by label. Requires an ID on the TextField component
    const emailInput = getByLabelText( 'Email', { exact: false });
    const password = getByLabelText( 'Password', { exact: false });

    // Fill the email and password inputs.
    fireEvent.change(emailInput, { target: { value: user.email } });
    fireEvent.change(password, { target: { value: user.password } });

    // Click on the Login button to trigger submit evente.
    const loginButton = getByText( 'Login');
    fireEvent.submit(loginButton);

    // Wait for the successful login message to be rendered.
    await waitForElement( () => getByText( 'Successful login!' ));

    // then ----------------------------
    expect( getByText( 'Successful login!' ) ).toBeInTheDocument();    
  })
});