import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const App = lazy(() => import('../App.jsx'));
const Login = lazy(() => import('../pages/login.jsx'));
const Signup = lazy(() => import('../pages/signup.jsx'));
const AdminDashboard = lazy(() => import('../pages/Admin-Dashboard.jsx'));
const CreateEntry = lazy(() => import('../pages/createEntry.jsx'));
const Submissions = lazy(() => import('../pages/submissions.jsx'));
const EntryDetails = lazy(() => import('../components/EntryDetails.jsx'));
const AddFaculty = lazy(() => import('../pages/AddFaculty.jsx'));

import { ProtectedAdminRoute } from './../components/protectedAdminRoute.jsx';

export const router = createBrowserRouter([
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
          { path: 'dashboard', element: <AdminDashboard /> },
          { path: 'submissions', element: <Submissions /> },
          { path: 'submissions/:id', element: <EntryDetails /> },
          { path: 'createEntry', element: <CreateEntry /> },
          { path: 'addFaculty', element: <AddFaculty /> },
        ],
      },
    ],
  },
]);
