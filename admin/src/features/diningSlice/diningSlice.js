import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const API_URL = import.meta.env.VITE_API_URL;
const initialState = {
  diningList: [],
  dining: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const fetchDining = createAsyncThunk(
  "dining/fetchAll",
  async (_, thunkApi) => {
    try {
      const res = await fetch(`${API_URL}/api/dining`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!res.ok) {
        return thunkApi.rejectWithValue(data);
      }
      return data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const createDining = createAsyncThunk(
  "dining/create",
  async (diningData, thunkApi) => {
    try {
      const formData = new FormData();
      formData.append("name", diningData.name);
      formData.append("description", diningData.description);
      formData.append("cuisineType", diningData.cuisineType);
      formData.append("openingHours", diningData.openingHours);
      formData.append("location", diningData.location || "");

      if (diningData.image) {
        formData.append("image", diningData.image);
      }

      const res = await fetch(`${API_URL}/api/dining`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        return thunkApi.rejectWithValue(data);
      }
      return data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const deleteDining = createAsyncThunk(
  "dining/delete",
  async (id, thunkApi) => {
    try {
      const res = await fetch(`${API_URL}/api/dining/${id}`, {
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
      return id;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const diningSlice = createSlice({
  name: "dining",
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
      .addCase(fetchDining.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDining.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.diningList = action.payload;
      })
      .addCase(fetchDining.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Create Dining
      .addCase(createDining.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createDining.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.diningList.push(action.payload);
      })
      .addCase(createDining.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteDining.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteDining.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.diningList = state.diningList.filter(
          (item) => item._id?.toString() !== action.payload.toString(),
        );
      })
      .addCase(deleteDining.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = diningSlice.actions;
export default diningSlice.reducer;
