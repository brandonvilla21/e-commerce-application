import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import { ThemeProvider } from '@material-ui/styles';
import CustomAppBar from './index';
import { theme } from '../../../lib/withPageContext';
import Router from 'next/router';
import { eCommerceName } from '../../../shared/globals';
const mockedRouter = { push: () => {}, prefetch: () => {} };
//@ts-ignore
Router.router = mockedRouter;

const renderCustomAppBarComponent = ({ drawerOpen = false }) => {
  const handleDrawerOpen = jest.fn();
  return {
    component: render(
      <ThemeProvider theme={theme}>
        <CustomAppBar drawerOpen={drawerOpen} handleDrawerOpen={handleDrawerOpen}/>
      </ThemeProvider>
    ),
    handleDrawerOpen,
  }
}

describe('<CustomAppBar/>', () => {

  it('should render a login button', () => {
    const { component: { getByTestId, getByText } } = renderCustomAppBarComponent({ drawerOpen: true });

    const appBarMainMenu = getByTestId('custom-app-bar-acccount-icon');
    fireEvent.click(appBarMainMenu);
    expect(getByText('Login')).toBeInTheDocument();
  });

  it('should render a login button for mobile', () => {
    const { component: { getByTestId, getByText } } = renderCustomAppBarComponent({ drawerOpen: true });

    const appBarMainMenuMobile = getByTestId('custom-app-bar-acccount-icon-mobile');
    fireEvent.click(appBarMainMenuMobile);
    expect(getByText('Login')).toBeInTheDocument();
  });

  it('should render the website name', () => {
    const { component: { getByText } } = renderCustomAppBarComponent({ drawerOpen: true });
    expect(getByText(eCommerceName)).toBeInTheDocument();
  });
});