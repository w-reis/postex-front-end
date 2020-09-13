import React, { useRef } from 'react';
import { GoSearch } from 'react-icons/go';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import { Container } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

const Correspondences: React.FC = () => {
  const cartas = [
    {
      id: 1,
      name: 'Wellinton Fabricio dos Reis',
      number: '549843839274',
      status: 'pendente',
    },

    {
      id: 2,
      name: 'Alvaro Valdivino dos Reis',
      number: '549843839274',
      status: 'pendente',
    },
  ];
  const formRef = useRef<FormHandles>(null);
  return (
    <Container>
      <div>
        <Form onSubmit={() => {}} ref={formRef}>
          <Input name="query" icon={GoSearch} placeholder="Buscar" autoFocus />
        </Form>

        <Button type="button">Novo</Button>
      </div>

      <table>
        <thead>
          <tr>
            <th> </th>
            <th>ID</th>
            <th>Destinatário</th>
            <th>Nº do objeto</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {cartas.map((carta) => (
            <tr key={carta.id}>
              <td>
                <label htmlFor="check">
                  <input type="checkbox" id="check" />
                </label>
              </td>
              <td>{carta.id}</td>
              <td>{carta.name}</td>
              <td>{carta.number}</td>
              <td>{carta.status}</td>
              <td>editar | excluir | entregar</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
};

export default Correspondences;
