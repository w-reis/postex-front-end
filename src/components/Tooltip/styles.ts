import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  span {
    width: 160px;
    background: #0748b4;
    padding: 8px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    opacity: 0;
    transition: opacity 0.4s;
    visibility: hidden;

    position: absolute;
    bottom: calc(100% + 12px);
    left: 0;
    transform: translateX(-130px);

    color: #ffffff;

    &::before {
      content: '';
      border-style: solid;
      border-color: #0748b4 transparent;
      border-width: 6px 6px 0 6px;
      top: 100%;
      position: absolute;
      left: 0;
      transform: translateX(134px);
    }
  }

  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`;
