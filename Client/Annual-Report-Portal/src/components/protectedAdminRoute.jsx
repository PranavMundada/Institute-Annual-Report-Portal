import { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedAdminRoute = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const user = await axios.get('http://localhost:3000/api/me', {
          withCredentials: true,
        });

        if (!user) {
          return <Navigate to="/login" />;
        }
        setLoading(false);
        setIsAuth(true);
        if (user.data.user.role === 'admin') setIsAdmin(true);
      } catch (err) {
        console.log('unauthorized', err.message);
        setIsAdmin(false);
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };
    checkAdmin();
  }, []);

  if (loading) {
    return <div>Loading</div>;
  }

  if (!isAuth) {
    alert('Please Login');
    return <Navigate to="/login" />;
  }
  if (!isAdmin) {
    alert('You are not authorized to enter that page.');
    return <Navigate to="/" />;
  }
  return <Outlet />;
};
