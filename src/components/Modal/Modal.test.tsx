import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { Modal } from '@/components/Modal/Modal';
import { ModalProps } from './type';
import '@testing-library/jest-dom';

const renderModal = (overRide = {}) => {
  const defaultProps: ModalProps = {
    isOpen: true,
    onClose: vi.fn(),
    title: 'Testing Modal',
    children: (
      <div>
        <p>Modal Content</p>
        <button>Confirm</button>
        <button>Cancel</button>
      </div>
    ),
  };
  return render(<Modal {...defaultProps} {...overRide} />);
};

describe('Modal', () => {
  test('should display component when open', () => {
    renderModal();

    expect(screen.getByRole('alertdialog')).toBeInTheDocument();
    expect(screen.getByText('Testing Modal')).toBeInTheDocument();
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  test('Should does not render when closed', () => {
    renderModal({ isOpen: false });

    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
  });
  test('renders buttons inside modal', () => {
    renderModal();

    expect(screen.getByText('Confirm')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });
});
