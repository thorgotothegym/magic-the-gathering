import { Collection } from '@/features/Collections/type';

import { Card } from '@/type/card';

export type CardProps = Pick<Card, 'name' | 'imageUrl' | 'type' | 'id'>;

export const addCardToCollection = (
  collections: Collection[],
  collectionId: number,
  card: CardProps
): Collection[] => {
  return collections.map((collection) => {
    if (collection.id === collectionId) {
      if (collection.cards.some((c) => c.id === card.id)) {
        console.log('Esa carta ya existe');
        return collection;
      }
      return { ...collection, cards: [...collection.cards, card] };
    }
    return collection;
  });
};

export const removeCardFromCollection = (
  collections: Collection[],
  collectionId: number,
  cardId: number
): Collection[] => {
  const updatedCollections = collections.map((collection) => {
    if (collection.id === collectionId) {
      return {
        ...collection,
        cards: collection.cards.filter((c) => c.id !== cardId.toString()),
      };
    }
    return collection;
  });

  console.log('Carta eliminada correctamente');
  return updatedCollections;
};
