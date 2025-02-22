import { FC } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import { Collection as CollectionProps } from './type';
import styles from './Collection.module.css';
import {
  removeCardFromCollection,
  addCardToCollection,
  CardProps,
} from '@/hooks/useCollection';

export const Collection: FC = () => {
  const [collections, setCollections] = useLocalStorage<CollectionProps[]>(
    'collections',
    []
  );

  const handleAddCollection = () => {
    const name = prompt('Please enter the collection name');
    if (!name) return;

    const createNewCollection: CollectionProps = {
      id: Math.floor(Math.random() * 1000000),
      name,
      cards: [],
    };

    setCollections((prev) => [...prev, createNewCollection]);
    localStorage.setItem(
      'collections',
      JSON.stringify([...collections, createNewCollection])
    );
  };

  const handleRemoveCollection = (id: number) => {
    if (!confirm('Are you sure you want to delete the collection?')) return;

    const removeCollectionWithId = collections.filter(
      (collection) => collection.id !== id
    );

    setCollections(removeCollectionWithId);
    localStorage.setItem('collections', JSON.stringify(removeCollectionWithId));
  };

  const handleEditNameCollection = (id: number) => {
    const newName = prompt('Please, write the new name of the collection');
    if (!newName) return;

    const updateNameCollection = collections.map((collection) =>
      collection.id === id ? { ...collection, name: newName } : collection
    );

    setCollections(updateNameCollection);
  };

  const toggleFavorite = (id: number) => {
    const updatedCollections = collections.map((collection) =>
      collection.id === id
        ? { ...collection, isFavorite: !collection.isFavorite }
        : collection
    );

    setCollections(updatedCollections);
  };

  const handleAddCard = (collectionId: number, card: CardProps) => {
    const updatedCollections = addCardToCollection(
      collections,
      collectionId,
      card
    );
    setCollections(updatedCollections);
  };

  const handleRemoveCard = (collectionId: number, cardId: number) => {
    const updatedCollections = removeCardFromCollection(
      collections,
      collectionId,
      cardId
    );
    setCollections(updatedCollections);
  };

  return (
    <div className={styles.collection}>
      <button
        className={styles.collection__button}
        onClick={handleAddCollection}
        aria-label="Create a New Collection"
      >
        + Create a New Collection
      </button>
      <ul className={styles.collection__list}>
        {collections.map(({ id, name, isFavorite, cards }) => (
          <li key={id} className={styles.collection__item}>
            <span className={styles.collection__item__name}>{name}</span>
            <button onClick={() => toggleFavorite(id)} aria-label="favorite">
              {isFavorite ? '❤️' : '🤍'}
            </button>
            <button
              aria-label="Edit"
              onClick={() => handleEditNameCollection(id)}
            >
              Edit
            </button>
            <button
              aria-label="Remove"
              className={styles.collection__delete}
              onClick={() => handleRemoveCollection(id)}
            >
              Remove
            </button>
            <button
              onClick={() => {
                const cardId = prompt('Enter the card ID to add:');
                if (cardId) {
                  handleAddCard(id, {
                    id: String(cardId),
                    name: 'New Card',
                    imageUrl: '',
                    type: '',
                  });
                }
              }}
            >
              Add Card to Collection
            </button>
            {cards.length > 0 && (
              <ul className={styles.collection__cards}>
                {cards.map((card) => (
                  <li key={card.id} className={styles.collection__card}>
                    <span>{card.name}</span>
                    <button
                      onClick={() => handleRemoveCard(id, Number(card.id))}
                    >
                      Remove Card
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Collection;
