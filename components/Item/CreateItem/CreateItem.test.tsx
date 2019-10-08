import React from 'react';
import { MockedProvider } from 'react-apollo/test-utils';
import { render, fireEvent } from 'react-testing-library';
import { act } from 'react-dom/test-utils';
import CreateItem, { CREATE_ITEM_MUTATION } from './index';
import { theme } from '../../../lib/withPageContext';
import { ThemeProvider } from '@material-ui/styles';
import wait from '../../shared/helper-functions/wait';
import Router from 'next/router';

// @ts-ignore
Router.router = {
  push: () => {},
  prefetch: () => {},
};

/**
 * Because the component itself is using the `wait` utility function,
 * we need to execute all component calls to this function with a
 * setTimeout that resolves within 0 milliseconds. 
 * 
 * This will also affect the `wait` calls within the curent test file, but
 * it does not matter, since these calls are used only to
 * wait for the next event loop, and with 0 milliseconds it is
 * enough.
 */
jest.mock('../../shared/helper-functions/wait', () => {
  return () => new Promise(resolve => setTimeout(resolve, 0));
});

/**
 * Create file from a base64/dataURL string.
 */
const dataURLtoFile = (dataurl: string, filename: string) => {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)![1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
}

const base64Image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAIAAABPxRC5AAAAA3NCSVQICAjb4U/gAAAAGXRFWHRTb2Z0d2FyZQBnbm9tZS1zY3JlZW5zaG907wO/PgAAABVJREFUCJlj/P//PwMSYGJABdTmAwBMRQMLfoYCmwAAAABJRU5ErkJggg==";
const testImageFile = dataURLtoFile(base64Image, 'test_image.png');

const initialItem = {
  title: 'My title test',
  description: 'My description test',
  price: 200000,
};

const variables = {
  title: initialItem.title,
  description: initialItem.description,
  imageFile: testImageFile,
  price: 20000000,
}

const mocks = [
  {
    request: {
      query: CREATE_ITEM_MUTATION,
      variables,
    },
    result: {
      data: {
        createItem: {
          __typename: 'Item',
          id: '123',
        }
      },
    },
  }
];

function createItemTest() {
  return render(
      <ThemeProvider theme={theme}>
        <MockedProvider mocks={mocks}>
          <CreateItem/>
        </MockedProvider>
      </ThemeProvider>
    );
}

describe('<CreateItem/>', () => {
  it('should register a new Item', async () => {
    const { getByText, getByLabelText, getByTestId } = createItemTest();

    // Find title, price and description input by label. Requires an ID on the TextField component
    const titleInput = getByLabelText( 'Título', { exact: false });
    const priceInput = getByLabelText( 'Precio', { exact: false });
    const descriptionInput = getByLabelText( 'Descripción', { exact: false });

    // Fill a change event on the inputs/textarea to change the current value
    fireEvent.change(descriptionInput, { target: { value: initialItem.description } });
    fireEvent.change(titleInput, { target: { value: initialItem.title } });
    fireEvent.change(priceInput, { target: { value: initialItem.price } });

    // Click on the select image button to trigger click event.
    const selectImageButton = getByText( 'Selecciona una imagen');
    fireEvent.click(selectImageButton);
    
    /**
     * Instead of clicking on the select image button, we have to find
     * the original input file in order to be able to change the target.files
     * property and update the state. This is a special case, becuase we're
     * testing files.
     * 
     * Find the element by testid, because it is a non-visible element from
     * the user perspective.
     */
    const selectImageInputFile = getByTestId( 'select-an-image-input' );

    // Special case to fire an event, because we are using change event on input file
    // @ts-ignore
    await act(async () => {
      fireEvent.change(selectImageInputFile, {
        target: { files: [testImageFile] },
      });
    });

    /**
     * Wait for the next iteration on the event loop to be able to remove
     * the disabled property from the resgister button.
     */
    await wait(0);

    const registerArticle = getByText( 'Registrar artículo' );
    fireEvent.submit(registerArticle);

    const loadingElement = getByTestId( 'loading-element' );
    expect(loadingElement).toBeInTheDocument();

    /**
     * Wait for the createItem promise to be resolved.
     */
    await wait(0);

    /**
     * Since the Item has already been created, there shouldn't
     * be a loading element on the page.
     */
    expect(loadingElement).not.toBeInTheDocument();
  });
});