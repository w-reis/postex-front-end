import React, { useRef, useCallback, useEffect, useState } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';

import * as Yup from 'yup';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { MdKeyboardBackspace } from 'react-icons/md';

import Input from '../../components/Input';
import Select from '../../components/Select';
import Button from '../../components/Button';
import Loading from '../../components/Loading';

import getValidationErrors from '../../utils/getValidationErrors';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';

import { Container, Row, Label } from './styles';

interface UserFormData {
  username: string;
  role: string;
  password?: string;
  id: string;
}

const UserForm: React.FC = () => {
  const [user, setUser] = useState<UserFormData>({} as UserFormData);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<
    {
      value: string;
      label: string;
      selected: boolean;
    }[]
  >([
    { value: 'user', label: 'usuário', selected: true },
    { value: 'adm', label: 'administrador', selected: false },
  ]);
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const { token, user: authUser } = useAuth();
  const { state, pathname } = useLocation();
  const history = useHistory();

  const checkEditCondition = useCallback(async () => {
    setLoading(true);
    if (!state && pathname === '/users/edit') {
      history.replace('/users/create');
    }
    if (state) {
      const { id }: any = state;
      const response = await api.get(`users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(response.data);
    }
    setLoading(false);
  }, [pathname, state, token, history]);

  const createUser = useCallback(
    async (data: Omit<UserFormData, 'id'>) => {
      await api.post('users', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    [token],
  );

  const updateUser = useCallback(
    async (data: Omit<UserFormData, 'id'>, id: string) => {
      await api.put(`users/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    [token],
  );

  const handleSubmit = useCallback(
    async ({ username, role, password }: UserFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          username: Yup.string().required('Campo obrigatório'),
          role: Yup.string().required('Campo obrigatório'),
        });

        await schema.validate(
          {
            username,
            role,
          },
          {
            abortEarly: false,
          },
        );

        if (user.id && !password) {
          await updateUser(
            {
              username,
              role,
            },
            user.id,
          );
        } else if (user.id && password) {
          await updateUser(
            {
              password,
              username,
              role,
            },
            user.id,
          );
        } else if (!password) {
          await createUser({
            username,
            role,
          });
        } else {
          await createUser({
            username,
            password,
            role,
          });
        }

        if (user.id) {
          addToast({
            type: 'success',
            title: 'Usuário atualizado!',
            description: 'O usuário foi atualizado com sucesso.',
          });
        } else {
          addToast({
            type: 'success',
            title: 'Novo usuário!',
            description: 'O usuário foi cadastrado com sucesso.',
          });
        }

        history.push('/users');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }
        addToast({
          type: 'error',
          title: 'Erro na requisição.',
          description:
            'Ocorreu um erro ao gravar o usuário, cheque as informações.',
        });
      }
    },
    [createUser, addToast, updateUser, user, history],
  );

  const handleSelectOptions = useCallback(() => {
    if (user.role === 'user') {
      const selectOptions = [
        { value: 'user', label: 'usuário', selected: true },
        { value: 'adm', label: 'administrador', selected: false },
      ];

      setOptions(selectOptions);
    } else {
      const selectOptions = [
        { value: 'adm', label: 'administrador', selected: true },
        { value: 'user', label: 'usuário', selected: false },
      ];

      setOptions(selectOptions);
    }
  }, [user.role]);

  useEffect(() => {
    authUser.role !== 'adm' && history.push('/');
    checkEditCondition().then(handleSelectOptions);
  }, [checkEditCondition, handleSelectOptions, history, authUser.role]);

  return (
    <Container>
      <div>
        <Link to="/users">
          <MdKeyboardBackspace size={24} />
          Voltar
        </Link>
      </div>
      {loading ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          <Form onSubmit={handleSubmit} ref={formRef}>
            <Row>
              <Label>Nome de usuário</Label>
              <Input name="username" defaultValue={user.username} />
            </Row>
            <Row>
              <Label>Função</Label>
              <Select name="role" options={options} />
            </Row>
            {!user.id && (
              <>
                <Row>
                  <Label>Senha</Label>
                  <Input name="password" />
                </Row>
                <Row />
              </>
            )}
            <Row>
              <Label> </Label>
              <Button type="submit">Gravar</Button>
            </Row>
          </Form>
        </>
      )}
    </Container>
  );
};

export default UserForm;
