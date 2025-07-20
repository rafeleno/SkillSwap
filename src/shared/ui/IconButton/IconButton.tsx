import React from 'react';
import styles from './styles.module.scss';
import { IconbuttonProps } from './IconButton.types';


export const IconButton: React.FC<IconbuttonProps> = ({ name }) => {
  return (
    <button className={styles.button}>
      <svg className={styles.svg} width="24px" height="24px" >
        <use href={`/sprites.svg#${name}`} />
      </svg>
    </button>
  );
};