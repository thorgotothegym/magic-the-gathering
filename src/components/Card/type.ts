import { Card as CardType } from '@/type/card';

export type CardProps = Pick<CardType, 'name' | 'imageUrl' | 'type' | 'id'>;

export type CardCustomProps = CardProps & {
  onClick: ({ name, imageUrl, type, id }: CardProps) => void;
};
