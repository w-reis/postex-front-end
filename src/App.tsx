import React from 'react';

import SignIn from './pages/SignIn';

import GlobalStyle from './styles/global';

import ToastContainer from './components/ToastContainer';

import { AuthProvider } from './hooks/auth';

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
