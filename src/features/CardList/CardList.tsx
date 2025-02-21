import { Card } from '@/components/Card/Card';
import { useGetAllCards } from '@/hooks/useGetAllCards';
import { FC } from 'react';

import styles from './CardList.module.css';

const CardList: FC = () => {
  const { cards, isLoading, isError, error } = useGetAllCards();

  // TODO : Create alert message
  if (isLoading) return <>{isLoading}</>;
  if (isError) return <>{error?.message}</>;

  return (
    <section aria-labelledby="cards-list">
      <div className={styles.card__title}>
        <h2>Card List</h2>
      </div>
      <div className={styles.card}>
        {cards?.map(({ name, imageUrl, type, id }) => (
          <Card key={id} name={name} imageUrl={imageUrl} type={type} />
        ))}
      </div>
    </section>
  );
};
export default CardList;
