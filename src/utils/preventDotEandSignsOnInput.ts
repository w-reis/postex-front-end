interface InputKeys {
  key: string;
  preventDefault(): void;
}

const preventDotEandSignsOnInput = (evt: InputKeys): void => {
  (evt.key === 'e' ||
    evt.key === '0' ||
    evt.key === 'E' ||
    evt.key === '.' ||
    evt.key === ',' ||
    evt.key === '+' ||
    evt.key === '-') &&
    evt.preventDefault();
};

export default preventDotEandSignsOnInput;
