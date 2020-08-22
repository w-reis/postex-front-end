import React from 'react';

import logoImg from '../../assets/logo.svg';

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

        <input placeholder="Usuário" />
        <input placeholder="Senha" type="password" />
        <button type="submit">Entrar</button>
      </form>
    </Background>
  </Container>
);

export default SignIn;
