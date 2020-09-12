import React from 'react';
import { Link } from 'react-router-dom';

import { MdStorage, MdMailOutline, MdPeople } from 'react-icons/md';
import { useAuth } from '../../hooks/auth';

import BlueLogoImg from '../../assets/logo-title-blue.svg';

import { Container } from './styles';

const Sidebar: React.FC = () => {
  const { user } = useAuth();
  return (
    <Container>
      <div className="sidebar-header">
        <img src={BlueLogoImg} alt="postex" />
        {user.username.toUpperCase()}
      </div>
      <ul>
        <li>
          <Link to="/">
            <MdStorage size="24" />
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/correspondences">
            <MdMailOutline size="24" />
            Correspondências
          </Link>
        </li>
        <li>
          <Link to="/">
            <MdPeople size="24" />
            Usuários
          </Link>
        </li>
      </ul>
    </Container>
  );
};

export default Sidebar;
