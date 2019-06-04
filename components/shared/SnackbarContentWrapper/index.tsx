import React, { ReactNode } from 'react';
import classNames from 'classnames';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { makeStyles } from '@material-ui/styles';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const useStyles = makeStyles(theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));

interface ICustomSnackbarContent {
  className?: string,
  message: ReactNode,
  onClose?: (event: React.MouseEvent<HTMLInputElement>) => void,
  noActions: boolean,
  variant: 'success' | 'warning' | 'error' | 'info',
}

function CustomSnackbarContent( props: ICustomSnackbarContent ) {
  const classes = useStyles();
  const { className, message, onClose, variant, noActions, ...other } = props;
  const Icon = variantIcon[variant];

  let actions = [
    <IconButton
      key="close"
      aria-label="Close"
      color="inherit"
      className={classes.error}
      onClick={onClose}
    >
      <CloseIcon className={classes.icon} />
    </IconButton>,
  ];

  if( noActions ) {
    actions = [];
  }

  return (
    <SnackbarContent
      className={classNames( classes[variant], className )}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames( classes.icon, classes.iconVariant )} />
          {message}
        </span>
      }
      action={actions}
      {...other}
    />
  );
}

export default CustomSnackbarContent;