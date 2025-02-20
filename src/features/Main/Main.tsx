import { useGetAllCards } from '@/hooks/useGetAllCards';
import { FC } from 'react';

const Main: FC = () => {
  const { data, isLoading, isError, error } = useGetAllCards();
  if (isLoading) return <>{isLoading}</>;
  if (isError) return <>{error?.message}</>;

  return <>{JSON.stringify(data)}</>;
};
export default Main;
