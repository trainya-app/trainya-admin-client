/* eslint-disable import/no-unresolved */
import { ThemeProvider } from 'styled-components';

import React, { FC, ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import theme from './styles/theme';

const AllTheProviders: FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider theme={theme.light}>{children}</ThemeProvider>
);

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
