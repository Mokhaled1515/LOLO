import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  diningList: [],
  dining: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// 1. جلب جميع المطاعم (Public)
export const fetchDining = createAsyncThunk(
  "dining/fetchAll",
  async (_, thunkApi) => {
    try {
      const res = await fetch("/api/dining", {
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
  },
);

export const createDining = createAsyncThunk(
  "dining/create",
  async (diningData, thunkApi) => {
    try {
      // 1. تحويل البيانات إلى FormData عشان تقبل الملفات والصور
      const formData = new FormData();
      formData.append("name", diningData.name);
      formData.append("description", diningData.description);
      formData.append("cuisineType", diningData.cuisineType);
      formData.append("openingHours", diningData.openingHours);
      formData.append("location", diningData.location || "");

      // إرفاق ملف الصورة اللي جاي من الـ Input (type="file")
      if (diningData.image) {
        formData.append("image", diningData.image);
      }

      const res = await fetch("/api/dining", {
        method: "POST",
        credentials: "include", // عشان الكوكي والأدمن
        body: formData, // إرسال الـ FormData مباشرة بدون Content-Type
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
      const res = await fetch(`/api/dining/${id}`, {
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
      return id; // بنرجع الـ id عشان نحذفه من الـ state مباشرة
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
      // Fetch Dining
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
      // Delete Dining
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
