import React from 'react';
import styles from './styles.module.scss';
import { MainButtonProps } from './MainButton.types';

export const MainButton: React.FC<MainButtonProps> = ({ type, children }) => {
  return (
    <button className={`${styles.button} ${styles[type]}`}>{children}</button>
  );
};
