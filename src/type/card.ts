export type Cards = {
  cards: Card[];
};

export enum Type {
  Creature = 'Creature',
  Enchantment = 'Enchantment',
  Instant = 'Instant',
  Sorcery = 'Sorcery',
}

export type Card = {
  name: string;
  manaCost: string;
  cmc: number;
  type: string;
  imageUrl?: string;
  types: Type[];
  subtypes?: string[];
  text: string;
  artist: string;
  number: string;
  power?: string;
  id: string;
};
