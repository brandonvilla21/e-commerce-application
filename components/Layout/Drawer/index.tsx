import React from 'react';
import classNames from 'classnames';
import { makeStyles, useTheme } from '@material-ui/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import HomeTwoTone from '@material-ui/icons/HomeTwoTone';
import PeopleTwoTone from '@material-ui/icons/PeopleTwoTone';
import AddTwoTone from '@material-ui/icons/AddTwoTone';
import CustomAppBar from '../CustomAppBar';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { drawerWidth } from '../../../shared/globals';
import uuid from 'uuid/v4';
import Link from 'next/link';
import { ListItem, ListItemIcon, List, ListItemText } from '@material-ui/core';
import { listItemsTexts } from '../sharedLayoutInfo';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
    [theme.breakpoints.down('sm')]: {
      paddingTop: '20px',
    }

  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    marginLeft: '65px',
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    [theme.breakpoints.down('xs')]: {
      marginLeft: '0px',
    }
  },
}));

interface CustomDrawerProps {
  currentComponent: React.ReactNode,
}

function CustomDrawer({ currentComponent }: CustomDrawerProps) {
  const classes = useStyles();
  const theme: Theme = useTheme();
  const [drawerOpen, setOpen] = React.useState(false);

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  return (
    <div className={classes.root}>
      <CustomAppBar drawerOpen={drawerOpen} handleDrawerOpen={handleDrawerOpen}/>
      <Drawer
        variant="permanent"
        className={classNames(classes.drawer, {
          [classes.drawerOpen]: drawerOpen,
          [classes.drawerClose]: !drawerOpen,
        })}
        classes={{
          paper: classNames({
            [classes.drawerOpen]: drawerOpen,
            [classes.drawerClose]: !drawerOpen,
          }),
        }}
        open={drawerOpen}
      >
        <div className={classes.toolbar}>
          {
            drawerOpen ?
            <IconButton onClick={handleDrawerClose} data-testid="drawer-open-arrow-icon">
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
            : null
          }
        </div>
        <Divider />
        <List>
            <Link href="/" key={uuid()} prefetch>
              <a>
                <ListItem button data-testid="drawer-list-item">
                  <ListItemIcon><HomeTwoTone /></ListItemIcon>
                  <ListItemText primary={listItemsTexts.homepage} />
                </ListItem>
            </a>
            </Link>

            <Link href="/sell" key={uuid()} prefetch>
              <a>
                <ListItem button data-testid="drawer-list-item">
                  <ListItemIcon><AddTwoTone /></ListItemIcon>
                  <ListItemText primary={listItemsTexts.sellNewArticle} />
                </ListItem>
            </a>
            </Link>

            <Link href="/about" key={uuid()} prefetch>
              <a>
                <ListItem button data-testid="drawer-list-item">
                  <ListItemIcon><PeopleTwoTone /></ListItemIcon>
                  <ListItemText primary={listItemsTexts.about} />
                </ListItem>
            </a>
            </Link>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {currentComponent}
      </main>
    </div>
  );
}

export default CustomDrawer;