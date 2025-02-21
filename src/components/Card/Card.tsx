import { FC } from 'react';

import styles from './Card.module.css';
import { CardCustomProps } from './type';

export const Card: FC<CardCustomProps> = ({
  name,
  imageUrl,
  type,
  onClick,
  id,
}) => {
  const image = imageUrl ? imageUrl : 'https://picsum.photos/223/310';
  const handleOnClick = () => {
    onClick({ name, imageUrl, type, id });
  };
  return (
    <article className={styles.card} onClick={handleOnClick}>
      <h3>{name}</h3>
      <img src={image} alt={name} />
      <p>{type}</p>
    </article>
  );
};
