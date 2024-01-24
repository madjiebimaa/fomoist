import { createBrowserRouter } from 'react-router-dom';

import IndexPage from '.';
import FocusPage from './focus';
import ProjectPage from './project';
import RootPage from './root';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootPage />,
    children: [
      { index: true, element: <IndexPage /> },
      {
        path: '/focus',
        element: <FocusPage />,
      },
      {
        path: '/projects',
        element: <ProjectPage />,
      },
    ],
  },
]);
