import styled from 'styled-components';

export const Container = styled.div`
  border-radius: 8px;
  border: 1px solid #717171;
  padding: 16px;
  width: 100%;
  display: flex;
  align-items: center;
  color: #717171;

  & + div {
    margin-top: 8px;
  }

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
