import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  amenityList: [],
  amenity: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// 1. جلب جميع وسائل الراحة (Public)
export const fetchAmenity = createAsyncThunk(
  "amenity/fetchAll",
  async (_, thunkApi) => {
    try {
      const res = await fetch("/api/amenities", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!res.ok) {
        return thunkApi.rejectWithValue(data);
      }
      return data.data; // بناءً على الـ Controller اللي بيرجع data.data
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

// 2. إضافة وسيلة راحة جديدة (Admin Only)
export const createAmenity = createAsyncThunk(
  "amenity/create",
  async (amenityData, thunkApi) => {
    try {
      const res = await fetch("/api/amenities", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        credentials: "include",
        body: JSON.stringify(amenityData),
      });
      const data = await res.json();
      if (!res.ok) {
        return thunkApi.rejectWithValue(data);
      }
      return data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

// 3. حذف وسيلة راحة (Admin Only)
export const deleteAmenity = createAsyncThunk(
  "amenity/delete",
  async (id, thunkApi) => {
    try {
      const res = await fetch(`/api/amenities/${id}`, {
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
  }
);

export const amenitySlice = createSlice({
  name: "amenity",
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
      // Fetch Amenities
      .addCase(fetchAmenity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAmenity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.amenityList = action.payload;
      })
      .addCase(fetchAmenity.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Create Amenity
      .addCase(createAmenity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAmenity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.amenityList.push(action.payload);
      })
      .addCase(createAmenity.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Delete Amenity
      .addCase(deleteAmenity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAmenity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.amenityList = state.amenityList.filter(
          (item) => item._id?.toString() !== action.payload.toString()
        );
      })
      .addCase(deleteAmenity.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = amenitySlice.actions;
export default amenitySlice.reducer;