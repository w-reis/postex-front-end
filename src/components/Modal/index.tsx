import React from 'react';

import { IconBaseProps } from 'react-icons';
import { CgCloseO } from 'react-icons/cg';

import { Container } from './styles';

interface ModalProps {
  icon?: React.ComponentType<IconBaseProps>;
  title: string;
  show: boolean;
  closeFunction(): void;
}

const Modal: React.FC<ModalProps> = ({
  icon: Icon,
  title,
  children,
  show,
  closeFunction,
}) => {
  return (
    <Container show={show}>
      <div className="modal">
        <header>
          <div>
            {Icon && <Icon size={24} />}
            <span>{title}</span>
          </div>
          <button type="button" onClick={closeFunction}>
            <CgCloseO size={24} />
          </button>
        </header>
        <div className="modal-body">{children}</div>
      </div>
    </Container>
  );
};

export default Modal;
