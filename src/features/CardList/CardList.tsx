import { Card } from '@/components/Card/Card';
import { useGetAllCards } from '@/hooks/useGetAllCards';
import { FC } from 'react';

import styles from './CardList.module.css';
import Collection from '../Collections/Collection';

const CardList: FC = () => {
  const { cards, isLoading, isError, error } = useGetAllCards();

  // TODO : Create alert message
  if (isLoading) return <>{isLoading}</>;
  if (isError) return <>{error?.message}</>;

  return (
    <section aria-labelledby="cards-list">
      <Collection />
      <div className={styles.card}>
        {cards?.map(({ name, imageUrl, type, id }) => (
          <Card key={id} name={name} imageUrl={imageUrl} type={type} />
        ))}
      </div>
    </section>
  );
};
export default CardList;
