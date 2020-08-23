import React from 'react';
import { FiUser, FiLock } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';

import { Container, Content, Background } from './styles';

const SignIn: React.FC = () => (
  <Container>
    <Content>
      <img src={logoImg} alt="Postex" />
    </Content>
    <Background>
      <form>
        <img src={logoImg} alt="Postex" />
        <h1>Fazer login</h1>

        <Input name="user" icon={FiUser} placeholder="Usuário" />
        <Input
          name="password"
          icon={FiLock}
          placeholder="Senha"
          type="password"
        />
        <button type="submit">Entrar</button>
      </form>
    </Background>
  </Container>
);

export default SignIn;
