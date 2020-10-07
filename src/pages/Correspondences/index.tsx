import React, { useCallback, useRef, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import { GoSearch } from 'react-icons/go';
import { MdEdit, MdDelete } from 'react-icons/md';
import { AiOutlineReload } from 'react-icons/ai';

import Input from '../../components/Input';
import Checkbox from '../../components/Checkbox';
import Button from '../../components/Button';
import SmallButton from '../../components/SmallButton';
import Pagination from '../../components/Pagination';

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

interface PaginateInfo {
  currentPage: number;
  totalPages: number;
  previous?: { page: number; limit: number };
  next?: { page: number; limit: number };
}

const Correspondences: React.FC = () => {
  const [correspondences, setCorrespondences] = useState<CorrespondenceData[]>(
    [],
  );
  const [paginateInfo, setPaginateInfo] = useState<PaginateInfo>(
    {} as PaginateInfo,
  );
  const [lastQuery, setLastQuery] = useState('');
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);
  const { token, signOut } = useAuth();
  const { addToast } = useToast();

  const loadCorrespondences = useCallback(
    async ({ page = 1, limit = 7, query = lastQuery }) => {
      try {
        const response = await api.get(
          `correspondences/?query=${query}&page=${page}&limit=${limit}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setCorrespondences(response.data.result);
        delete response.data.result;

        setPaginateInfo(response.data);
      } catch (error) {
        addToast({
          type: 'error',
          title: 'Sua sessão expirou!',
          description: 'Faça login novamente para utilizar o Postex.',
        });
        signOut();
      }
    },
    [token, addToast, signOut, lastQuery],
  );

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
        await api.delete(`/correspondences/?idGroup[]=${id.toString()}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        loadCorrespondences({});
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

  const deleteCorrespondences = useCallback(
    async (ids: string[]) => {
      try {
        if (ids.length !== 0) {
          const querys = ids.map((id) => `idGroup[]=${id}`);

          await api.delete(`/correspondences?${querys.join('&')}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          loadCorrespondences({});
        }
      } catch (error) {
        addToast({
          type: 'error',
          title: 'Erro ao deletar',
          description: 'Ocorreu um erro ao deletar as correspondências.',
        });
      }
    },
    [addToast, loadCorrespondences, token],
  );

  const deliverCorrespondence = useCallback(
    async (id: number) => {
      await api.patch(
        `correspondences/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      loadCorrespondences({});
    },
    [token, loadCorrespondences],
  );

  const handleSubmit = useCallback(
    async ({ query }) => {
      if (query) {
        loadCorrespondences({ query });
      }
      setLastQuery(query);
    },
    [loadCorrespondences],
  );

  const handleSubmitCheckboxes = useCallback(
    async (ids: object) => {
      deleteCorrespondences(
        Object.values(ids).filter((id) => id !== undefined),
      );
    },
    [deleteCorrespondences],
  );

  useEffect(() => {
    loadCorrespondences({});
  }, [loadCorrespondences]);

  return (
    <Container>
      <div>
        <Form onSubmit={handleSubmit} ref={formRef} className="search-input">
          <Input
            name="query"
            icon={GoSearch}
            placeholder="Buscar destinatário"
            autoFocus
          />
          <Button type="submit">
            <GoSearch size={20} />
          </Button>
        </Form>

        <Button
          type="button"
          onClick={() => history.push('/correspondences/create')}
        >
          Novo
        </Button>
      </div>
      <Form ref={formRef} onSubmit={handleSubmitCheckboxes}>
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
                    <Checkbox
                      name={`correspondence${correspondence.id}`}
                      value={correspondence.id}
                    />
                  </td>
                  <td>{correspondence.id}</td>
                  <td>{correspondence.recipient_name}</td>
                  <td>{correspondence.object_number}</td>
                  <td>
                    {correspondence.status === 'pendente' && (
                      <span style={{ color: '#C93934', fontWeight: 'bold' }}>
                        {correspondence.status}
                      </span>
                    )}
                    {correspondence.status === 'entregue' && (
                      <span style={{ color: '#4FA845', fontWeight: 'bold' }}>
                        {correspondence.status}
                      </span>
                    )}
                  </td>
                  <td>
                    <SmallButton
                      backgroundColorCode="#4FA845"
                      onClick={() => deliverCorrespondence(correspondence.id)}
                    >
                      Entregar
                    </SmallButton>
                    <SmallButton
                      icon={MdEdit}
                      type="button"
                      backgroundColorCode="#0269D9"
                      onClick={() => goToEdit(correspondence.id)}
                    />
                    <SmallButton
                      icon={MdDelete}
                      backgroundColorCode="#C93934"
                      onClick={() => deleteCorrespondence(correspondence.id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} align="center">
                  Nenhuma correspondência encontrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <SmallButton
          backgroundColorCode="#46AC91"
          icon={AiOutlineReload}
          onClick={() => {
            setLastQuery('');
            loadCorrespondences({});
          }}
        >
          Limpar
        </SmallButton>
        <SmallButton
          icon={MdDelete}
          backgroundColorCode="#C93934"
          type="submit"
        >
          Deletar selecionadas
        </SmallButton>
      </Form>
      {correspondences.length !== 0 && paginateInfo.totalPages > 1 && (
        <Pagination
          current={paginateInfo.currentPage}
          limit={paginateInfo.totalPages}
          first={() => loadCorrespondences({ page: 1 })}
          prev={() =>
            paginateInfo.previous &&
            loadCorrespondences({ page: paginateInfo.previous?.page })
          }
          next={() =>
            paginateInfo.next &&
            loadCorrespondences({ page: paginateInfo.next?.page })
          }
          last={() => loadCorrespondences({ page: paginateInfo.totalPages })}
        />
      )}
    </Container>
  );
};

export default Correspondences;
