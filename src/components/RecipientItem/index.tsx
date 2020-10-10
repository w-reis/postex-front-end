import React from 'react';

import { Container } from './styles';

interface RecipientData {
  recipient: {
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
  };
}

const RecipientItem: React.FC<RecipientData> = ({ recipient, children }) => {
  return (
    <Container>
      <div key={recipient.id} className="recipient-item">
        <div>
          <span>{`ID: ${recipient.id}`}</span>
          <strong>{recipient.name}</strong>
          <p>{`${recipient.address} ${recipient.number}`}</p>
          <p>{`${recipient.neighborhood}`}</p>
          <p>{`${recipient.CEP} - ${recipient.city}/${recipient.state}`}</p>
        </div>
        <div>{children}</div>
      </div>
    </Container>
  );
};

export default RecipientItem;
