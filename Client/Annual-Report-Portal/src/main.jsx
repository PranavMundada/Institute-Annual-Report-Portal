import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { StrictMode, Suspense } from 'react';

import './index.css';

import { router } from './routes/index';
import Loading from './components/loading';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
    </Suspense>
  </StrictMode>
);
