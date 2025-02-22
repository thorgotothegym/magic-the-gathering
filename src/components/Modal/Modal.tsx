import { FC } from 'react';
import { ModalProps } from '@/components/Modal/type';

import styles from './Modal.module.css';

export const Modal: FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div role="alertdialog" className={styles.modal__overlay} onClick={onClose}>
      <div
        className={styles.modal__content}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={styles.modal__close}
          onClick={onClose}
          aria-label="close"
        >
          Close
        </button>
        {title && <h2 className={styles.modal__title}>{title}</h2>}
        <div className={styles.modal__body}>{children}</div>
      </div>
    </div>
  );
};
