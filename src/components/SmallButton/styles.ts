import styled, { css } from 'styled-components';

interface ContainerProps {
  backgroundColor: string;
  hoverColor?: string;
  hasText: boolean;
}

export const Container = styled.button<ContainerProps>`
  display: inline-flex;
  vertical-align: middle;
  line-height: 16px;

  padding: 4px;
  border-radius: 4px;
  border: 0;
  font-size: 12px;
  text-decoration: none;
  color: #ffffff;
  transition: all 0.5s ease;
  margin-right: 8px;

  span {
    font-weight: 600;
    transform: translateY(0px);
  }

  ${($props) =>
    $props.hasText &&
    css`
      svg {
        margin-right: 4px;
        height: 16px;
      }
    `}

  ${(props) =>
    props.backgroundColor &&
    css`
      background: ${props.backgroundColor};

      &:hover {
        box-shadow: inset 0 0 0 999px rgba(0, 0, 0, 0.3);
      }
    `}
`;
