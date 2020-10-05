import React from 'react';

import { Container } from './styles';

interface PaginateProps {
  first?(): void;
  prev?(): void;
  next?(): void;
  last?(): void;
  current: number;
  limit: number;
}

const Pagination: React.FC<PaginateProps> = ({
  first,
  prev,
  next,
  last,
  current,
  limit,
}) => {
  return (
    <Container>
      <div className="controls">
        <button type="button" onClick={first}>
          &laquo;
        </button>
        <button type="button" onClick={prev}>
          &#8249;
        </button>
        <button type="button" className="current">
          <span>{current}</span>
        </button>
        {current < limit && (
          <button type="button" onClick={next}>
            <span>{current + 1}</span>
          </button>
        )}
        <button type="button" onClick={next}>
          &#8250;
        </button>
        <button type="button" onClick={last}>
          &raquo;
        </button>
      </div>
    </Container>
  );
};

export default Pagination;
