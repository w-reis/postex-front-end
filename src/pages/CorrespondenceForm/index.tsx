import React, { useRef, useCallback, useEffect, useState } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';

import { MdKeyboardBackspace } from 'react-icons/md';
import { GoSearch } from 'react-icons/go';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';
import PreventDotEandSignsOnInput from '../../utils/preventDotEandSignsOnInput';

import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Row, Label } from './styles';

interface CorrespondenceFormData {
  recipient_name: string;
  recipient_id?: number;
  object_number: string;
  id: string;
}

const CorrespondenceForm: React.FC = () => {
  const [correspondence, setCorrespondence] = useState<CorrespondenceFormData>(
    {} as CorrespondenceFormData,
  );
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const { token } = useAuth();
  const { state, pathname } = useLocation();
  const history = useHistory();

  const checkEditCondition = useCallback(async () => {
    if (!state && pathname === '/correspondences/edit') {
      history.replace('/correspondences/create');
    }
    if (state) {
      const { id } = state;
      const response = await api.get(`correspondences/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCorrespondence(response.data);
    }
  }, [pathname, state, token, history]);

  useEffect(() => {
    checkEditCondition();
  }, [checkEditCondition]);

  const CreateCorrespondence = useCallback(
    async (data: Omit<CorrespondenceFormData, 'id'>) => {
      await api.post('correspondences', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    [token],
  );

  const UpdateCorrespondence = useCallback(
    async (data: Omit<CorrespondenceFormData, 'id'>, id: string) => {
      await api.put(`correspondences/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    [token],
  );

  const handleSubmit = useCallback(
    async ({
      recipient_name,
      object_number,
      recipient_id,
    }: CorrespondenceFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          recipient_name: Yup.string().required('Campo obrigatório'),
          object_number: Yup.string().required('Campo obrigatório'),
        });

        await schema.validate(
          {
            recipient_name,
            object_number,
            recipient_id,
          },
          {
            abortEarly: false,
          },
        );

        if (correspondence.id && !recipient_id) {
          await UpdateCorrespondence(
            {
              recipient_name,
              object_number,
            },
            correspondence.id,
          );
        } else if (correspondence.id && recipient_id) {
          await UpdateCorrespondence(
            {
              recipient_id,
              recipient_name,
              object_number,
            },
            correspondence.id,
          );
        } else if (!recipient_id) {
          await CreateCorrespondence({
            recipient_name,
            object_number,
          });
        } else {
          await CreateCorrespondence({
            recipient_name,
            recipient_id,
            object_number,
          });
        }

        if (correspondence.id) {
          addToast({
            type: 'success',
            title: 'Correspondência atualizada!',
            description: 'A correspondência foi atualizada com sucesso.',
          });
        } else {
          addToast({
            type: 'success',
            title: 'Cadastro realizado!',
            description: 'A correspondência foi cadastrada com sucesso.',
          });
        }

        history.push('/correspondences');
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
            'Ocorreu um erro ao gravar a correspondência, cheque as informações.',
        });
      }
    },
    [
      CreateCorrespondence,
      addToast,
      UpdateCorrespondence,
      correspondence,
      history,
    ],
  );

  return (
    <Container>
      <div>
        <Link to="/">
          <MdKeyboardBackspace size={24} />
          Voltar
        </Link>
      </div>
      <Form onSubmit={handleSubmit} ref={formRef}>
        <Row>
          <Label>Id do destinatário</Label>
          <div>
            <Input
              name="recipient_id"
              type="number"
              min="1"
              onKeyDown={PreventDotEandSignsOnInput}
              defaultValue={correspondence.recipient_id}
            />
            <Button type="button">
              <GoSearch size="24" />
            </Button>
          </div>
        </Row>
        <Row>
          <Label>Nome do destinatário</Label>
          <Input
            name="recipient_name"
            defaultValue={correspondence.recipient_name}
          />
        </Row>
        <Row>
          <Label>Número do objeto</Label>
          <Input
            name="object_number"
            defaultValue={correspondence.object_number}
          />
        </Row>
        <Row>
          <Label> </Label>
          <Button type="submit">Gravar</Button>
        </Row>
      </Form>
    </Container>
  );
};

export default CorrespondenceForm;
