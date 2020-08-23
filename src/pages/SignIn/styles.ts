import styled from 'styled-components';

import SigInBackgroundImg from '../../assets/signin-background.png';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: url(${SigInBackgroundImg}) no-repeat center;
  background-size: cover;

  @media (min-width: 992px) {
    flex-direction: row;
    background-image: none;
    background-color: #ffffff;
  }
`;

export const Content = styled.div`
  img {
    display: none;
  }

  @media (min-width: 992px) {
    img {
      display: block;
      width: 70%;
      max-width: 283px;
    }

    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
  }
`;

export const Background = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  img {
    width: 140px;
    margin-bottom: 18px;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90%;
    margin: 0 auto;
    padding: 18px 20px;
    background: #ffffff;
    border-radius: 8px;
    text-align: center;
  }

  h1 {
    display: none;
  }

  button {
    background: #0748b4;
    height: 56px;
    border-radius: 8px;
    border: 0;
    padding: 0 16px;
    color: #ffffff;
    width: 100%;
    font-weight: 992;
    margin-top: 16px;
  }

  @media (min-width: 768px) {
    form {
      width: 500px;
    }
  }

  @media (min-width: 992px) {
    display: flex;
    width: 100%;
    max-width: 55%;
    height: 100vh;
    background: url(${SigInBackgroundImg}) no-repeat center;
    background-size: cover;

    form {
      img {
        display: none;
      }

      h1 {
        display: inline-block;
        color: #0748b4;
        margin: 0;
        margin-bottom: 24px;
        align-self: flex-start;
      }

      width: 400px;
      margin: 80px 0;
    }
  }
`;
