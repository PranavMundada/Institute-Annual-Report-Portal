import { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const [error, setError] = useState(''); // for showing error

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3000/api/users/login',
        formData,
        { withCredentials: true }
      );
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
    }
  };

  return (
    <div className="flex flex-col  bg-[#090040] h-screen">
      <header className="flex flex-col sm:flex-row items-center sm:justify-between px-4 py-6 border-[#FFCC00] border-b-4">
        <h1 className="text-center sm:text-left text-[38px]  md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-0  text-[#FFFFFF]">
          Annual Report Portal
        </h1>
      </header>
      <div className="flex justify-center  ">
        <img
          src="/go-back-arrow1.svg"
          alt="go back"
          className="size-10 m-5"
          onClick={() => {
            navigate('/');
          }}
        />
      </div>
      <div className="flex justify-center items-center flex-grow">
        <form
          onSubmit={handleSubmit}
          className="p-6 rounded-lg shadow-md w-full max-w-sm border-[#FFCC00] border-3"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center text-[#FFCC00]">
            Login
          </h2>

          <div className="mb-4">
            <input
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 border-white text-white"
              type="email"
              name="email"
              id="email"
              required
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-6">
            <input
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2  border-white text-white"
              type="password"
              name="password"
              id="password"
              required
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Log In
          </button>
          {error && (
            <div className=" flex justify-center text-red-600  p-2 rounded m-3">
              {error}
            </div>
          )}
        </form>
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
}

export default Login;
