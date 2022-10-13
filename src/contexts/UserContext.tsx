import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { serverApi } from 'services/serverApi';
import jwt from 'jsonwebtoken';
import { destroyCookie, parseCookies } from 'nookies';
import { useRouter } from 'next/router';

interface User {
  id: number;
  role_id: number;
  name: string;
  birth_date: string;
  payment_date: string;
  daily_workload: number;
  weekdays_workload: number;
  phone: string;
  email: string;
  wage: number;
  password: string;
  profile_img: string;
  created_at: string;
  updated_at: string;
  gymEmployee: {
    gym_id?: number;
  };
}

export interface UserContextProps {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
  handleLogout: () => void;
}

export const UserContext = createContext({} as UserContextProps);

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState({} as User);

  const router = useRouter();
  const cookies = parseCookies();
  const userToken = jwt.decode(cookies.token) as { id: string };

  useEffect(() => {
    (async () => {
      const { data } = await serverApi.get(`/employees/${userToken?.id}`);
      console.log(data);
      setUser(data.employee);
    })();
  }, []);

  const handleLogout = useCallback(() => {
    setUser({} as User);
    destroyCookie(null, 'token');
    router.push('/login');
  }, []);

  const contextValues: UserContextProps = useMemo(
    () => ({ user, setUser, handleLogout }),
    [user]
  );

  return (
    <UserContext.Provider value={contextValues}>
      {children}
    </UserContext.Provider>
  );
};
