// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// const user = JSON.parse(localStorage.getItem("user"));

// export const registerUser = createAsyncThunk(
//   "auth/register",
//   async (userData, thunkApi) => {
//     try {
//       const res = await fetch(`/api/users`, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//         method: "POST",
//         body: JSON.stringify(userData),
//       });
//       if (!res.ok) {
//         const error = await res.json();
//         return thunkApi.rejectWithValue(error);
//       }
//       const data = await res.json();
//       return data;
//     } catch (error) {
//       return thunkApi.rejectWithValue(error.message);
//     }
//   },
// );

// export const loginUser = createAsyncThunk(
//   "auth/login",
//   async (userData, thunkApi) => {
//     try {
//       const res = await fetch("/api/users/login", {
//         headers: {
//           "Content-Type": "application/json",
//         },
//         method: "POST",
//         credentials: "include",
//         body: JSON.stringify(userData),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         const message = data?.message?.toLowerCase() || "login failed";
//         let customMessage = "Login failed";

//         if (message.includes("not found")) {
//           customMessage = "user not register!";
//         } else if (
//           message.includes("invalid") ||
//           message.includes("password")
//         ) {
//           customMessage = "email and password are not same";
//         }

//         return thunkApi.rejectWithValue(customMessage);
//       }

//       localStorage.setItem("user", JSON.stringify(data));
//       return data;
//     } catch (error) {
//       return thunkApi.rejectWithValue("Something went wrong");
//     }
//   },
// );

// export const updateUserProfile = createAsyncThunk(
//   "auth/updateProfile",
//   async (userData, thunkApi) => {
//     try {
//       const res = await fetch("/api/users/profile", {
//         headers: {
//           "Content-Type": "application/json",
//         },
//         method: "PUT",
//         credentials: "include", // <--- تم إضافتها هنا لتضمين الكوكي وإرسال التوكن بنجاح
//         body: JSON.stringify(userData),
//       });

//       const data = await res.json();
//       if (!res.ok) {
//         return thunkApi.rejectWithValue(
//           data.message || "Failed to update Profile!",
//         );
//       }

//       const currentUser = JSON.parse(localStorage.getItem("user"));
//       const updatedUser = { ...currentUser, ...data };
//       localStorage.setItem("user", JSON.stringify(updatedUser));
//       return data;
//     } catch (error) {
//       return thunkApi.rejectWithValue(error.message);
//     }
//   },
// );

// export const updateUserAddress = createAsyncThunk(
//   "auth/updateAddress",
//   async (addressData, thunkApi) => {
//     try {
//       const res = await fetch("/api/users/address", {
//         headers: {
//           "Content-Type": "application/json",
//         },
//         method: "PUT",
//         credentials: "include", // <--- تم إضافتها هنا أيضاً
//         body: JSON.stringify(addressData),
//       });
//       const data = await res.json();
//       if (!res.ok) {
//         return thunkApi.rejectWithValue(
//           data.message || "Failed to update address",
//         );
//       }
//       const currentUser = JSON.parse(localStorage.getItem("user"));
//       const updateUser = { ...currentUser, address: data };
//       localStorage.setItem("user", JSON.stringify(updateUser));
//       return data;
//     } catch (error) {
//       return thunkApi.rejectWithValue(error.message);
//     }
//   },
// );

// export const logoutUser = createAsyncThunk(
//   "auth/logout",
//   async (_, thunkApi) => {
//     try {
//       const res = await fetch("/api/users/logout", {
//         credentials: "include",
//       });
//       if (!res.ok) {
//         const error = await res.json();
//         return thunkApi.rejectWithValue(error);
//       }
//       const data = await res.json();
//       localStorage.removeItem("user");
//       return data;
//     } catch (error) {
//       return thunkApi.rejectWithValue(error.message);
//     }
//   },
// );

// const initialState = {
//   user: user ? user : null,
//   isLoading: false,
//   isSuccess: false,
//   isError: false,
//   message: "",
// };

// export const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     reset: (state) => {
//       state.isLoading = false;
//       state.isSuccess = false;
//       state.isError = false;
//       state.message = "";
//     },
//   },
//   extraReducers: (builders) => {
//     builders
//       .addCase(registerUser.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(registerUser.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isSuccess = true;
//         state.user = action.payload;
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.message = action.payload || "Registration failed";
//         state.user = null;
//       })
//       .addCase(loginUser.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isSuccess = true;
//         state.user = action.payload;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.message = action.payload;
//       })
//       .addCase(updateUserProfile.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(updateUserProfile.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isSuccess = true;
//         state.user = { ...state.user, ...action.payload };
//       })
//       .addCase(updateUserProfile.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.message = action.payload;
//       })
//       .addCase(updateUserAddress.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(updateUserAddress.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isSuccess = true;
//         state.user.address = action.payload;
//       })
//       .addCase(updateUserAddress.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.message = action.payload;
//       })
//       .addCase(logoutUser.pending, (state) => {
//         state.isLoading = false;
//         state.isSuccess = true;
//         state.user = null;
//       })
//       .addCase(logoutUser.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.message = action.payload;
//       });
//   },
// });

// export const { reset } = authSlice.actions;
// export default authSlice.reducer;



import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const user = JSON.parse(localStorage.getItem("user"));

// ================= REGISTER =================

