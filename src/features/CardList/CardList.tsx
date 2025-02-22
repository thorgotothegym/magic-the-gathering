import { FC, useState } from 'react';

import { Card } from '@/components/Card/Card';
import { useGetAllCards } from '@/hooks/useGetAllCards';
import styles from './CardList.module.css';
import { CardProps } from '@/components/Card/type';
import { addCardToCollection } from '@/hooks/useCollection';
import useLocalStorage from '@/hooks/useLocalStorage';
import { Collection as CollectionProps } from '@/features/Collections/type.ts';
import Collection from '../Collections/Collection';
import { Modal } from '@/components/Modal/Modal';

const CardList: FC = () => {
  const { cards, isLoading, isError, error } = useGetAllCards();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardProps | null>(null);

  const [selectedCollectionId, setSelectedCollectionId] = useState<
    number | null
  >(null);

  const [collections, setCollections] = useLocalStorage<CollectionProps[]>(
    'collections',
    []
  );

  const handleAddCardToCollection = (card: CardProps) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  const handleConfirmAddCard = () => {
    if (!selectedCard || selectedCollectionId === null) return;

    const nameCollection = collections.find(
      (col) => col.id === selectedCollectionId
    );
    if (!nameCollection) {
      alert('Collection not found!');
      return;
    }

    const updatedCollections = addCardToCollection(
      collections,
      nameCollection.id,
      selectedCard
    );
    setCollections(updatedCollections);
    setIsModalOpen(false);
  };

  if (isLoading) return <>{isLoading}</>;
  if (isError) return <>{error?.message}</>;

  return (
    <section aria-labelledby="cards-list">
      <Collection />
      <div className={styles.card}>
        {cards?.map(({ name, imageUrl, type, id }) => (
          <Card
            onClick={() =>
              handleAddCardToCollection({ id, name, imageUrl, type })
            }
            id={id}
            key={id}
            name={name}
            imageUrl={imageUrl}
            type={type}
          />
        ))}
      </div>
      {isModalOpen && selectedCard && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Add Card to Collection"
        >
          <p>Select a collection to add {selectedCard.name}:</p>
          <select
            onChange={(e) => setSelectedCollectionId(Number(e.target.value))}
          >
            <option value="">Select Collection</option>
            {collections.map((col) => (
              <option key={col.id} value={col.id}>
                {col.name}
              </option>
            ))}
          </select>
          <button
            onClick={handleConfirmAddCard}
            disabled={!selectedCollectionId}
          >
            Confirm
          </button>
        </Modal>
      )}
    </section>
  );
};

export default CardList;
