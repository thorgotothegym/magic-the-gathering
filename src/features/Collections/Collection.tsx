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
        ? { ...collection, favorite: !collection.favorite }
        : collection
    );
    setCollections(updatedCollections);
  };

  return (
    <div className={styles.collection}>
      <button onClick={handleAddCollection}>+ Create a New Collection</button>
      <ul>
        {collections.map(({ id, name, favorite }) => (
          <li key={id}>
            <span>{name}</span>
            <button onClick={() => toggleFavorite(id)}>
              {favorite ? 'Add Favorite' : 'Remove Favorite'}
            </button>
            <button onClick={() => handleRemoveCollection(id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Collection;
