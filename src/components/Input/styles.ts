import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
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
    flex: 1;
    border: 0;
    background: transparent;
    color: #070b13;

    &::placeholder {
      color: #717171;
    }
  }

  svg {
    margin-right: 16px;
  }
`;
