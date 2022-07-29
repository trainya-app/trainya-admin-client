import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ThemeProvider } from 'styled-components';

import { SideBar } from 'components/SideBar';
import { ThemeProvider as CustomThemeProvider } from 'contexts/ThemeContext';
import GlobalStyle from 'styles/global';

import theme from 'styles/theme';

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

  useEffect(() => {
    setColorMode('dark');
  }, []);

  return (
    <CustomThemeProvider colorMode={colorMode} setColorMode={setColorMode}>
      <ThemeProvider theme={theme[colorMode]}>
        {router.asPath !== '/login' && <SideBar />}
        <Component {...pageProps} />
        <GlobalStyle />
      </ThemeProvider>
    </CustomThemeProvider>
  );
}

export default MyApp;
