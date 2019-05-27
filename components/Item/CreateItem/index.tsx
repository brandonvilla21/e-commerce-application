import React, { useState } from 'react';
import gql from 'graphql-tag';
import Router from 'next/router';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import blueGrey from '@material-ui/core/colors/blueGrey';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/styles';
import Dinero from 'dinero.js';
import { MutationFn } from 'react-apollo';
import {
  CreateItemComponent,
  CreateItemMutationVariables,
  CreateItemMutation,
  
} from '../../generated/apollo-components';
import useForm from '../../../hooks/useForm';
import SelectImage from './components/selectImage';
import SnackbarContentWrapper from '../../shared/SnackbarContentWrapper';
import NumberMaterialInputFormat from '../../shared/NumberMaterialInputFormat';
import wait from '../../shared/helper-functions/wait';

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
  mutation createItem($title: String!, $description: String!, $price: Int!, $imageFile: Upload!) {
    createItem(title: $title, description: $description, price: $price, imageFile: $imageFile) {
      id
    }
  }
`;

const initialState: CreateItemMutationVariables = {
  title: '',
  description: '',
  imageFile: null,
  price: 0,
};

async function submitItem(
  event: React.FormEvent<HTMLFormElement>,
  createItem: MutationFn<CreateItemMutation, CreateItemMutationVariables>,
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>,
  item: { description: string; title: string; price: number },
  imageData: { selectedImage: File | null; srcImage: string; isImageToLarge: boolean }
  ) {
    event.preventDefault();
    const priceCents = toCents({ amount: item.price }).getAmount();

    setIsSubmitting(true);

    const variables = {
      title: item.title,
      description: item.description,
      price: priceCents,
      imageFile: imageData.selectedImage,
    };

    const [result] = await Promise.all([
      createItem({ variables }),
      // Wait at least 1.5 seconds to avoid abrupt UI changes. Little UX enhancement.
      wait(1500),
    ]);

    setIsSubmitting(false);

    Router.push('/');
};

interface ToCentsProps {
  amount: number,
  factor?: number,
  currency?: string,
}
function toCents({ amount, factor = Math.pow(10, 2), currency = 'MXN'}: ToCentsProps) {
  const dineroInstance = Dinero({ amount: Math.round(amount * factor), currency });
  return dineroInstance;
}

function isFormInvalid(
  item: { description: string; title: string; price: number },
  imageData: {
    selectedImage: null | File,
    srcImage: string,
    isImageToLarge: boolean,
  },
  ) {
    return item.description === '' ||
         item.title === '' ||
         !imageData.selectedImage ||
         imageData.isImageToLarge;
}

interface SelectImageData {
  selectedImage: null | File, 
  srcImage: '',
  isImageToLarge: false
};

function CreateItem() {
  const { values, handleChange } = useForm({
    description: initialState.description,
    title:initialState.title,
  });
  const [imageData, setImageData] = useState<SelectImageData>({ selectedImage: null, srcImage: '', isImageToLarge: false });
  const [price, setPrice] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const createItem = useCreateItemMutation({ variables: initialState });
  const classes = useStyles();

  return (
      <>
        <form className={classes.root} onSubmit={e => submitItem(e, createItem, setIsSubmitting, { ...values, price}, imageData)}>

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

            <NumberMaterialInputFormat
              propsNumberFormat={{
                allowNegative: false,
                decimalScale: 2,
                value: price,
                prefix: '$ ',
                thousandSeparator: true,
                onValueChange: ({floatValue}: { floatValue: number }) => setPrice(floatValue)
              }}

              propsTextField={{
                className: classes.field,
                id: 'price',
                name: 'price',
                label: 'Precio',
                placeholder: 'Ingrese el precio de su artículo',
                margin: 'normal',
                variant: 'outlined',
              }}
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
            <Button disabled={isFormInvalid({ ...values, price}, imageData)} className={classes.button} variant="contained" color="primary" type="submit">
              Registrar artículo
            </Button>
          </div>
          {isSubmitting ? <LinearProgress variant="query" />: null}
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
