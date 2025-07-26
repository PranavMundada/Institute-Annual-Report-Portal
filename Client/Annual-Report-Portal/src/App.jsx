import './App.css';
import { useNavigate } from 'react-router';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  const navigate = useNavigate();
  return (
    <div className="bg-[#090040] min-h-screen flex flex-col">
      <header className="flex flex-col sm:flex-row items-center sm:justify-between px-4 py-6 border-[#FFCC00] border-b-4">
        <h1 className="text-center sm:text-left text-[38px]  md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-0  text-[#FFFFFF]">
          Annual Report Portal
        </h1>

        <div className="flex gap-4">
          <button
            className="px-2 text-[15px] md:text-[20px] md:px-3 md:py-1  border-2 rounded-md  text-[#B13BFF] hover:bg-[#471396] hover:border-3 "
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </button>
          <button
            className="px-2 text-[15px] md:text-[20px] md:px-3 md:py-1  border-2 rounded-md  text-[#B13BFF] hover:bg-[#471396] hover:border-3 "
            onClick={() => navigate('/login')}
          >
            Log In
          </button>
        </div>
      </header>

      <main className="flex-grow">
        <div className="flex flex-col justify-center items-center m-5 sm:m-6 md:m-9 lg:m-15">
          <h1 className=" text-center sm:text-left text-[20px]  md:text-3xl lg:text-4xl text-white m-5">
            Streamline Your Institute's Annual Reports
          </h1>
          <h1 className=" text-center sm:text-left text-[15px]  md:text-[20px] lg:text-[25px] text-white">
            Collect, manage, and generate customized departmental reports — all
            in one place.
          </h1>
        </div>
        <div className="flex justify-center items-center">
          <img
            src="/homepage.svg"
            alt="report Analytics"
            className="size-65 sm:size-70 md:size-85 lg:size-100"
          />
        </div>
      </main>

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

export default App;
