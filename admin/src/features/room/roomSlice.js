import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const API_URL = import.meta.env.VITE_API_URL;
const initialState = {
  rooms: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

//

//create room
export const createRoom = createAsyncThunk(
  "room/create",
  async (roomData, thunkApi) => {
    try {
      const res = await fetch(`${API_URL}/api/rooms`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        credentials: "include",
        body: JSON.stringify(roomData),
      });
      if (!res.ok) {
        const error = await res.json();
        return thunkApi.rejectWithValue(error);
      }

      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error.message);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

//get all rooms
export const getRooms = createAsyncThunk("room/getall", async (_, thunkApi) => {
  try {
    const res = await fetch(`${API_URL}/api/rooms`);
    if (!res.ok) {
      const error = await res.json();
      return thunkApi.rejectWithValue(error);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error.message);
    return thunkApi.rejectWithValue(error.message);
  }
});

//update room

export const updateRoom = createAsyncThunk(
  "/room/update",
  async (roomData, thunkApi) => {
    try {
      // const { roomId, ...reset } = roomData;
      const { roomId, ...roomRest } = roomData;
      const res = await fetch(`${API_URL}/api/rooms/${roomId}`,{
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        credentials: "include",
        body: JSON.stringify(roomRest),
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
  }
);

export const deleteRoom = createAsyncThunk(
  "room/delete",
  async (roomId, thunkApi) => {
    try {
      const res = await fetch(`${API_URL}/api/rooms/${roomId}`, {
        method: "DELETE",
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
  }
);
export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    //add casess
    builder
      .addCase(createRoom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createRoom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.rooms = action.payload;
      })
      .addCase(createRoom.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getRooms.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRooms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // state.rooms = action.payload;
        state.rooms = Array.isArray(action.payload) ? action.payload : action.payload.rooms || [];
      })
      .addCase(getRooms.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateRoom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateRoom.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.rooms = action.payload;
      })
      .addCase(updateRoom.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteRoom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteRoom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.rooms = state.rooms.filter(
          // (room) => room._id != action.payload.id
          (room) => room._id.toString() !== action.payload.id.toString()
        );
      })
      .addCase(deleteRoom.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = roomSlice.actions;
export default roomSlice.reducer;
