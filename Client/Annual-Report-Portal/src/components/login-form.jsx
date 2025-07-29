import GlobalHeader from './globalHeader';
import GlobalFooter from './globalFooter';
import SmallLoader from './small-loader';

export const LoginForm = ({
  navigate,
  handleSubmit,
  formData,
  handleChange,
  loading,
  error,
}) => {
  return (
    <div className="flex flex-col  bg-[#090040] h-screen">
      <GlobalHeader />
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
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            {loading ? <SmallLoader /> : 'Login'}
          </button>
          {error && (
            <div className=" flex justify-center text-red-600  p-2 rounded m-3">
              {error}
            </div>
          )}
          <div className="text-sm text-center text-white mt-4">
            Don’t have an account?{' '}
            <span
              className="text-yellow-400 underline cursor-pointer"
              onClick={() => navigate('/signup')}
            >
              Sign up
            </span>
          </div>
        </form>
      </div>
      <GlobalFooter />
    </div>
  );
};
