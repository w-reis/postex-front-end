import React, { InputHTMLAttributes, useEffect, useRef } from 'react';

import { useField } from '@unform/core';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  value: number;
}

const Input: React.FC<CheckboxProps> = ({ name, id, value, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { fieldName, defaultValue, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      getValue: (ref: HTMLInputElement) => {
        if (ref.checked) {
          return ref.value;
        }
        return undefined;
      },
    });
  }, [fieldName, registerField]);

  return (
    <div>
      <label htmlFor={id} key={id}>
        <input
          defaultChecked={defaultValue}
          ref={inputRef}
          value={value}
          type="checkbox"
          {...rest}
        />
      </label>
    </div>
  );
};

export default Input;
