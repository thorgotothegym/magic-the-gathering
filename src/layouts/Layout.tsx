import { FC } from 'react';

import styles from './Layout.module.css';
import { Layout as LayoutProps } from './type';

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <main className={styles.layout__main}>{children}</main>
    </div>
  );
};
