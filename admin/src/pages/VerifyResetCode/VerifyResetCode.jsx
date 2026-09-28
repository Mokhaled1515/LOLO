import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { verifyResetCode, forgotPassword } from "../../features/auth/authSlice";

const VerifyResetCode = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  const [code, setCode] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Email is missing. Please request a new code.");
      navigate("/forgot-password");
      return;
    }
    if (!/^\d{6}$/.test(code)) {
      toast.error("Please enter a valid 6-digit code");
      return;
    }
    try {
      await dispatch(
        verifyResetCode({
          email,
          code,
        }),
      ).unwrap();

      toast.success("Code verified successfully");

      navigate("/reset-password", {
        state: {
          email,
          code,
        },
      });
    } catch (error) {
      toast.error(
        typeof error === "string"
          ? error
          : error?.message || "Invalid or expired verification code",
      );
    }
  };

  const handleResendCode = async () => {
    if (!email) {
      toast.error("Email is missing. Please request a new code.");
      navigate("/forgot-password");
      return;
    }

    try {
      await dispatch(forgotPassword(email)).unwrap();

      setCode("");

      toast.success("A new verification code has been sent to your email 📩");
    } catch (error) {
      toast.error(
        typeof error === "string"
          ? error
          : error?.message || "Failed to send a new code",
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f5f2] px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#64031b]">Verify Code</h1>

          <p className="mt-2 text-sm text-gray-500">
            Enter the 6-digit verification code sent to your email.
          </p>

          {email && (
            <p className="mt-3 text-sm font-semibold text-gray-700 break-all">
              {email}
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label
              htmlFor="code"
              className="block text-sm font-semibold text-gray-700"
            >
              Verification Code
            </label>

            <input
              id="code"
              name="code"
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
              placeholder="Enter 6-digit code"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-center text-xl tracking-[0.4em] outline-none transition focus:border-[#64031b] focus:ring-1 focus:ring-[#64031b]"
              required
            />
          </div>

          <button
            type="submit"
            disabled={code.length !== 6}
            className="w-full rounded-lg bg-[#64031b] px-4 py-3 font-semibold text-white transition hover:bg-[#4d0215] disabled:cursor-not-allowed disabled:opacity-60"
          >
            Verify Code
          </button>
        </form>

        <div className="mt-6 flex flex-col gap-3 text-center">
          <button
            type="button"
            onClick={handleResendCode}
            className="text-sm font-semibold text-[#64031b] hover:underline"
          >
            Send a new code
          </button>

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-sm text-gray-500 hover:underline"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyResetCode;
