import React from 'react';
import styles from './styles.module.scss';
import { RadioInputProps } from './RadioInput.types';


export const RadioInput: React.FC<RadioInputProps> = ({
  name,
  value,
  checked,
  children,
  onChange
}) => {
  const id = `${name}-${value}`;
  return (
    <label htmlFor={id} className={styles.label}>
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={(e) => onChange?.(e.target.value)}
        className={styles.input}
      />
      <span className={styles.radioIcon} />
      {children}
    </label>
  );
};

export default RadioInput;