import React, { createContext, useCallback } from 'react';

interface AuthContextData {
  username: string;
  signIn(): void;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export const AuthProvider: React.FC = ({ children }) => {
  const signIn = useCallback(() => {
    console.log('signIn is working...');
  }, []);
  return (
    <AuthContext.Provider value={{ username: 'wellinton', signIn }}>
      {children}
    </AuthContext.Provider>
  );
};
