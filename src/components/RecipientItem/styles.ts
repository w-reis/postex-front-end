import styled from 'styled-components';

export const Container = styled.article`
  .recipient-item {
    border: 1px solid #cccccc;
    padding: 8px;
    border-radius: 4px;
    margin: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    & > div:last-child {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    & > div span {
      font-weight: bold;
      display: block;
    }

    & > div strong {
      color: #0748b4;
      font-size: 18px;
    }

    p {
      color: rgba(0, 0, 0, 0.7);
      font-size: 14px;
      line-height: 1.3;
    }
  }
`;
