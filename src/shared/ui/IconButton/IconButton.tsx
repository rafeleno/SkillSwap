import React from 'react';
import styles from './styles.module.scss';
import { IconbuttonProps } from './IconButton.types';


export const IconButton: React.FC<IconbuttonProps> = ({ name }) => {
  return (
    <button>
      <svg>
        <use xlinkHref={`/svg/main/${name}.svg`} />
      </svg>
    </button>
  );
};