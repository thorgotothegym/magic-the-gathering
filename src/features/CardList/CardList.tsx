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

  const [collections, setCollections] = useLocalStorage<CollectionProps[]>(
    'collections',
    []
  );

  const handleAddCardToCollection = (card: CardProps) => {
    const collectionName = prompt(
      'Enter the collection name to add this card to:'
    );
    if (!collectionName) return;
    // Retrieve all the information about the collection name
    const nameCollection = collections.find(
      (col) => col.name === collectionName
    );
    if (!nameCollection) {
      alert('Collection not found!');
      return;
    }

    const updatedCollections = addCardToCollection(
      collections,
      nameCollection.id,
      card
    );
    setCollections(updatedCollections);

    setSelectedCard(card);
    setIsModalOpen(true);
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
          <p>{selectedCard.name} has been added to the collection.</p>
        </Modal>
      )}
    </section>
  );
};

export default CardList;
