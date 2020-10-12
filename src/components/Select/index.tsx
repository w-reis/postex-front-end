import React, { SelectHTMLAttributes, useRef, useEffect } from 'react';

import { useField } from '@unform/core';

import { Container } from './styles';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  options: Array<{
    value: string;
    label: string;
    selected: boolean;
  }>;
}

const Select: React.FC<SelectProps> = ({ name, options, ...rest }) => {
  const selectRef = useRef<HTMLSelectElement>(null);

  const { fieldName, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      <select id={name} {...rest} ref={selectRef}>
        <option value="" disabled defaultValue="" hidden>
          Selecione
        </option>
        {options.map((option) => {
          return (
            <option
              key={option.value}
              value={option.value}
              selected={option.selected}
            >
              {option.label}
            </option>
          );
        })}
      </select>
    </Container>
  );
};

export default Select;
