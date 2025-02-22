import { CardProps } from '@/components/Card/type';

export type Collection = {
  id: number;
  name: string;
  cards: CardProps[];
  isFavorite?: boolean;
};
