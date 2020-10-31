import { createContext } from 'react';
import { AuthState } from '../interfaces/AuthState';

export const AuthContext = createContext<{
  auth: {
    token: string;
    accountOrder: number;
  };
  setAuth: any
}>({
  auth: {
    token: '',
    accountOrder: 0
  },
  setAuth: (authState: AuthState) => authState
});
