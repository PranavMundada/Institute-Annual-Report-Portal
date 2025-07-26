import { createRoot } from 'react-dom/client';
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from 'react-router';
import { StrictMode } from 'react';

import './index.css';
import App from './App.jsx';
import Signup from './pages/signup.jsx';
import Login from './pages/login.jsx';
import AdminDashboard from './pages/adminDashboard.jsx';
import CreateEntry from './pages/createEntry.jsx';
import { ProtectedAdminRoute } from './components/protectedAdminRoute.jsx';
import Submissions from './pages/submissions.jsx';
import EntryDetails from './components/EntryDetails.jsx';
import AddFaculty from './pages/AddFaculty.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/admin',
    element: <ProtectedAdminRoute />,
    children: [
      {
        path: 'dashboard',
        element: <AdminDashboard />,
        children: [
          {
            path: 'createEntry',
            element: <CreateEntry />,
          },
          {
            path: 'submissions',
            element: <Submissions />,
            children: [
              {
                path: ':id',
                element: <EntryDetails />,
              },
            ],
          },
          {
            path: 'addFaculty',
            element: <AddFaculty />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
