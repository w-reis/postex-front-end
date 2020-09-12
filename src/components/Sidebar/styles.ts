import styled from 'styled-components';

export const Container = styled.ul`
  ul {
    display: flex;
    flex-direction: column;
    list-style: none;

    background: #020710;

    li a,
    li a:visited {
      display: flex;
      justify-content: center;
      font-size: 18px;
      font-weight: 500;

      padding: 18px;
      text-decoration: none;
      color: #fff;

      transition: all 0.5s ease;

      svg {
        margin-right: 10px;
      }

      &:hover {
        background: #070b13;
      }
    }
  }

  .sidebar-header {
    font-size: 12px;
    font-weight: 400;

    padding: 18px;
    text-align: center;
    background: #01040b;
    color: #717171;
  }
`;
