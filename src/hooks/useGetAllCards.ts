import { api } from '@/services/api';
import { Card, Cards } from '@/type/card';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

type Error = {
  axiosError: AxiosError;
  message: string;
};

export const useGetAllCards = () => {
  const [cards, setCards] = useState<Card[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error>();

  const fetchAllCards = async () => {
    setIsLoading(true);

    try {
      const response = await api<Cards>(`cards`);
      setCards(response.data.cards);
      return response.data.cards;
    } catch (error) {
      const axiosError = error as AxiosError;
      setIsError(true);
      setError({
        axiosError: axiosError,
        message:
          'There is an error displaying the cards, please try again later. Thanks',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCards();
  }, []);

  return {
    cards,
    isLoading,
    isError,
    error,
  };
};
