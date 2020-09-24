import React, { ButtonHTMLAttributes } from 'react';

import { IconBaseProps } from 'react-icons';

import { Container } from './styles';

interface SmallButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ComponentType<IconBaseProps>;
  backgroundColorCode: string;
}

const SmallButton: React.FC<SmallButtonProps> = ({
  icon: Icon,
  children,
  backgroundColorCode,
  ...rest
}) => (
  <Container
    backgroundColor={backgroundColorCode}
    hasText={!!children}
    {...rest}
  >
    {Icon && <Icon size={16} />}
    <span>{children}</span>
  </Container>
);

export default SmallButton;
