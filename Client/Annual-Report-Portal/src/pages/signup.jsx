import { useState } from 'react';
import { useNavigate } from 'react-router';

import GlobalHeader from '../components/globalHeader';
import GlobalFooter from '../components/globalFooter';
import { SignupForm } from '../components/signup-form';
import { signupUser } from '../api/auth';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    department: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters');
        setLoading(false);
        return;
      }
      await signupUser(formData);
      setSuccess('Signup successful! You can now login.');
      setFormData({
        name: '',
        email: '',
        password: '',
        department: '',
      });
      setTimeout(() => {
        navigate('/unauthorized');
      }, 2000);
    } catch (err) {
      console.log(err);
      setError(err.response.data.message || 'Signup failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-screen h-screen bg-[#090040]">
      <GlobalHeader />
      <div className="flex justify-center ">
        <img
          src="/go-back-arrow1.svg"
          alt="go back"
          className="size-10 m-5"
          onClick={() => {
            navigate('/');
          }}
        />
      </div>
      <div className="h-screen flex justify-center items-center">
        <SignupForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          error={error}
          success={success}
          loading={loading}
        />
      </div>
      <GlobalFooter />
    </div>
  );
};

export default Signup;
