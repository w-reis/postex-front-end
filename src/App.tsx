import React from 'react';

import SignIn from './pages/SignIn';

import GlobalStyle from './styles/global';

import AuthContext from './context/AuthContext';

const App: React.FC = () => (
  <>
    <GlobalStyle />
    <AuthContext.Provider value={{ username: 'wellinton' }}>
      <SignIn />
    </AuthContext.Provider>
  </>
);

export default App;
