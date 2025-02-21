import { Layout } from '@/layouts/Layout';
import { lazy, Suspense } from 'react';
import { Route, Router, useRoute } from 'wouter';

const NotFound = lazy(() => import('../components/NotFound/NotFound'));
const Main = lazy(() => import('../features/Main/Main'));

export const Routes = () => {
  const isMain = useRoute('/');
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Layout>
        <Router base="">
          <Route path="" component={Main} />
          {!isMain[0] && <NotFound />}
        </Router>
      </Layout>
    </Suspense>
  );
};
