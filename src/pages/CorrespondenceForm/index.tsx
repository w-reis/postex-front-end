import React, { useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';

import { MdKeyboardBackspace } from 'react-icons/md';
import { GoSearch } from 'react-icons/go';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';
import PreventDotEandSignsOnInput from '../../utils/preventDotEandSignsOnInput';

import { useToast } from '../../hooks/toast';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Row, Label } from './styles';
import { useAuth } from '../../hooks/auth';

interface CorrespondenceFormData {
  recipient_name: string;
  recipient_id?: number;
  object_number: string;
}

const CorrespondenceForm: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const { token } = useAuth();

  const CreateCorrespondence = useCallback(
    async (data: CorrespondenceFormData) => {
      await api.post('correspondences', data, {
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

        if (!recipient_id) {
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

        addToast({
          type: 'success',
          title: 'Cadastro realizado!',
          description: 'A correspondência foi cadastrada com sucesso.',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }
        addToast({
          type: 'error',
          title: 'Erro na requisição',
          description:
            'Ocorreu um erro ao gravar a correspondência, cheque as informações.',
        });
      }
    },
    [CreateCorrespondence, addToast],
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
            />
            <Button type="button">
              <GoSearch size="24" />
            </Button>
          </div>
        </Row>
        <Row>
          <Label>Nome do destinatário</Label>
          <Input name="recipient_name" />
        </Row>
        <Row>
          <Label>Número do objeto</Label>
          <Input name="object_number" />
        </Row>
        <Row>
          <Label> </Label>
          <Button type="submit">Cadastrar</Button>
        </Row>
      </Form>
    </Container>
  );
};

export default CorrespondenceForm;
