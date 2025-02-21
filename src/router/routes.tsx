import { Layout } from '@/layouts/Layout';
import { lazy, Suspense } from 'react';
import { Route, Switch } from 'wouter';

const NotFound = lazy(() => import('../components/NotFound/NotFound'));
const Main = lazy(() => import('../features/Main/Main'));

export const Routes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Layout>
          <Route path="" component={Main} />
        </Layout>
      </Switch>
    </Suspense>
  );
};
