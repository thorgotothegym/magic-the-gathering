import { api } from '@/services/api';
import { Cards } from '@/type/card';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

type Error = {
  axiosError: AxiosError;
  message: string;
};

export const useGetAllCards = () => {
  const [data, setData] = useState<Cards>();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error>();

  const fetchAllCards = async () => {
    setIsLoading(true);

    try {
      const { data } = await api<Cards>(`cards`);
      setData(data);
      return data;
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
    data,
    isLoading,
    isError,
    error,
  };
};
