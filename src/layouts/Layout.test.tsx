import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import '@testing-library/jest-dom';
import { Layout } from './Layout';
import { Layout as LayoutProps } from './type';

const renderLayout = (customProps = {}) => {
  const defaultProps: LayoutProps = {
    children: <p>children</p>,
  };
  return render(<Layout {...defaultProps} {...customProps} />);
};

describe('Layout', () => {
  test('renders children correctly', () => {
    renderLayout();
    expect(screen.getByText('children')).toBeInTheDocument();
  });

  test('applies layout styles', () => {
    const { container } = renderLayout();
    expect(container.querySelector('main')).toBeInTheDocument();
  });
});
