import React from 'react';
import type { PathRouteProps } from 'react-router-dom';

const Generate = React.lazy(() => import('@/lib/pages/generate'));
const Card = React.lazy(() => import('@/lib/pages/card'));

export const routes: Array<PathRouteProps> = [
  {
    path: '/',
    element: <Generate />,
  },
  {
    path: '/generate',
    element: <Generate />,
  },
  {
    path: '/card',
    element: <Card />,
  },
];

export const privateRoutes: Array<PathRouteProps> = [];
