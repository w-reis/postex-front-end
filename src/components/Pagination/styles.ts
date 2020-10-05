import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 20px;
  .controls {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;

    button {
      min-width: 40px;
      height: 40px;
      padding: 4px;
      border-radius: 50%;
      border: 1px solid #0269d9;
      font-size: 12px;
      text-decoration: none;

      transition: all 0.5s ease;
      margin-right: 8px;
      color: #0269d9;
      font-size: 20px;
    }
  }
`;
