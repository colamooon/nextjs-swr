import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import Layout from 'components/layout/Layout';
import theme from 'lib/utils/theme';
import { AppProps } from 'next/app';
import React, { FC } from 'react';
import 'react-app-polyfill/ie11';
import 'styles/globals.css';

const App: FC<AppProps> = (props: AppProps) => {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default App;
