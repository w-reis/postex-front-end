import React from 'react';

import { Link } from 'react-router-dom';

import { IconBaseProps } from 'react-icons';

import { Container } from './styles';

interface SmallButtonProps {
  icon?: React.ComponentType<IconBaseProps>;
  path: string;
  backgroundColorCode: string;
}

const SmallButton: React.FC<SmallButtonProps> = ({
  icon: Icon,
  children,
  backgroundColorCode,
  path,
}) => (
  <Container backgroundColor={backgroundColorCode} hasText={!!children}>
    <Link to={path}>
      {Icon && <Icon size={16} />}
      <span>{children}</span>
    </Link>
  </Container>
);

export default SmallButton;
