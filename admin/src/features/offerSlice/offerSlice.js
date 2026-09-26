import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  offerList: [],
  offer: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const fetchOffer = createAsyncThunk(
  "offer/fetchAll",
  async (_, thunkApi) => {
    try {
      const res = await fetch("/api/offers", {
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

export const fetchOfferById = createAsyncThunk(
  "offer/fetchById",
  async (id, thunkApi) => {
    try {
      const res = await fetch(`/api/offers/${id}`, {
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

export const createOffer = createAsyncThunk(
  "offer/create",
  async (offerData, thunkApi) => {
    try {
      let bodyData = offerData;
      const headers = {};
      //   const headers = {
      //     credentials: "include",
      //   };

      if (!(offerData instanceof FormData)) {
        headers["Content-Type"] = "application/json";
        bodyData = JSON.stringify(offerData);
      }

      const res = await fetch("/api/offers", {
        method: "POST",
        credentials: "include",
        headers: headers,
        body: bodyData,
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
export const updateOffer = createAsyncThunk(
  "offer/update",
  async ({ id, offerData }, thunkApi) => {
    try {
      const bodyData = offerData;
      const headers = {};

      if (!(offerData instanceof FormData)) {
        headers["Content-Type"] = "application/json";
      }

      const res = await fetch(`/api/offers/${id}`, {
        method: "PUT",
        credentials: "include",
        headers,
        body: bodyData,
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
export const deleteOffer = createAsyncThunk(
  "offer/delete",
  async (id, thunkApi) => {
    try {
      const res = await fetch(`/api/offers/${id}`, {
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

export const offerSlice = createSlice({
  name: "offer",
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
      .addCase(fetchOffer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOffer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.offerList = action.payload;
      })
      .addCase(fetchOffer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(fetchOfferById.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchOfferById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.offer = action.payload;
      })
      .addCase(fetchOfferById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createOffer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOffer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.offerList.push(action.payload);
      })
      .addCase(createOffer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteOffer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteOffer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.offerList = state.offerList.filter(
          (item) => item._id?.toString() !== action.payload.toString(),
        );
      })
      .addCase(deleteOffer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = offerSlice.actions;
export default offerSlice.reducer;
