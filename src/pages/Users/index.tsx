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

interface UserData {
  id: number;
  username: string;
  role: string;
  created_at: Date;
  updated_at: Date;
}

interface PaginateInfo {
  currentPage: number;
  totalPages: number;
  previous?: { page: number; limit: number };
  next?: { page: number; limit: number };
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [paginateInfo, setPaginateInfo] = useState<PaginateInfo>(
    {} as PaginateInfo,
  );
  const [lastQuery, setLastQuery] = useState('');
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);
  const { token, signOut, user } = useAuth();
  const { addToast } = useToast();

  const loadUsers = useCallback(
    async ({ page = 1, limit = 7, query = lastQuery }) => {
      try {
        const response = await api.get(
          `users/?query=${query}&page=${page}&limit=${limit}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setUsers(response.data.result);
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
        pathname: '/users/edit',
        state: { id: id.toString() },
      });
    },
    [history],
  );

  const deleteUser = useCallback(
    async (id: number) => {
      try {
        await api.delete(`/users/?idGroup[]=${id.toString()}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        loadUsers({});
      } catch (error) {
        addToast({
          type: 'error',
          title: 'Erro ao deletar;',
          description: 'Ocorreu um erro ao deletar o usuário.',
        });
      }
    },
    [addToast, loadUsers, token],
  );

  const deleteUsers = useCallback(
    async (ids: string[]) => {
      try {
        if (ids.length !== 0) {
          const querys = ids.map((id) => `idGroup[]=${id}`);

          await api.delete(`/users?${querys.join('&')}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          loadUsers({});
        }
      } catch (error) {
        addToast({
          type: 'error',
          title: 'Erro ao deletar',
          description: 'Ocorreu um erro ao deletar os usuários.',
        });
      }
    },
    [addToast, loadUsers, token],
  );

  const handleSubmit = useCallback(
    async ({ query }) => {
      if (query) {
        loadUsers({ query });
      }
      setLastQuery(query);
    },
    [loadUsers],
  );

  const handleSubmitCheckboxes = useCallback(
    async (ids: object) => {
      deleteUsers(Object.values(ids).filter((id) => id !== undefined));
    },
    [deleteUsers],
  );

  useEffect(() => {
    user.role !== 'adm' && history.push('/');
    loadUsers({});
  }, [loadUsers, history, user.role]);

  return (
    <Container>
      <div>
        <Form onSubmit={handleSubmit} ref={formRef} className="search-input">
          <Input
            name="query"
            icon={GoSearch}
            placeholder="Buscar usuário"
            autoFocus
          />
          <Button type="submit">
            <GoSearch size={20} />
          </Button>
        </Form>

        <Button type="button" onClick={() => history.push('/users/create')}>
          Novo
        </Button>
      </div>
      <Form ref={formRef} onSubmit={handleSubmitCheckboxes}>
        <table>
          <thead>
            <tr>
              <th> </th>
              <th>ID</th>
              <th>Usuário</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.length !== 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td>
                    <Checkbox name={`user${user.id}`} value={user.id} />
                  </td>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>
                    <SmallButton
                      icon={MdEdit}
                      type="button"
                      backgroundColorCode="#0269D9"
                      onClick={() => goToEdit(user.id)}
                    />
                    <SmallButton
                      icon={MdDelete}
                      backgroundColorCode="#C93934"
                      onClick={() => deleteUser(user.id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} align="center">
                  Nenhum usuário encontrado.
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
            loadUsers({});
          }}
        >
          Limpar
        </SmallButton>
        <SmallButton
          icon={MdDelete}
          backgroundColorCode="#C93934"
          type="submit"
        >
          Deletar selecionados
        </SmallButton>
      </Form>
      {users.length !== 0 && paginateInfo.totalPages > 1 && (
        <Pagination
          current={paginateInfo.currentPage}
          limit={paginateInfo.totalPages}
          first={() => loadUsers({ page: 1 })}
          prev={() =>
            paginateInfo.previous &&
            loadUsers({ page: paginateInfo.previous?.page })
          }
          next={() =>
            paginateInfo.next && loadUsers({ page: paginateInfo.next?.page })
          }
          last={() => loadUsers({ page: paginateInfo.totalPages })}
        />
      )}
    </Container>
  );
};

export default Users;
