import {
  ThemeContext as CustomThemeContext,
  ThemeContextValues,
} from 'contexts/ThemeContext';
import { useContext } from 'react';

export const useTheme = (): ThemeContextValues => {
  const ctx = useContext(CustomThemeContext);
  return ctx;
};
