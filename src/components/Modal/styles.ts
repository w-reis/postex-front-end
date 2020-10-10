import styled, { css } from 'styled-components';

interface ContainerProps {
  show: boolean;
}

export const Container = styled.article<ContainerProps>`
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  .modal {
    width: 100%;
    max-width: 550px;
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    padding: 8px;
    margin: 5%;

    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #1c1c1c;
      border-bottom: 1px solid #cccccc;
      margin-bottom: 8px;
      padding-bottom: 8px;
      & > div {
        display: flex;

        span {
          font-size: 18px;
          font-weight: 500;
        }

        svg {
          margin-right: 8px;
          color: #0748b4;
        }
      }

      button,
      button:hover {
        margin: 0;
        padding: 0;
        border: none;
        background: transparent;
        color: #1c1c1c;
      }
    }
  }

  .modal-body > div {
    max-height: 70vh;
    overflow-y: scroll;
    max-width: 100%;
  }

  ${(props) =>
    !props.show &&
    css`
      display: none;
    `}
`;
