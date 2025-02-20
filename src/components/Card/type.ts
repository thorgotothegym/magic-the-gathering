import { Card as CardType } from '@/type/card';

export type CardProps = Pick<CardType, 'name' | 'imageUrl' | 'type'>;
