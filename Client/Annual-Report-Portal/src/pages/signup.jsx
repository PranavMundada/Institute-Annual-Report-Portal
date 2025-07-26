import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    department: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await axios.post('http://localhost:3000/api/users/signup', formData);
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
    }
  };

  return (
    <div className="flex flex-col w-screen h-screen bg-[#090040]">
      <header className="flex flex-col sm:flex-row items-center sm:justify-between px-4 py-6 border-[#FFCC00] border-b-4">
        <h1 className="text-center sm:text-left text-[38px]  md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-0  text-[#FFFFFF]">
          Annual Report Portal
        </h1>
      </header>
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
        <div className="max-w-md mx-auto p-6 border-[#FFCC00] border-3 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4 text-[#FFCC00]">Signup</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder="Name"
              onChange={handleChange}
              required
              className="w-full p-2 border rounded text-white"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="Email"
              onChange={handleChange}
              required
              className="w-full p-2 border rounded text-white"
            />

            <input
              type="password"
              name="password"
              value={formData.password}
              placeholder="Password"
              onChange={handleChange}
              required
              className="w-full p-2 border rounded text-white"
            />

            <input
              type="text"
              name="department"
              value={formData.department}
              placeholder="Department"
              onChange={handleChange}
              required
              className="w-full p-2 border rounded text-white"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Sign Up
            </button>
          </form>
          {error && (
            <p className="text-red-600 bg-red-100 p-2 mt-4 rounded">{error}</p>
          )}
          {success && (
            <p className="text-green-600 bg-green-100 p-2 mt-4 rounded">
              {success}
            </p>
          )}
        </div>
      </div>
      <footer className="text-white bg-[#FFCC00]">
        <div className="flex flex-col text-[15px] md:flex-row justify-evenly items-center text-black lg:text-[20px]">
          <div>© 2025 Institute Annual Report Portal</div>
          <div>Developed by Pranav Mundada</div>
          <div>Contact: pjmundada2005@gmail.com</div>
        </div>
      </footer>
    </div>
  );
};

export default Signup;
