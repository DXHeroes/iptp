import { createContext } from 'react';
import { AuthState } from '../interfaces/AuthState';

export const AuthContext = createContext<{
  auth: {
    token: string;
  };
  setAuth: any;
}>({
  auth: {
    token: '',
  },
  setAuth: (authState: AuthState) => {},
});
