import { render, screen } from '@testing-library/react';
import { CardCustomProps } from './type';
import { expect, it } from 'vitest';
import { Card } from './Card';

const card: CardCustomProps = {
  name: 'Ancestor Chosen',
  imageUrl: 'https://picsum.photos/223/310',
  type: 'Creature — Human Cleric',
  id: '1',
  onClick: () => {},
};

it('should render the name', () => {
  render(<Card {...card} />);
  expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
    card.name
  );
});

it('should render the provided image', () => {
  render(<Card {...card} />);
  const img = screen.getByRole('img');
  expect(img).toHaveAttribute('src', card.imageUrl);
  expect(img).toHaveAttribute('alt', card.name);
});

it('should render the default image when no imageUrl is provided', () => {
  render(
    <Card name={card.name} type={card.type} id={card.id} onClick={() => {}} />
  );
  const img = screen.getByRole('img');
  expect(img).toHaveAttribute('src', 'https://picsum.photos/223/310');
});
