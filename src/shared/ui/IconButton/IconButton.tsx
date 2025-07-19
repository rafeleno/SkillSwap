import React from 'react';
import styles from './styles.module.scss';
import { IconbuttonProps } from './IconButton.types';

// Пример нерабочего импорта с алиасом
// import svg from '@svg/main/add.svg';

// Пример нерабочего импорта без алиаса
// import svg from '../../../../public/svg/main/add.svg';

export const IconButton: React.FC<IconbuttonProps> = ({ name }) => {
  return (
    <button>
      <svg>
        {/* Попытка подключения с алиасом */}
        <use xlinkHref={`@svg/main/${name}.svg`} />

        {/* Пример попытки подключения без алиаса */}
        {/*<use xlinkHref={`../../../../public/svg/main/${name}.svg`} /> */}
      </svg>
    </button>
  );
};