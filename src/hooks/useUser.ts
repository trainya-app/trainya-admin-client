import { UserContext, UserContextProps } from 'contexts/UserContext';
import { useContext } from 'react';

export const useUser = () => {
  const ctx = useContext(UserContext);
  return ctx;
};
