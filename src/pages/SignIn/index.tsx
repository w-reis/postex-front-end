import React from 'react';
import { FiUser, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';

const SignIn: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/ban-types
  function handleSubmit(data: object): void {
    console.log(data);
  }

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="Postex" />
      </Content>
      <Background>
        <Form onSubmit={handleSubmit}>
          <img src={logoImg} alt="Postex" />
          <h1>Fazer login</h1>

          <Input name="user" icon={FiUser} placeholder="Usuário" />
          <Input
            name="password"
            icon={FiLock}
            placeholder="Senha"
            type="password"
          />
          <Button type="submit">Entrar</Button>
        </Form>
      </Background>
    </Container>
  );
};

export default SignIn;
