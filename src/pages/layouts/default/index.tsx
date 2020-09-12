import React from 'react';

import Header from '../../../components/Header';
import Sidebar from '../../../components/Sidebar';

import { Container } from './styles';

const DefaultLayout: React.FC = ({ children }) => {
  return (
    <Container>
      <Header />
      <Sidebar />
      {children}
    </Container>
  );
};

export default DefaultLayout;
