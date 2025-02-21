import { Card } from '@/components/Card/Card';
import { useGetAllCards } from '@/hooks/useGetAllCards';
import { FC } from 'react';

import styles from './Main.module.css';

const Main: FC = () => {
  const { cards, isLoading, isError, error } = useGetAllCards();

  if (isLoading) return <>{isLoading}</>;
  if (isError) return <>{error?.message}</>;

  return (
    <section aria-labelledby="cards-list">
      <div className={styles.main__title}>
        <h2>Card List</h2>
      </div>
      <div className={styles.main}>
        {cards?.map(({ name, imageUrl, type, id }) => (
          <Card key={id} name={name} imageUrl={imageUrl} type={type} />
        ))}
      </div>
    </section>
  );
};
export default Main;
