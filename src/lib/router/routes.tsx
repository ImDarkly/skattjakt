import React from 'react';
import type { PathRouteProps } from 'react-router-dom';
import ItemsPage from '../pages/items';
import CardHistoryPage from '../pages/card-history';

const Home = React.lazy(() => import('@/lib/pages/home'));

export const routes: Array<PathRouteProps> = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/items',
    element: <ItemsPage />,
  },
  {
    path: '/cards-history',
    element: <CardHistoryPage />,
  },
];

export const privateRoutes: Array<PathRouteProps> = [];
