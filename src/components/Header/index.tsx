import React from 'react';

import { FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../../hooks/auth';

import { Container } from './styles';

const Header: React.FC = () => {
  const { signOut } = useAuth();
  return (
    <Container>
      <button type="button" onClick={signOut}>
        Sair
        <FaSignOutAlt size="24" />
      </button>
    </Container>
  );
};

export default Header;
