import React from 'react';

import SignIn from './pages/SignIn';

import GlobalStyle from './styles/global';

import ToastContainer from './components/ToastContainer';

import { AuthProvider } from './hooks/auth';
import { ToastProvider } from './hooks/toast';

const App: React.FC = () => (
  <>
    <GlobalStyle />
    <AuthProvider>
      <SignIn />
    </AuthProvider>

    <ToastContainer />
  </>
);

export default App;