export const registerUser = createAsyncThunk(
  "auth/register",

  async (userData, thunkApi) => {
    try {
      const res = await fetch(`/api/users`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(userData),
      });

      if (!res.ok) {
        const error = await res.json();
        return thunkApi.rejectWithValue(error);
      }

      const data = await res.json();

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

// ================= LOGIN =================

export const loginUser = createAsyncThunk(
  "auth/login",

  async (userData, thunkApi) => {
    try {
      const res = await fetch("/api/users/login", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        credentials: "include",
        body: JSON.stringify(userData),
      });

      const data = await res.json();

      if (!res.ok) {
        const message = data?.message?.toLowerCase() || "login failed";

        let customMessage = "Login failed";

        if (message.includes("not found")) {
          customMessage = "user not register!";
        } else if (
          message.includes("invalid") ||
          message.includes("password")
        ) {
          customMessage = "email and password are not same";
        }

        return thunkApi.rejectWithValue(customMessage);
      }

      localStorage.setItem("user", JSON.stringify(data));

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue("Something went wrong");
    }
  },
);

// ================= FORGOT PASSWORD =================

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",

  async (email, thunkApi) => {
    try {
      const res = await fetch("/api/users/forgot-password", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        return thunkApi.rejectWithValue(
          data?.message || "Failed to send verification code",
        );
      }

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.message || "Something went wrong",
      );
    }
  },
);

// ================= VERIFY RESET CODE =================

export const verifyResetCode = createAsyncThunk(
  "auth/verifyResetCode",

  async ({ email, code }, thunkApi) => {
    try {
      const res = await fetch("/api/users/verify-reset-code", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          email,
          code,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        return thunkApi.rejectWithValue(
          data?.message || "Invalid or expired verification code",
        );
      }

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.message || "Something went wrong",
      );
    }
  },
);

// ================= RESET PASSWORD =================

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",

  async ({ email, code, newPassword }, thunkApi) => {
    try {
      const res = await fetch("/api/users/reset-password", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          email,
          code,
          newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        return thunkApi.rejectWithValue(
          data?.message || "Failed to reset password",
        );
      }

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.message || "Something went wrong",
      );
    }
  },
);

// ================= UPDATE PROFILE =================

export const updateUserProfile = createAsyncThunk(
  "auth/updateProfile",

  async (userData, thunkApi) => {
    try {
      const res = await fetch("/api/users/profile", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        credentials: "include",

        body: JSON.stringify(userData),
      });

      const data = await res.json();

      if (!res.ok) {
        return thunkApi.rejectWithValue(
          data.message || "Failed to update Profile!",
        );
      }

      const currentUser = JSON.parse(localStorage.getItem("user"));

      const updatedUser = {
        ...currentUser,
        ...data,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

// ================= UPDATE ADDRESS =================

export const updateUserAddress = createAsyncThunk(
  "auth/updateAddress",

  async (addressData, thunkApi) => {
    try {
      const res = await fetch("/api/users/address", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        credentials: "include",

        body: JSON.stringify(addressData),
      });

      const data = await res.json();

      if (!res.ok) {
        return thunkApi.rejectWithValue(
          data.message || "Failed to update address",
        );
      }

      const currentUser = JSON.parse(localStorage.getItem("user"));

      const updateUser = {
        ...currentUser,
        address: data,
      };

      localStorage.setItem("user", JSON.stringify(updateUser));

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

// ================= LOGOUT =================

export const logoutUser = createAsyncThunk(
  "auth/logout",

  async (_, thunkApi) => {
    try {
      const res = await fetch("/api/users/logout", {
        credentials: "include",
      });

      if (!res.ok) {
        const error = await res.json();

        return thunkApi.rejectWithValue(error);
      }

      const data = await res.json();

      localStorage.removeItem("user");

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

// ================= INITIAL STATE =================

const initialState = {
  user: user ? user : null,

  isLoading: false,
  isSuccess: false,
  isError: false,

  message: "",

  // Reset Password Flow
  resetEmail: "",
  resetCode: "",
};

// ================= AUTH SLICE =================

export const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },

    clearResetData: (state) => {
      state.resetEmail = "";
      state.resetCode = "";
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },

  extraReducers: (builders) => {
    builders

      // ================= REGISTER =================

      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Registration failed";
        state.user = null;
      })

      // ================= LOGIN =================

      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // ================= FORGOT PASSWORD =================

      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })

      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload?.message || "Verification code sent";

        // هنحتاج الـ email في الخطوة التالية
      })

      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message =
          action.payload || "Failed to send verification code";
      })

      // ================= VERIFY RESET CODE =================

      .addCase(verifyResetCode.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })

      .addCase(verifyResetCode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload?.message || "Code is valid";
      })

      .addCase(verifyResetCode.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message =
          action.payload || "Invalid or expired verification code";
      })

      // ================= RESET PASSWORD =================

      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })

      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message =
          action.payload?.message || "Password updated successfully";
      })

      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message =
          action.payload || "Failed to reset password";
      })

      // ================= UPDATE PROFILE =================

      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = {
          ...state.user,
          ...action.payload,
        };
      })

      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // ================= UPDATE ADDRESS =================

      .addCase(updateUserAddress.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(updateUserAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user.address = action.payload;
      })

      .addCase(updateUserAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // ================= LOGOUT =================

      .addCase(logoutUser.pending, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = null;
      })

      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, clearResetData } = authSlice.actions;

export default authSlice.reducer;

