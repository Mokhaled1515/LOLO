// import { useEffect, useState } from "react";
// import { registerUser, reset } from "../../features/auth/authSlice";
// import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";

// const Register = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { user, isSuccess, isLoading } = useSelector((state) => state.auth);

//   const [formData, setformData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     phone: "", // أضفنا حقل التليفون هنا
//   });

//   const { name, email, password, phone } = formData;

//   useEffect(() => {
//     if (isSuccess) {
//       navigate("/login");
//       dispatch(reset());
//     }
//   }, [isSuccess, user, dispatch, navigate]);

//   const handleChange = (e) => {
//     setformData((prevState) => ({
//       ...prevState,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!name || !email || !password || !phone) {
//       alert("Please fill in all fields including your phone number.");
//       return;
//     }

//     const dataToSubmit = {
//       name,
//       email,
//       password,
//       phone, // بنبعته مع بيانات التسجيل للباك إند
//     };
//     dispatch(registerUser(dataToSubmit));
//   };

//   return (
//     <div className="min-h-screen bg-[#fdfbf7] flex items-center justify-center px-4 py-12">
//       <div className="w-full max-w-md">

//         {/* Card */}
//         <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl border border-[#e6dfd5]">
//           <h1 className="text-3xl font-extrabold text-[#64031b] text-center mb-8">
//             Create Account
//           </h1>

//           <form onSubmit={handleSubmit} className="space-y-5">

//             {/* Name */}
//             <div>
//               <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">
//                 Name
//               </label>
//               <input
//                 type="text"
//                 placeholder="Enter your name"
//                 value={name}
//                 onChange={handleChange}
//                 name="name"
//                 className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#64031b] focus:border-transparent bg-gray-50 text-sm transition"
//                 required
//               />
//             </div>

//             {/* Email */}
//             <div>
//               <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 placeholder="Enter your Email"
//                 value={email}
//                 onChange={handleChange}
//                 name="email"
//                 className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#64031b] focus:border-transparent bg-gray-50 text-sm transition"
//                 required
//               />
//             </div>

//             {/* Phone Number (إجباري جديد) */}
//             <div>
//               <label htmlFor="phone" className="block text-sm font-bold text-gray-700 mb-2">
//                 Mobile / Vodafone Cash Number
//               </label>
//               <input
//                 type="tel"
//                 placeholder="e.g. 01012345678"
//                 value={phone}
//                 onChange={handleChange}
//                 name="phone"
//                 className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#64031b] focus:border-transparent bg-gray-50 text-sm transition"
//                 required
//               />
//             </div>

//             {/* Password */}
//             <div>
//               <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-2">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 placeholder="Enter Password"
//                 name="password"
//                 value={password}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#64031b] focus:border-transparent bg-gray-50 text-sm transition"
//                 required
//               />
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="w-full bg-[#64031b] hover:bg-[#4d0214] text-white font-bold py-3.5 px-4 rounded-lg shadow-md transition duration-200 mt-4 cursor-pointer disabled:opacity-50"
//             >
//               {isLoading ? "Registering..." : "Register"}
//             </button>
//           </form>

//           {/* Footer Link */}
//           <div className="text-center mt-6">
//             <p className="text-sm text-gray-600">
//               Already have an account?{" "}
//               <button
//                 type="button"
//                 onClick={() => navigate("/login")}
//                 className="text-[#64031b] font-bold hover:underline cursor-pointer"
//               >
//                 Login
//               </button>
//             </p>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;

import { useEffect, useState } from "react";
import { registerUser, reset } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isSuccess, isLoading } = useSelector((state) => state.auth);

  const [formData, setformData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const { name, email, password, confirmPassword, phone } = formData;

  // Password validation
  const passwordRules = {
    minLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecial: /[!@#$%^&*(),.?":{}|<>_\-\\[\]/`~+=;' ]/.test(password),
  };

  const isPasswordStrong = Object.values(passwordRules).every(Boolean);

  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
      dispatch(reset());
    }
  }, [isSuccess, user, dispatch, navigate]);

  const handleChange = (e) => {
    setformData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword || !phone) {
      alert("Please fill in all fields including your phone number.");
      return;
    }

    if (!isPasswordStrong) {
      alert("Please create a stronger password.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const dataToSubmit = {
      name,
      email,
      password,
      phone,
    };

    dispatch(registerUser(dataToSubmit));
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl border border-[#e6dfd5]">
          <h1 className="text-3xl font-extrabold text-[#64031b] text-center mb-8">
            Create Account
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-bold text-gray-700 mb-2"
              >
                Name
              </label>

              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={handleChange}
                name="name"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#64031b] focus:border-transparent bg-gray-50 text-sm transition"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-bold text-gray-700 mb-2"
              >
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your Email"
                value={email}
                onChange={handleChange}
                name="email"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#64031b] focus:border-transparent bg-gray-50 text-sm transition"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-bold text-gray-700 mb-2"
              >
                Mobile / Vodafone Cash Number
              </label>

              <input
                type="tel"
                placeholder="e.g. 01012345678"
                value={phone}
                onChange={handleChange}
                name="phone"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#64031b] focus:border-transparent bg-gray-50 text-sm transition"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-bold text-gray-700 mb-2"
              >
                Password
              </label>

              <input
                type="password"
                placeholder="Enter Password"
                name="password"
                value={password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#64031b] focus:border-transparent bg-gray-50 text-sm transition"
                required
              />

              {/* Password Status */}
              {password && (
                <div className="mt-3">
                  {!isPasswordStrong ? (
                    <div className="text-sm text-gray-500">
                      Checking password...
                    </div>
                  ) : (
                    <div className="text-sm font-semibold text-green-600">
                      ✓ Password is strong
                    </div>
                  )}

                  {/* Password Requirements */}
                  <div className="mt-2 space-y-1 text-xs">
                    <p
                      className={
                        passwordRules.minLength
                          ? "text-green-600"
                          : "text-gray-400"
                      }
                    >
                      {passwordRules.minLength ? "✓" : "○"} At least 8
                      characters
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
                      {passwordRules.hasSpecial ? "✓" : "○"} One special
                      character (!@#$...)
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-bold text-gray-700 mb-2"
              >
                Confirm Password
              </label>

              <input
                type="password"
                placeholder="Confirm your password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#64031b] focus:border-transparent bg-gray-50 text-sm transition"
                required
              />

              {confirmPassword && (
                <p
                  className={`mt-2 text-xs font-semibold ${
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
              disabled={isLoading || !isPasswordStrong}
              className="w-full bg-[#64031b] hover:bg-[#4d0214] text-white font-bold py-3.5 px-4 rounded-lg shadow-md transition duration-200 mt-4 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </form>

          {/* Footer Link */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-[#64031b] font-bold hover:underline cursor-pointer"
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
