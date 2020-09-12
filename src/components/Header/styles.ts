import styled from 'styled-components';

export const Container = styled.header`
  height: 60px;
  padding: 0 2.5%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  color: #0748b4;

  & > button {
    height: 24px;
    display: inline-flex;
    align-items: center;
    font-weight: 700;
    font-size: 20px;
    border: 0;
    background: transparent;
    color: inherit;

    svg {
      margin-left: 10px;
    }
  }

  @media (min-width: 992px) {
    grid-area: header;

    & > img {
      visibility: hidden;
    }
  }
`;
