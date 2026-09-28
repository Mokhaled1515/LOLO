import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { forgotPassword, clearResetData } from "../../features/auth/authSlice";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    try {
      await dispatch(forgotPassword(email.trim())).unwrap();

      dispatch(clearResetData());

      toast.success("Verification code sent to your email 📩");

      navigate("/verify-reset-code", {
        state: { email: email.trim() },
      });
    } catch (error) {
      toast.error(
        typeof error === "string"
          ? error
          : error?.message || "Failed to send verification code",
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f5f2] px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#64031b]">
            Forgot Password?
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Enter your email and we'll send you a verification code.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700"
            >
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#64031b] focus:ring-1 focus:ring-[#64031b]"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-[#64031b] px-4 py-3 font-semibold text-white transition hover:bg-[#4d0215] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Sending..." : "Send Verification Code"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-sm font-semibold text-[#64031b] hover:underline"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
