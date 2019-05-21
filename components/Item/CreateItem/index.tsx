import React, { useState } from 'react';
import gql from 'graphql-tag';
import Router from 'next/router';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
import { MutationFn } from 'react-apollo-hooks';
import {
  useCreateItemMutation,
  CreateItemMutationVariables,
  CreateItemMutation
} from '../../generated/apollo-components';
import useForm from '../../../hooks/useForm';
import SelectImage from './components/selectImage';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    margin: '25px',
  },
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

function CreateItem() {
  const { values, handleChange } = useForm(initialState);
  const [imageData, setImageData] = useState({ selectedImage: null, srcImage: '', isImageToLarge: false });
  const classes = useStyles();
  const createItem = useCreateItemMutation({ variables: initialState });
  return (
      <form className={classes.root} onSubmit={e => submitItem(e, createItem, values)}>

        <SelectImage setImageData={setImageData} imageData={imageData}/>

        <TextField
          id="title"
          name="title"
          label="Título"
          placeholder="Ingrese el título de su artículo"
          margin="normal"
          value={values.title}
          onChange={handleChange}
          type="text"
        />
        <TextField
          id="description"
          name="description"
          label="Descripción"
          placeholder="Ingrese la descripción de su artículo"
          margin="normal"
          value={values.description}
          onChange={handleChange}
          type="text"
        />
        <TextField
          id="price"
          name="price"
          label="Precio"
          placeholder="Ingrese el precio de su artículo"
          margin="normal"
          value={values.price}
          onChange={handleChange}
          type="number"
          InputProps={{ inputProps: { min: 0 } }}
        />
        <Button variant="contained" color="primary" type="submit">
          Registrar artículo
        </Button>
      </form>
  );
}

export default CreateItem;
export { CREATE_ITEM_MUTATION };
