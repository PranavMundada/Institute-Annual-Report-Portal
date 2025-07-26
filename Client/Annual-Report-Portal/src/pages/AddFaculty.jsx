import { useState } from 'react';
import axios from 'axios';

export default function AddFaculty() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    department: '',
    role: 'faculty',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
    } catch (err) {
      console.log(err);
      setError(err.response.data.message || 'Signup failed.');
    }
  };

  return (
    <div className="flex h-full flex-col justify-evenly">
      <div className="flex justify-center items-center text-xl md:text-3xl lg:text-4xl mt-5 mb-5 ">
        Add Faculty
      </div>
      <div className="flex h-full justify-center items-center">
        <div className="max-w-md mx-auto p-6 border-[#FFCC00] border-3 rounded-lg shadow">
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
              className=" w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
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
    </div>
  );
}
