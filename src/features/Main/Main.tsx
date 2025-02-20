import { Card } from '@/components/Card/Card';
import { useGetAllCards } from '@/hooks/useGetAllCards';
import { FC } from 'react';

const Main: FC = () => {
  const { cards, isLoading, isError, error } = useGetAllCards();

  if (isLoading) return <>{isLoading}</>;
  if (isError) return <>{error?.message}</>;

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {cards?.map(({ name, imageUrl, type, id }) => (
        <Card key={id} name={name} imageUrl={imageUrl} type={type} />
      ))}
    </div>
  );
};
export default Main;
