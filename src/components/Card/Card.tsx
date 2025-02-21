import { FC } from 'react';

import styles from './Card.module.css';
import { CardProps } from './type';

export const Card: FC<CardProps> = ({ name, imageUrl, type }) => {
  const image = imageUrl ? imageUrl : 'https://picsum.photos/223/310';
  return (
    <article className={styles.card}>
      <h3>{name}</h3>
      <img src={image} alt={name} />
      <p>{type}</p>
    </article>
  );
};
