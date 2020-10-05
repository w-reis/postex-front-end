import React from 'react';

import { Container } from './styles';

interface PaginateProps {
  first?(): void;
  prev?(): void;
  next?(): void;
  last?(): void;
}

const Pagination: React.FC<PaginateProps> = ({ first, prev, next, last }) => {
  return (
    <Container>
      <div className="controls">
        <button type="button" className="first" onClick={first}>
          &#8249;
        </button>
        <button type="button" className="prev" onClick={prev}>
          &laquo;
        </button>
        <button type="button" className="next" onClick={next}>
          &raquo;
        </button>
        <button type="button" className="last" onClick={last}>
          &#8250;
        </button>
      </div>
    </Container>
  );
};

export default Pagination;
