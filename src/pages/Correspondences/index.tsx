import React, { useCallback, useRef, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import { GoSearch } from 'react-icons/go';
import { MdEdit, MdDelete } from 'react-icons/md';

import Input from '../../components/Input';
import Button from '../../components/Button';
import SmallButton from '../../components/SmallButton';

import api from '../../services/api';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

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
  const { token, signOut } = useAuth();
  const { addToast } = useToast();

  const loadCorrespondences = useCallback(async () => {
    try {
      const response = await api.get('correspondences', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCorrespondences(response.data);
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Sua sessão expirou!',
        description: 'Faça login novamente para utilizar o Postex.',
      });
      signOut();
    }
  }, [token, addToast, signOut]);

  const goToEdit = useCallback(
    (id: number) => {
      history.push({
        pathname: '/correspondences/edit',
        state: { id: id.toString() },
      });
    },
    [history],
  );

  const deleteCorrespondence = useCallback(
    async (id: number) => {
      try {
        await api.delete(`/correspondences/${id.toString()}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        loadCorrespondences();
      } catch (error) {
        addToast({
          type: 'error',
          title: 'Erro ao deletar;',
          description: 'Ocorreu um erro ao deletar a correspondência.',
        });
      }
    },
    [addToast, loadCorrespondences, token],
  );

  useEffect(() => {
    loadCorrespondences();
  }, [loadCorrespondences]);

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
          {correspondences.length !== 0 ? (
            correspondences.map((correspondence) => (
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
                <td>
                  <SmallButton
                    icon={MdEdit}
                    backgroundColorCode="#0269D9"
                    onClick={() => goToEdit(correspondence.id)}
                  />
                  <SmallButton
                    icon={MdDelete}
                    backgroundColorCode="#C93934"
                    onClick={() => deleteCorrespondence(correspondence.id)}
                  />
                  <SmallButton backgroundColorCode="#4FA845">
                    Entregar
                  </SmallButton>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} align="center">
                Nenhuma correspondência cadastrada.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Container>
  );
};

export default Correspondences;
