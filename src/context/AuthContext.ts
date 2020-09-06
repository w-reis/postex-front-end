import { createContext } from 'react';

interface AuthContextData {
  username: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export default AuthContext;
