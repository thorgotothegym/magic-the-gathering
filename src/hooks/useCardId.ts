import { api } from '@/services/api';
import { AxiosError } from 'axios';
import { useState } from 'react';

type Error = {
  axiosError: AxiosError;
  message: string;
};

type Card = {
  name: string;
  id: string;
  type: string;
};

export type useCardIdResponse = {
  card: Card;
};

export const useCardId = () => {
  const [card, setCard] = useState<useCardIdResponse>();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [error, setError] = useState<Error>();

  const fetchCardId = async (id: number) => {
    setIsLoading(true);

    try {
      const response = await api<useCardIdResponse>(`cards/${id}`);
      setCard(response.data);
      return response.data;
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

  return {
    card,
    fetchCardId,
    setIsLoading,
    isLoading,
    isError,
    error,
  };
};
