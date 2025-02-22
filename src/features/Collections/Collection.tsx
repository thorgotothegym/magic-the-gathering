import { FC, useState } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import { Collection as CollectionProps } from './type';
import styles from './Collection.module.css';
import {
  removeCardFromCollection,
  /*   addCardToCollection,
  CardProps, */
} from '@/hooks/useCollection';
import { Modal } from '@/components/Modal/Modal';

// TODO: Needs refactoring
export const Collection: FC = () => {
  const [collections, setCollections] = useLocalStorage<CollectionProps[]>(
    'collections',
    []
  );
  const [isModalOpenEdit, setIsModalOpenEdit] = useState<boolean>(false);
  const [selectedCollectionId, setSelectedCollectionId] = useState<
    number | null
  >(null);

  const [newCollectionName, setNewCollectionName] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [isModalOpenRemove, setIsModalOpenRemove] = useState(false);

  const handleAddCollection = () => {
    setIsCreateModalOpen(true);
  };

  const handleConfirmAddCollection = () => {
    if (!newCollectionName) return;

    const createNewCollection: CollectionProps = {
      id: Math.floor(Math.random() * 1000000),
      name: newCollectionName,
      cards: [],
    };

    setCollections((prev) => [...prev, createNewCollection]);
    localStorage.setItem(
      'collections',
      JSON.stringify([...collections, createNewCollection])
    );
    setIsCreateModalOpen(false);
    setNewCollectionName('');
  };

  const handleEditNameCollection = (id: number) => {
    setSelectedCollectionId(id);
    setIsModalOpenEdit(true);
  };

  const handleConfirmEdit = () => {
    if (!newCollectionName || selectedCollectionId === null) return;

    const updateNameCollection = collections.map((collection) =>
      collection.id === selectedCollectionId
        ? { ...collection, name: newCollectionName }
        : collection
    );

    setCollections(updateNameCollection);
    setIsModalOpenEdit(false);
    setNewCollectionName('');
  };

  const toggleFavorite = (id: number) => {
    const updatedCollections = collections.map((collection) =>
      collection.id === id
        ? { ...collection, isFavorite: !collection.isFavorite }
        : collection
    );

    setCollections(updatedCollections);
  };

  /*   const handleAddCard = (collectionId: number, card: CardProps) => {
    const updatedCollections = addCardToCollection(
      collections,
      collectionId,
      card
    );
    setCollections(updatedCollections);
  }; */

  const handleRemoveCard = (collectionId: number, cardId: string) => {
    const updatedCollections = removeCardFromCollection(
      collections,
      collectionId,
      cardId
    );
    setCollections(updatedCollections);
  };

  const handleRemoveCollection = (id: number) => {
    setSelectedCollectionId(id);
    setIsModalOpenRemove(true);
  };

  const handleConfirmRemoveCollection = () => {
    if (selectedCollectionId === null) return;

    const removeCollectionWithId = collections.filter(
      (collection) => collection.id !== selectedCollectionId
    );
    setCollections(removeCollectionWithId);
    localStorage.setItem('collections', JSON.stringify(removeCollectionWithId));
    setIsModalOpenRemove(false);
    setSelectedCollectionId(null);
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
            {cards.length > 0 && (
              <ul className={styles.collection__cards}>
                {cards.map((card) => (
                  <li key={card.id} className={styles.collection__card}>
                    <span>{card.name}</span>
                    <button onClick={() => handleRemoveCard(id, card.id)}>
                      Remove Card
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      {isModalOpenEdit && (
        <Modal
          isOpen={isModalOpenEdit}
          onClose={() => setIsModalOpenEdit(false)}
          title="Edit Collection Name"
        >
          <input
            type="text"
            value={newCollectionName}
            onChange={(event) => {
              const { value } = event.target;
              setNewCollectionName(value);
            }}
            placeholder="New collection name"
          />
          <button onClick={handleConfirmEdit} disabled={!newCollectionName}>
            Confirm
          </button>
        </Modal>
      )}
      {isCreateModalOpen && (
        <Modal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          title="Create New Collection"
        >
          <input
            type="text"
            value={newCollectionName}
            onChange={(e) => setNewCollectionName(e.target.value)}
            placeholder="Collection name"
          />
          <button
            onClick={handleConfirmAddCollection}
            disabled={!newCollectionName}
          >
            Create
          </button>
        </Modal>
      )}
      {isModalOpenRemove && (
        <Modal
          isOpen={isModalOpenRemove}
          onClose={() => setIsModalOpenRemove(false)}
          title="Remove Collection"
        >
          <p>
            This action cannot be undone. Are you sure you want to delete this
            collection?
          </p>
          <button onClick={handleConfirmRemoveCollection}>Yes, Delete</button>
          <button onClick={() => setIsModalOpenRemove(false)}>Cancel</button>
        </Modal>
      )}
    </div>
  );
};

export default Collection;
