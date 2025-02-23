import { FC, useState } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import { useCardId } from '@/hooks/useCardId';
import { Collection as CollectionProps } from './type';
import styles from './Collection.module.css';
import {
  addCardToCollection,
  removeCardFromCollection,
} from '@/hooks/useCollection';
import { Modal } from '@/components/Modal/Modal';
import { CardProps } from '@/components/Card/type';

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

  const [newCardName, setNewCardName] = useState('');
  const [isModalOpenAddCard, setIsModalOpenAddCard] = useState(false);

  const {
    card,
    error,
    isError: isErrorCardId,
    isLoading: isLoadingCardId,
    fetchCardId,
  } = useCardId();

  const isCardName = card?.card.name ? card?.card.name : '';

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

  const handleOpenAddCardModal = (id: number) => {
    setSelectedCollectionId(id);
    setIsModalOpenAddCard(true);
  };

  const handleAddCard = () => {
    if (!card || !selectedCollectionId) return;

    const cardData: CardProps = {
      id: card.card.id,
      name: card.card.name,
      type: card.card.type,
    };

    const updatedCollections = addCardToCollection(
      collections,
      selectedCollectionId,
      cardData
    );
    setCollections(updatedCollections);
    setIsModalOpenAddCard(false);
  };

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
          <li
            key={id}
            className={`${styles.collection__item} ${isFavorite ? styles.collection__favorite : ''}`}
          >
            <span className={styles.collection__item__name}>{name}</span>
            <button
              onClick={() => toggleFavorite(id)}
              aria-label={`Add ${name} to favorite`}
            >
              {isFavorite ? '❤️' : '🤍'}
            </button>
            <button
              aria-label={`change ${name.toUpperCase()}'s name to a new one`}
              onClick={() => {
                handleEditNameCollection(id);
              }}
            >
              Edit
            </button>
            <button
              aria-label={`Remove ${name}`}
              className={`${styles.collection__delete} danger`}
              onClick={() => handleRemoveCollection(id)}
            >
              Remove
            </button>
            <button
              aria-label="Add New Card"
              onClick={() => handleOpenAddCardModal(id)}
            >
              Add New Card
            </button>
            {cards.length > 0 && (
              // TODO: Extract this to a new component
              <ul>
                {cards.map((card) => (
                  <li key={card.id} className={styles.collection__list__cards}>
                    <span>{card.name}</span>
                    <button
                      className="spacing-xs-ml spacing-xs-mb"
                      aria-label={`Remove Card: ${name}`}
                      onClick={() => handleRemoveCard(id, card.id)}
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
      {isModalOpenEdit && (
        <Modal
          isOpen={isModalOpenEdit}
          onClose={() => setIsModalOpenEdit(false)}
          title={`What name do you want to give to this collection?`}
        >
          <input
            type="text"
            maxLength={15}
            minLength={4}
            value={newCollectionName}
            onChange={(event) => {
              const { value } = event.target;
              setNewCollectionName(value);
            }}
            placeholder="New collection name"
          />
          <button
            className="spacing-xs-ml"
            onClick={handleConfirmEdit}
            disabled={!newCollectionName}
          >
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
            maxLength={15}
            minLength={4}
            value={newCollectionName}
            onChange={(event) => {
              const { value } = event.target;
              setNewCollectionName(value);
            }}
            placeholder="Name of the new collection"
          />
          <button
            className="spacing-xs-ml spacing-xs-mb"
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
          <button
            className="danger"
            onClick={() => setIsModalOpenRemove(false)}
          >
            Cancel
          </button>
        </Modal>
      )}
      {isModalOpenAddCard && (
        <Modal
          isOpen={isModalOpenAddCard}
          onClose={() => setIsModalOpenAddCard(false)}
          title="Add New Card"
        >
          <p>Enter the 6 digits of the card: Example (386610)</p>
          <input
            type="number"
            value={newCardName}
            max={6}
            min={6}
            onChange={(event) => {
              const { value } = event.target;
              setNewCardName(value);
            }}
            placeholder="Card ID Number"
          />
          <button
            onClick={() => fetchCardId(Number(newCardName))}
            disabled={isLoadingCardId || !newCardName}
            className="spacing-xs-ml spacing-xs-mb"
          >
            {isLoadingCardId ? 'Searching...' : 'Search Card'}
          </button>
          <button
            className="spacing-xs-ml spacing-xs-mb"
            onClick={handleAddCard}
            disabled={!isCardName}
          >
            Add
          </button>
          <p className={`${isCardName ? styles.collection__add_card : ''}`}>
            {isCardName ? `${isCardName}` : ''}
          </p>
          {isErrorCardId &&
            error?.message &&
            error.message.length > 0 &&
            (isCardName ? `${isCardName}` : '')}
        </Modal>
      )}
    </div>
  );
};

export default Collection;
