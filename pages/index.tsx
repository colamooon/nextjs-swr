import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { NextPage } from 'next';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(0),
    },
    main: {},
  }),
);

const Layout: NextPage = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <div className={classes.root}>
      <main className={classes.main}>Index</main>
      {matchesXs && <div>is mobile!</div>}
    </div>
  );
};
export default Layout;
