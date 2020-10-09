import React, { FC } from 'react';
import Head from 'next/head';
import Nav from './Nav';
import Footer from './Footer';

type Props = {
  title?: string;
  children: React.ReactNode;
};

const Layout: FC<Props> = ({ children, title = 'COLAMOOON' }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, minimum-scale=1, maximum-scale=1, user-scalable=no,shrink-to-fit=no"
      />
    </Head>
    <Nav />
    <main>{children}</main>
    <Footer />
  </div>
);

export default Layout;
