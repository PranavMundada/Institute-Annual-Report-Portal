import { useState } from 'react';
import { useNavigate } from 'react-router';

import { loginUser } from '../api/auth';
import { LoginForm } from '../components/login-form';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await loginUser(formData);
      const user = response.data.data.user;
      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else if (user.role === 'hod') {
        navigate('/hod/dashboard');
      } else if (user.role === 'faculty') {
        navigate('/faculty/dashboard');
      } else {
        navigate('/unauthorized');
      }
    } catch (err) {
      if (err.response?.status === 401) {
        setError('Invalid email or password');
      } else {
        setError('Something went wrong. Try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginForm
      navigate={navigate}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      loading={loading}
      formData={formData}
      error={error}
    />
  );
}

export default Login;
