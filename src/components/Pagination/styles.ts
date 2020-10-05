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
      border: none;
      border: 1px solid #0949b4;
      border-left: none;
      font-size: 12px;
      text-decoration: none;
      border-collapse: collapse;
      transition: all 0.5s ease;
      color: #0949b4;
      font-size: 20px;
    }

    button:first-child {
      border-left: 1px solid #0949b4;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }

    button:last-child {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
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
