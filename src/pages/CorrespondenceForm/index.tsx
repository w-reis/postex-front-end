import React, { useRef, useCallback, useEffect, useState } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { MdKeyboardBackspace } from 'react-icons/md';
import { GoSearch } from 'react-icons/go';
import { RiUserSearchFill, RiMailCheckLine } from 'react-icons/ri';

import Button from '../../components/Button';
import Input from '../../components/Input';
import Modal from '../../components/Modal';

import getValidationErrors from '../../utils/getValidationErrors';
import PreventDotEandSignsOnInput from '../../utils/preventDotEandSignsOnInput';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';

import RecipientItem from '../../components/RecipientItem';
import SmallButton from '../../components/SmallButton';
import Loading from '../../components/Loading';

import { Container, Row, Label } from './styles';

interface CorrespondenceFormData {
  recipient_name: string;
  recipient_id?: number;
  object_number: string;
  id: string;
}

interface RecipientData {
  id: number;
  name: string;
  email: string;
  address: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  CEP: string;
  created_at: Date;
  updated_at: Date;
}

const CorrespondenceForm: React.FC = () => {
  const [correspondence, setCorrespondence] = useState<CorrespondenceFormData>(
    {} as CorrespondenceFormData,
  );

  const [loading, setLoading] = useState(false);
  const [recipient, setRecipient] = useState<RecipientData[]>([]);
  const [show, setShow] = useState(false);

  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const { token } = useAuth();
  const { state, pathname } = useLocation();
  const history = useHistory();

  const checkEditCondition = useCallback(async () => {
    setLoading(true);
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
    setLoading(false);
  }, [pathname, state, token, history]);

  const createCorrespondence = useCallback(
    async (data: Omit<CorrespondenceFormData, 'id'>) => {
      await api.post('correspondences', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    [token],
  );

  const updateCorrespondence = useCallback(
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
          await updateCorrespondence(
            {
              recipient_name,
              object_number,
            },
            correspondence.id,
          );
        } else if (correspondence.id && recipient_id) {
          await updateCorrespondence(
            {
              recipient_id,
              recipient_name,
              object_number,
            },
            correspondence.id,
          );
        } else if (!recipient_id) {
          await createCorrespondence({
            recipient_name,
            object_number,
          });
        } else {
          await createCorrespondence({
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
            title: 'Nova correspondência!',
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
      createCorrespondence,
      addToast,
      updateCorrespondence,
      correspondence,
      history,
    ],
  );

  const handleShow = useCallback(() => {
    show ? setShow(false) : setShow(true);
    setRecipient([]);
    formRef.current?.setFieldValue('query', '');
  }, [show]);

  const submitSearch = useCallback(
    async ({ query }: { query?: string }) => {
      if (query) {
        const response = await api.get(`/recipients?recipient=${query}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRecipient(response.data);
      } else {
        setRecipient([]);
      }
    },
    [token],
  );

  useEffect(() => {
    checkEditCondition();
  }, [checkEditCondition]);

  return (
    <Container>
      <Modal
        icon={RiUserSearchFill}
        title="Buscar destinatário"
        show={show}
        closeFunction={handleShow}
      >
        <Form onSubmit={submitSearch} ref={formRef} className="search-input">
          <Input
            name="query"
            icon={GoSearch}
            autoFocus
            defaultValue={
              correspondence.recipient_name &&
              correspondence.recipient_name.split(' ')[0]
            }
          />
          <Button type="submit">
            <GoSearch size={20} />
          </Button>
        </Form>
        <div>
          {recipient.map((item) => (
            <RecipientItem recipient={item} key={item.id}>
              <SmallButton
                icon={RiMailCheckLine}
                backgroundColorCode="#23407E"
                onClick={() => {
                  formRef.current?.setFieldValue('recipient_id', item.id);
                  formRef.current?.setFieldValue('recipient_name', item.name);
                  handleShow();
                }}
              >
                Vincular
              </SmallButton>
            </RecipientItem>
          ))}
        </div>
      </Modal>
      <div>
        <Link to="/">
          <MdKeyboardBackspace size={24} />
          Voltar
        </Link>
      </div>
      {loading ? (
        <>
          <Loading />
        </>
      ) : (
        <Form onSubmit={handleSubmit} ref={formRef}>
          <Row>
            <Label>Id do destinatário</Label>
            <div>
              <Button type="button" onClick={handleShow}>
                <GoSearch size="24" />
              </Button>
              <Input
                name="recipient_id"
                type="number"
                min="1"
                onKeyDown={PreventDotEandSignsOnInput}
                defaultValue={correspondence.recipient_id}
              />
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
              maxLength={9}
            />
          </Row>
          <Row>
            <Label> </Label>
            <Button type="submit">Gravar</Button>
          </Row>
        </Form>
      )}
    </Container>
  );
};

export default CorrespondenceForm;
