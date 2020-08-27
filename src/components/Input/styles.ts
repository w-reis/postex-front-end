import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  border-radius: 8px;
  padding: 16px;
  width: 100%;
  display: flex;
  align-items: center;

  border: 2px solid #717171;
  color: #717171;

  & + div {
    margin-top: 8px;
  }

  ${(props) =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      color: #0748b4;
      border-color: #0748b4;
    `}

  ${(props) =>
    props.isFilled &&
    css`
      color: #0748b4;
    `}

  input {
    width: 100%;
    border: 0;
    background: transparent;
    color: #070b13;

    &::placeholder {
      color: #717171;
    }
  }

  svg {
    min-width: 20px;
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #ffffff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
