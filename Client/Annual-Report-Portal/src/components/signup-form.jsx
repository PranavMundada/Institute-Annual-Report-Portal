import SmallLoader from './small-loader';
import { useNavigate } from 'react-router';

export const SignupForm = ({
  formData,
  handleSubmit,
  handleChange,
  error,
  success,
  loading,
}) => {
  const navigate = useNavigate();
  return (
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
          disabled={loading}
        >
          {loading ? <SmallLoader /> : 'Sign Up '}
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
      <div className="text-sm text-center text-white mt-4">
        Already have an account?{'  '}
        <span
          className="text-yellow-400 underline cursor-pointer"
          onClick={() => navigate('/login')}
        >
          Login
        </span>
      </div>
    </div>
  );
};
