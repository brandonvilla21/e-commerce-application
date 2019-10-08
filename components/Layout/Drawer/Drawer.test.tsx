import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import { ThemeProvider } from '@material-ui/styles';
import Drawer from './index';
import { theme } from '../../../lib/withPageContext';
import Router from 'next/router';
import { listItemsTexts } from '../sharedLayoutInfo';
const mockedRouter = { push: () => {}, prefetch: () => {} };
//@ts-ignore
Router.router = mockedRouter;

const currentComponentContent = 'Ultra cool current component D:<';

const renderBaseDrawerComponent = () => {
  return render(
    <ThemeProvider theme={theme}>
      <Drawer currentComponent={<div>{currentComponentContent}</div>}/>
    </ThemeProvider>
  );
}

describe('<Drawer/>', () => {

  it('should render the current component prop inside the Drawer component', () => {
    const { getByText } = renderBaseDrawerComponent();
    expect(getByText(currentComponentContent)).toBeInTheDocument();
  });

  it('should render Drawer component with proper ListItems', () => {
    const { getByText, getAllByTestId } = renderBaseDrawerComponent();

    const itemsTexts = Object.values(listItemsTexts);
    const listItems = getAllByTestId('drawer-list-item');

    expect(itemsTexts.length).toBe(listItems.length);
    itemsTexts.forEach( listItemText => expect(getByText(listItemText)).toBeInTheDocument());
  });

  it('should render menu icon which is used to open the drawer', () => {
    const { getByTestId } = renderBaseDrawerComponent();
    const menuIcon = getByTestId('main-app-bar-menu-icon');
    expect(menuIcon).toBeInTheDocument();
  });

  it('should open the drawer and hide the MenuIcon button', () => {
    const { getByTestId } = renderBaseDrawerComponent();
    const menuIcon = getByTestId('main-app-bar-menu-icon');

    fireEvent.click(menuIcon);
    expect(menuIcon).not.toBeInTheDocument();
  });

  it('should show the Arrow/Chevron icon only when the drawer is open', () => {
    const { getByTestId } = renderBaseDrawerComponent();

    const menuIcon = getByTestId('main-app-bar-menu-icon');
    fireEvent.click(menuIcon);

    const arrowIcon = getByTestId('drawer-open-arrow-icon');
    expect(arrowIcon).toBeInTheDocument();

    fireEvent.click(arrowIcon);
    expect(arrowIcon).not.toBeInTheDocument();
  });
});