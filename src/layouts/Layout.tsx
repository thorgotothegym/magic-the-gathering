import { FC, ReactNode } from 'react';

import styles from './Layout.module.css';

type Layout = {
  children: ReactNode;
};

export const Layout: FC<Layout> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <main className={styles.layout__main}>{children}</main>
    </div>
  );
};
