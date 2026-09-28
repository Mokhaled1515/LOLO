import { useEffect, useState } from "react";
import { loginUser, reset } from "../../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isSuccess, isError, message } = useSelector(
    (state) => state.auth,
  );
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  useEffect(() => {
    if (isSuccess && user) {
      toast.success("Login successful ✅");
      navigate("/");
    }

    if (isError) {
      toast.error(message || "Login failed ❌");
    }

    dispatch(reset());
  }, [isSuccess, isError, message, user, dispatch, navigate]);

  const handleChange = (e) => {
    setformData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSubmit = {
      email,
      password,
    };
    dispatch(loginUser(dataToSubmit));
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-[#fdfbf7]">
      <div className="max-w-md w-full bg-white border border-[#e6dfd5] rounded-3xl shadow-xl p-8 md:p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#64031b]/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-[#64031b] tracking-wide mb-2">
            Welcome Back
          </h1>
          <p className="text-sm text-gray-500 font-medium">
            Please enter your details to sign in
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="block text-xs font-bold uppercase tracking-wider text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your Email"
              value={email}
              name="email"
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-50/50 border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#64031b] focus:bg-white transition text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-xs font-bold uppercase tracking-wider text-gray-700"
              >
                Password
              </label>
            </div>

            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              value={password}
              name="password"
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-50/50 border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#64031b] focus:bg-white transition text-sm"
            />

            <Link
              to="/forgot-password"
              className="text-xs font-semibold text-[#64031b] hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 mt-2 bg-[#64031b] text-white font-bold rounded-xl hover:bg-[#4d0214] active:scale-[0.99] transition shadow-lg cursor-pointer text-sm tracking-wide"
          >
            Sign In
          </button>
        </form>

        <div className="text-center mt-6 text-sm text-gray-500">
          Don't have an account?
          <Link
            to="/register"
            className="text-[#64031b] font-bold hover:underline"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
