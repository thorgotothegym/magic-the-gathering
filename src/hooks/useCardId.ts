import { api } from '@/services/api';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

type Error = {
  axiosError: AxiosError;
  message: string;
};

type CardId = {
  card: {
    name: string;
  };
};

export const useCardId = (id: number) => {
  const [cardName, setCardName] = useState<string>();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [error, setError] = useState<Error>();

  const fetchCardId = async () => {
    setIsLoading(true);

    try {
      const response = await api<CardId>(`cards/${id}`);
      const { name } = response.data.card;
      setCardName(name);
      return name;
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
    fetchCardId();
  }, [id]);

  return {
    cardName,
    fetchCardId,
    setIsLoading,
    isLoading,
    isError,
    error,
  };
};
