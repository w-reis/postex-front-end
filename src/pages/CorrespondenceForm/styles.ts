import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 95%;
  margin: 47px auto;

  & > div {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 16px;

    a,
    a:visited {
      text-decoration: none;
      display: inline-flex;
      color: #0748b4;
      font-weight: 500;

      svg {
        margin-right: 10px;
      }
    }
  }

  & form {
    width: 100%;

    & div:first-child {
      & div:last-child {
        display: flex;
        & div {
          margin-top: 8px;
          max-width: 100px;
        }
      }
    }

    & div:nth-child(4) {
      button {
        margin-top: 8px;
        transition: all 0.5s ease;
        width: 100px;
        margin-left: 0px;
      }

      button:hover {
        background-color: rgb(4, 54, 136);
        color: #ffffff;
      }
    }

    & div:nth-child(2) {
      & div:last-child {
        max-width: 500px;
      }
    }
  }

  .search-input {
    width: 100%;
    max-width: 392px;
    margin-bottom: 16px;
    display: flex;

    & > div {
      padding: 11px;
    }

    & > button {
      width: 50px;
      margin-left: 8px;
    }
  }
`;

export const Row = styled.div`
  width: 100%;

  & > div {
    margin-top: 8px;
  }

  & div:last-child {
    max-width: 394px;
  }

  @media (min-width: 994px) {
    display: flex;
    align-items: center;
  }

  button {
    margin-top: 8px;
    transition: all 0.5s ease;
    width: 56px;
    margin-right: 8px;
  }

  button:hover {
    background-color: rgb(4, 54, 136);
    color: #ffffff;
  }
`;

export const Label = styled.div`
  flex-basis: 150px;
  color: #0748b4;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  margin-right: 16px;
`;
