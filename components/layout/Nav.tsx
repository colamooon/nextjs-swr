import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import checkLogin from 'lib/utils/checkLogin';
import storage from 'lib/utils/storage';
import { useRouter } from 'next/router';
import React, { FC, useState } from 'react';
import useSWR from 'swr';
import LeftDrawer from './LeftDrawer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      ...theme.mixins.toolbar,
      flexGrow: 1,
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

const Nav: FC = () => {
  const classes = useStyles();
  const router = useRouter();
  const { data: currentUser } = useSWR('userCucur', storage);
  const isLoggedIn = checkLogin(currentUser);
  const [open, setOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    console.log(']-----] Nav::open [-----[', open);
    setOpen(open);
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <LeftDrawer toggleDrawer={toggleDrawer} open={open} />
    </div>
  );
};

export default Nav;
