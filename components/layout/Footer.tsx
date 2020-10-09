import React, { FC } from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(0),
      padding: theme.spacing(1),
      backgroundColor: theme.palette.primary.main,
      [theme.breakpoints.down('xs')]: {
        padding: theme.spacing(1),
      },
      color: '#FFFFFF',
      textAlign: 'center',
    },
  }),
);

const Footer: FC = () => {
  const classes = useStyles();
  return (
    <footer className={classes.root}>
      <p>Copyright ⓒ 2020 COLAMOOON Co., Ltd. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
