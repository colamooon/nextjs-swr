import Link from 'next/link';
import React, { FC } from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(0),
      textDecoration: 'none !important',
      userSelect: 'none',
      '-webkit-font-smoothing': 'antialiased',
      '-webkit-touch-callout': 'none',
    },
  }),
);

interface CustomLinkProps {
  href: string;
  as: string;
  className?: string;

  children: React.ReactNode;
}

const CustomLink: FC<CustomLinkProps> = ({
  href,
  as,
  children,
}: CustomLinkProps) => {
  const classes = useStyles();
  return (
    <Link href={href} as={as} passHref>
      <a className={classes.root}>{children}</a>
    </Link>
  );
};

export default CustomLink;
