import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  border-radius: 8px;
  padding: 16px;
  width: 100%;
  display: flex;
  align-items: center;

  border: 1px solid #717171;
  color: #717171;

  & + div {
    margin-top: 8px;
  }

  select {
    width: 100%;
    border: 0;
    background: transparent;
    color: #070b13;

    &::placeholder {
      color: #717171;
    }
  }
`;
