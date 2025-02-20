import { render, screen } from '@testing-library/react';
import NotFound from './NotFound';
import { describe, it } from 'vitest';

describe('NotFound', () => {
  it('renders the NotFound', () => {
    render(<NotFound />);
    screen.debug();
  });
});
