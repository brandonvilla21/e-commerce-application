import React, { useRef, ChangeEvent } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import AddAPhoto from '@material-ui/icons/AddAPhoto';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  button: {
      margin: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
    opacity: 0.8
  },
  card: {
    marginTop: 20,
    marginBottom: 20,
    display: 'flex',
    maxWidth: '100%',
    height: 250,
    justifyContent: 'center',
  },
  [theme.breakpoints.up( 'lg' )]: {
    generalContainer: {
      boxShadow: '0 10px 6px -6px #e2e0e0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      marginBottom: 15,
    },
  },
  media: {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
    flexGrow: 2,
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  textFieldName: {
    flexGrow: 3,
    minWidth: 300,
  }
}));

/**
 *
 * Validate if the current selected image does not overpass 
 * the allowed maximum size.
 */
function isValidSizeImage( imageFileSize: number ) {
  const maxMBs = 1;
  return imageFileSize <= maxMBs * 1024 * 1024;
}

/**
 *
 * Handle the image file manipulation for the file input.
 */
function handleImageSelectedHandler(event: ChangeEvent<HTMLInputElement>, setImageData: Function) {
  if ( event.target.files && event.target.files[0] ) {
    let reader: FileReader = new FileReader();
    reader.readAsDataURL( event.target.files[0] );
    reader.onload = ( e: Event ) => {
      setImageData((prevState: CustomImageData) => ({...prevState, srcImage: reader.result}))
    }
    setImageData((prevState: CustomImageData) => {
      if (event && event.target && event.target.files && event.target.files[0]) {
        return {...prevState, selectedImage: event.target.files[0]};
      } else
        return {...prevState};
    })

    if ( !isValidSizeImage( event.target.files[0].size ) )
      setImageData((prevState: CustomImageData) => ({...prevState, isImageToLarge: true}));
    else
      setImageData((prevState: CustomImageData) => ({...prevState, isImageToLarge: false}));


  }
}

interface CustomImageData {
  selectedImage: File | null;
  srcImage: string;
  isImageToLarge: boolean;
}

interface SelectImageProps {
  setImageData: Function,
  imageData: CustomImageData,
}

function selectImage({ setImageData, imageData }: SelectImageProps) {
  let image;

  const classes = useStyles();
  const fileInput = useRef<HTMLInputElement>(null);

  if( imageData.srcImage )
      image = <Card className={classes.card}>
                <img className={classes.media} src={imageData.srcImage} alt="Artículo"/>
              </Card>;

  return (
      <>
      <div className={classes.generalContainer}>

        <div className={classes.inputContainer}>

        <Button
          variant="contained"
          color="default"
          className={classes.button}
          onClick={() => {
            if(fileInput && fileInput.current) {
              fileInput.current.click();
            }
          }}>
            { imageData.srcImage ? 'Cambiar imagen' : 'Selecciona una imagen'}
            <AddAPhoto className={classes.rightIcon} />
        </Button>

        </div>

        {image}

      </div>
      <input 
        style={{ display: 'none' }}
        ref={fileInput}
        type="file" 
        onChange={event => handleImageSelectedHandler(event, setImageData)} 
        accept="image/png, image/jpeg, image/jpg, image/gif"
      />

      </>
  );
}

export default selectImage;