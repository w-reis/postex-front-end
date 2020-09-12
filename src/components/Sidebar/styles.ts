import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  box-shadow: 1px 0px 1px 0px rgba(0, 0, 0, 0.37);

  ul {
    display: flex;
    flex-direction: column;
    list-style: none;
  }

  li a,
  li a:visited {
    display: flex;
    justify-content: center;
    font-size: 18px;
    font-weight: 500;
    padding: 18px;
    text-decoration: none;
    color: #000;
    transition: all 0.5s ease;

    svg {
      color: #0748b4;
      margin-right: 10px;
    }

    &:hover,
    &:active {
      background: #e3ebf6;
      color: #0748b4;
    }
  }

  .sidebar-header {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    font-size: 12px;
    font-weight: 400;
    text-align: center;
    padding: 18px;
    background: #ffffff;
    color: #717171;
  }

  .sidebar-header {
    img {
      display: none;
    }
  }

  @media (min-width: 768px) {
    ul {
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
    }

    li {
      flex: 1;
    }
  }

  @media (min-width: 992px) {
    grid-area: sidebar;
    ul {
      flex-direction: column;
      align-items: flex-start;
    }

    li a,
    li a:visited {
      display: flex;
      justify-content: flex-start;
      width: 244px;
    }

    .sidebar-header {
      height: 120px;
    }

    .sidebar-header {
      img {
        display: block;
      }
    }
  }
`;
