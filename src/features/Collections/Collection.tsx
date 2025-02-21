import { FC } from 'react';

import useLocalStorage from '../../hooks/useLocalStorage';
import { Collection as CollectionProps } from './type';

import styles from './Collection.module.css';

export const Collection: FC = () => {
  const [collections, setCollections] = useLocalStorage<CollectionProps[]>(
    'collections',
    []
  );

  const handleAddCollection = () => {
    const name = prompt('Please enter the collection name');
    if (name) {
      const newCollection = { id: Date.now(), name, cards: [] };
      setCollections([...collections, newCollection]);
    }
  };

  const handleRemoveCollection = (id: number) => {
    const removeCollection = collections.filter(
      (collection) => collection.id !== id
    );
    setCollections(removeCollection);
  };

  const toggleFavorite = (id: number) => {
    const updatedCollections = collections.map((collection) =>
      collection.id === id
        ? { ...collection, isFavorite: !collection.isFavorite }
        : collection
    );
    setCollections(updatedCollections);
  };

  return (
    <div className={styles.collection}>
      <button
        className={styles.collection__button}
        onClick={handleAddCollection}
      >
        + Create a New Collection
      </button>
      <ul className={styles.collection__list}>
        {collections.map(({ id, name, isFavorite }) => (
          <li key={id} className={styles.collection__item}>
            <span className={styles.collection__item__name}>{name}</span>
            <button onClick={() => toggleFavorite(id)} aria-label="favorite">
              {isFavorite ? '❤️' : '🤍'}
            </button>
            <button
              aria-label="remove"
              className={styles.collection__delete}
              onClick={() => handleRemoveCollection(id)}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Collection;
