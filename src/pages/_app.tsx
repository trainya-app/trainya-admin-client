import { useState } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ThemeProvider } from 'styled-components';

import { SideBar } from 'components/SideBar';
import { ThemeProvider as CustomThemeProvider } from 'contexts/ThemeContext';
import GlobalStyle from 'styles/global';

import theme from 'styles/theme';
import { PageLayout } from 'layouts/PageLayout';

import '../styles/index.css';
import { ToastContainer } from 'components/Toast/ToastContainer';
import { serverApi } from 'services/serverApi';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const [colorMode, setColorMode] = useState(() => {
    try {
      const colorModeStoraged = window.localStorage.getItem('@color-mode') as
        | 'light'
        | 'dark';
      if (!colorModeStoraged) {
        return 'light';
      }
      return colorModeStoraged;
    } catch {
      return 'light';
    }
  });

  const token =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjYzNTIyMjc3LCJleHAiOjE2NjYxMTQyNzd9.IyPEPbroW5k147XHZj7pTms2g_KHZ_-IG5tuu-sx8RM';
  serverApi.defaults.headers.Authorization = token;

  return (
    <CustomThemeProvider colorMode={colorMode} setColorMode={setColorMode}>
      <ThemeProvider theme={theme[colorMode]}>
        {router.asPath !== '/login' ? (
          <PageLayout>
            <SideBar />
            <Component {...pageProps} />
          </PageLayout>
        ) : (
          <Component {...pageProps} />
        )}
        <GlobalStyle />
        <ToastContainer />
      </ThemeProvider>
    </CustomThemeProvider>
  );
}

export default MyApp;
