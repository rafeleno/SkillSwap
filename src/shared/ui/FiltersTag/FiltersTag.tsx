import React from 'react';
import styles from './styles.module.scss';
import { FiltersTagProps } from './FiltersTag.types';

export const FiltersTag: React.FC<FiltersTagProps> = ({
  text,
  onClick
}) => {
  return (
    <div className={styles.container}>
      <p>{text}</p>
      <button className={styles.crossButton} onClick={onClick}>
        <svg width="24" height="24" viewBox="5 1 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <use href="#icon-cross" />
        </svg>
      </button>
    </div>
  )
};