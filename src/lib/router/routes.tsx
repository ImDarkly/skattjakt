import React from 'react';
import type { PathRouteProps } from 'react-router-dom';
import ItemsPage from '../pages/items';

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
];

export const privateRoutes: Array<PathRouteProps> = [];
