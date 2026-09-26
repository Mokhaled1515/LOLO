import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { resetPassword } from "../../features/auth/authSlice"

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";
  const code = location.state?.code || "";

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const { password, confirmPassword } = formData;

  const passwordRules = {
    minLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecial: /[!@#$%^&*(),.?":{}|<>_\-\\[\]/`~+=;' ]/.test(password),
  };

  const isPasswordStrong = Object.values(passwordRules).every(Boolean);

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !code) {
      toast.error("Reset session expired. Please request a new code.");
      navigate("/forgot-password");
      return;
    }

    if (!isPasswordStrong) {
      toast.error("Please create a stronger password.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      await dispatch(
        resetPassword({
          email,
          code,
          newPassword: password,
        }),
      ).unwrap();

      toast.success("Password reset successfully ✅");

      navigate("/login");
    } catch (error) {
      toast.error(
        typeof error === "string"
          ? error
          : error?.message || "Failed to reset password",
      );
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-[#fdfbf7]">
      <div className="max-w-md w-full bg-white border border-[#e6dfd5] rounded-3xl shadow-xl p-8 md:p-10 relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#64031b]/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>

        {/* Header */}
        <div className="text-center mb-8 relative">
          <h1 className="text-3xl font-black text-[#64031b] tracking-wide mb-2">
            Reset Password
          </h1>

          <p className="text-sm text-gray-500 font-medium">
            Create a new password for your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 relative">
          {/* New Password */}
          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="block text-xs font-bold uppercase tracking-wider text-gray-700"
            >
              New Password
            </label>

            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter new password"
              value={password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-50/50 border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#64031b] focus:bg-white transition text-sm"
            />

            {password && (
              <div className="mt-3">
                {isPasswordStrong ? (
                  <div className="text-sm font-semibold text-green-600">
                    ✓ Password is strong
                  </div>
                ) : (
                  <div className="text-sm text-gray-500">
                    Password requirements:
                  </div>
                )}

                <div className="mt-2 space-y-1 text-xs">
                  <p
                    className={
                      passwordRules.minLength
                        ? "text-green-600"
                        : "text-gray-400"
                    }
                  >
                    {passwordRules.minLength ? "✓" : "○"} At least 8 characters
                  </p>

                  <p
                    className={
                      passwordRules.hasUppercase
                        ? "text-green-600"
                        : "text-gray-400"
                    }
                  >
                    {passwordRules.hasUppercase ? "✓" : "○"} One uppercase
                    letter (A-Z)
                  </p>

                  <p
                    className={
                      passwordRules.hasLowercase
                        ? "text-green-600"
                        : "text-gray-400"
                    }
                  >
                    {passwordRules.hasLowercase ? "✓" : "○"} One lowercase
                    letter (a-z)
                  </p>

                  <p
                    className={
                      passwordRules.hasNumber
                        ? "text-green-600"
                        : "text-gray-400"
                    }
                  >
                    {passwordRules.hasNumber ? "✓" : "○"} One number (0-9)
                  </p>

                  <p
                    className={
                      passwordRules.hasSpecial
                        ? "text-green-600"
                        : "text-gray-400"
                    }
                  >
                    {passwordRules.hasSpecial ? "✓" : "○"} One special character
                    (!@#$...)
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-1.5">
            <label
              htmlFor="confirmPassword"
              className="block text-xs font-bold uppercase tracking-wider text-gray-700"
            >
              Confirm Password
            </label>

            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-50/50 border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#64031b] focus:bg-white transition text-sm"
            />

            {confirmPassword && (
              <p
                className={`text-xs font-semibold ${
                  password === confirmPassword
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {password === confirmPassword
                  ? "✓ Passwords match"
                  : "✕ Passwords do not match"}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isPasswordStrong || password !== confirmPassword}
            className="w-full py-3.5 mt-2 bg-[#64031b] text-white font-bold rounded-xl hover:bg-[#4d0214] active:scale-[0.99] transition shadow-lg cursor-pointer text-sm tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
