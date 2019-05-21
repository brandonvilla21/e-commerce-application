import React, { useState } from 'react';
import gql from 'graphql-tag';
import Router from 'next/router';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import blueGrey from '@material-ui/core/colors/blueGrey';
import { makeStyles } from '@material-ui/styles';
import { MutationFn } from 'react-apollo-hooks';
import {
  useCreateItemMutation,
  CreateItemMutationVariables,
  CreateItemMutation
} from '../../generated/apollo-components';
import useForm from '../../../hooks/useForm';
import SelectImage from './components/selectImage';
import SnackbarContentWrapper from '../../shared/SnackbarContentWrapper';

const blueGrey100 = blueGrey['100'];

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    margin: '25px',
    border: `1px solid ${blueGrey100}`,
    padding: '10px',
  },
  inputsContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    flexFlow: 'row wrap',
  },
  field: {
    width: '400px',
  },
  button: {
    margin: theme.spacing.unit,
    maxWidth: '300px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  }
}));

const CREATE_ITEM_MUTATION = gql`
  mutation createItem(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`;

const initialState: CreateItemMutationVariables = {
  title: '',
  description: '',
  image: '',
  largeImage: '',
  price: 0,
};

function submitItem(
  event: React.FormEvent<HTMLFormElement>,
  createItem: MutationFn<CreateItemMutation, CreateItemMutationVariables>,
  item: CreateItemMutationVariables

) {
  event.preventDefault();
  console.log(item);
  // createItem({variables: item});
};

function isFormValid(
  item: CreateItemMutationVariables,
  imageData: {
    selectedImage: null,
    srcImage: string,
    isImageToLarge: boolean,
  },
) {
  return item.description === '' ||
         item.title === '' ||
         !imageData.selectedImage ||
         imageData.isImageToLarge;
}

function CreateItem() {
  const { values, handleChange } = useForm(initialState);
  const [imageData, setImageData] = useState({ selectedImage: null, srcImage: '', isImageToLarge: false });
  const classes = useStyles();
  const createItem = useCreateItemMutation({ variables: initialState });
  return (
      <>
        <form className={classes.root} onSubmit={e => submitItem(e, createItem, values)}>

          <SelectImage setImageData={setImageData} imageData={imageData}/>

          <div className={classes.inputsContainer}>
            <TextField
              className={classes.field}
              id="title"
              name="title"
              label="Título"
              placeholder="Ingrese el título de su artículo"
              margin="normal"
              value={values.title}
              onChange={handleChange}
              type="text"
              variant="outlined"
            />
            <TextField
              className={classes.field}
              id="price"
              name="price"
              label="Precio"
              placeholder="Ingrese el precio de su artículo"
              margin="normal"
              value={values.price}
              onChange={handleChange}
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              variant="outlined"
            />
          </div>

          <TextField
            id="description"
            name="description"
            label="Descripción"
            placeholder="Ingrese la descripción de su artículo"
            margin="normal"
            value={values.description}
            onChange={handleChange}
            type="text"
            multiline
            rows="4"
            variant="outlined"
          />

          <div className={classes.buttonContainer}>
            <Button disabled={isFormValid(values, imageData)} className={classes.button} variant="contained" color="primary" type="submit">
              Registrar artículo
            </Button>
          </div>
        </form>

        <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
        open={imageData.isImageToLarge}
        ><SnackbarContentWrapper
        variant="error"
        noActions
        message="La imagen que seleccionaste sobrepasa el límite de 1MB. Por favor selecciona una imagen más ligera."
      /></Snackbar>
      </>
  );
}

export default CreateItem;
export { CREATE_ITEM_MUTATION };
