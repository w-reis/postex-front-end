import styled from 'styled-components';

export const Container = styled.div`
  @media (min-width: 992px) {
    width: 100vw;
    display: grid;
    grid-template-columns: 244px 1fr;
    grid-template-rows: 60px 1fr;
    grid-template-areas:
      'sidebar header'
      'sidebar .';
    min-height: 100%;
  }
`;
