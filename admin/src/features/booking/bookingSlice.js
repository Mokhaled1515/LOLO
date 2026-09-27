import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const API_URL = import.meta.env.VITE_API_URL;
const initialState = {
  bookings: [],
  booking: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const createBooking = createAsyncThunk(
  "booking/create",
  async (bookingData, thunkApi) => {
    try {
      const res = await fetch(`${API_URL}/api/bookings`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        credentials: "include",
        body: JSON.stringify(bookingData),
      });
      const data = await res.json();
      if (!res.ok) {
        return thunkApi.rejectWithValue(data);
      }
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const getBookings = createAsyncThunk(
  "booking/getbookings",
  async (_, thunkApi) => {
    try {
      const res = await fetch(`${API_URL}/api/bookings`, {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // دي مهمة جداً عشان الـ Cookie الخاصة بالأدمن تروح مع الطلب
      });
      const data = await res.json();

      if (!res.ok) {
        return thunkApi.rejectWithValue(data);
      }
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const deleteBooking = createAsyncThunk(
  "booking/delete",
  async (id, thunkApi) => {
    try {
      const res = await fetch(`${API_URL}/api/bookings/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        return thunkApi.rejectWithValue(data);
      }

      return data;
    } catch (error) {
      console.log(error.message);
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const confirmBooking = createAsyncThunk(
  "booking/confirm",
  async (bookingId, thunkApi) => {
    try {
      const res = await fetch(`${API_URL}/api/bookings/${bookingId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        credentials: "include",
        body: JSON.stringify({ confirmed: true }),
      });
      const data = await res.json();
      if (!res.ok) {
        return thunkApi.rejectWithValue(data);
      }
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);
export const getUserBookings = createAsyncThunk(
  "booking/getuserbookings",
  async (_, thunkApi) => {
    try {
      const res = await fetch(`${API_URL}/api/bookings/my-bookings`, {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        return thunkApi.rejectWithValue(data);
      }
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBooking.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.booking = action.payload;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getBookings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBookings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.bookings = action.payload;
      })
      .addCase(getBookings.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteBooking.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.bookings = state.bookings.filter(
          (booking) =>
            booking._id?.toString() !== action.payload.id?.toString(),
        );
      })
      .addCase(deleteBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(confirmBooking.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(confirmBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.bookings = action.payload;
      })
      .addCase(confirmBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getUserBookings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserBookings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.bookings = action.payload;
      })
      .addCase(getUserBookings.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});
export const { reset } = bookingSlice.actions;

export default bookingSlice.reducer;
