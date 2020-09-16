import React, { useCallback, useRef, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import { GoSearch } from 'react-icons/go';

import Input from '../../components/Input';
import Button from '../../components/Button';

import api from '../../services/api';
import { useAuth } from '../../hooks/auth';

import { Container } from './styles';

interface CorrespondenceData {
  id: number;
  recipient_name: string;
  object_number: string;
  status: string;
  created_at: Date;
  updated_at: Date;
}

const Correspondences: React.FC = () => {
  const [correspondences, setCorrespondences] = useState<CorrespondenceData[]>(
    [],
  );

  const history = useHistory();
  const formRef = useRef<FormHandles>(null);
  const { token } = useAuth();

  const loadCorrespondences = useCallback(async () => {
    const response = await api.get('correspondences', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setCorrespondences(response.data);
  }, [token]);

  useEffect(() => {
    loadCorrespondences();
  }, []);

  return (
    <Container>
      <div>
        <Form onSubmit={() => {}} ref={formRef}>
          <Input name="query" icon={GoSearch} placeholder="Buscar" autoFocus />
        </Form>

        <Button
          type="button"
          onClick={() => history.push('/correspondences/create')}
        >
          Novo
        </Button>
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
          {correspondences.map((correspondence) => (
            <tr key={correspondence.id}>
              <td>
                <label htmlFor="check">
                  <input type="checkbox" id="check" />
                </label>
              </td>
              <td>{correspondence.id}</td>
              <td>{correspondence.recipient_name}</td>
              <td>{correspondence.object_number}</td>
              <td>{correspondence.status}</td>
              <td>editar | excluir | entregar</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
};

export default Correspondences;
