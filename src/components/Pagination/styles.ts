import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 20px;
  .controls {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;

    button {
      background: #fff;
      min-width: 40px;
      height: 40px;
      padding: 4px;
      border-radius: 4px;
      border: 1px solid #0949b4;
      font-size: 12px;
      text-decoration: none;

      transition: all 0.5s ease;
      margin-right: 8px;
      color: #0949b4;
      font-size: 20px;
    }

    button:hover {
      background: #ebebeb;
      color: #0949b4;
    }

    .current,
    .current:hover {
      background: #0949b4;
      color: #ffffff;
      cursor: default;
    }

    span {
      font-size: 14px;
    }
  }
`;
