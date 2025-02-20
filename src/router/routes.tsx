import { Layout } from "@/layouts/Layout";
import { lazy, Suspense } from "react";
import { Route, Switch } from "wouter";

const NotFound = lazy(() => import("../components/NotFound/NotFound"));

export const Routes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Layout>
          <Route component={NotFound} />
        </Layout>
      </Switch>
    </Suspense>
  );
};
