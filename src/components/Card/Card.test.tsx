import { render, screen } from '@testing-library/react';
import { CardProps } from './type';
import { expect, it } from 'vitest';
import { Card } from './Card';

const card: CardProps = {
  name: 'Ancestor Chosen',
  imageUrl: 'https://picsum.photos/223/310',
  type: 'Creature — Human Cleric',
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
  render(<Card name={card.name} type={card.type} />);
  const img = screen.getByRole('img');
  expect(img).toHaveAttribute('src', 'https://picsum.photos/223/310');
});
