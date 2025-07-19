import React from 'react';
import styles from './styles.module.scss';
import { MainButtonProps } from './MainButton.types';

export const MainButton: React.FC<MainButtonProps> = ({
  type,
  children,
  disabled,
  onClick,
}) => {
  return (
    <button
      className={`${styles.button} ${styles[type]}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
