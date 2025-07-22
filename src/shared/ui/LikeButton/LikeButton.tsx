import React from 'react';
import styles from './styles.module.scss';
import { LikeButtonProps } from './LikeButton.types';

export const LikeButton: React.FC<LikeButtonProps> = ({ onClick, isActive = false, className = '' }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${styles.button} ${className}`}
      aria-label="Поставить лайк"
    >
      <svg className={`${styles.icon} ${isActive ? styles.active : ''}`}>
        <use href={`/sprites.svg#${isActive ? 'like-active' : 'like'}`} />
      </svg>
    </button>
  );
};
