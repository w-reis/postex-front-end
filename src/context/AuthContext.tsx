import React, { createContext, useCallback } from 'react';
import api from '../services/api';

interface SignInCredentials {
  username: string;
  password: string;
}

interface AuthContextData {
  name: string;
  signIn(credentials: SignInCredentials): Promise<void>;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export const AuthProvider: React.FC = ({ children }) => {
  const signIn = useCallback(async ({ username, password }) => {
    const response = await api.post('sessions/user', {
      username,
      password,
    });

    console.log(response);
  }, []);
  return (
    <AuthContext.Provider value={{ name: 'wellinton', signIn }}>
      {children}
    </AuthContext.Provider>
  );
};
