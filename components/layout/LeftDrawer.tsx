import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import MailIcon from '@material-ui/icons/Mail';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import clsx from 'clsx';
import CustomLink from 'components/common/CustomLink';
import { useRouter } from 'next/router';
import React, { FC } from 'react';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(0),
      display: 'flex',
    },
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerContainer: {
      overflow: 'auto',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }),
);

interface Props {
  toggleDrawer: (open) => (event) => void;
  open: boolean;
}
const LeftDrawer: FC<Props> = ({ toggleDrawer, open }: Props) => {
  const classes = useStyles();

  const list = () => (
    <div
      className={clsx(classes.list)}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Divider />
      <List>
        <CustomLink href="/" as={`/`}>
          <ListItem button key="home">
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="home" />
          </ListItem>
        </CustomLink>
        <CustomLink href="/samples" as={`/samples`}>
          <ListItem button key="samples">
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="samples" />
          </ListItem>
        </CustomLink>
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        {list()}
      </Drawer>
    </div>
  );
};

export default LeftDrawer;
