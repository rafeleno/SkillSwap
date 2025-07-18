import React from 'react';
import styles from './styles.module.scss';
import { ButtonProps } from './MainButton.types';

export const Button: React.FC<ButtonProps> = ({ type, children }) => {
  return (
    <button className={`${styles.button} ${styles[type]}`}>{children}</button>
  );
};
