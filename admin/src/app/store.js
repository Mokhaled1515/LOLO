import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import roomReducer from "../features/room/roomSlice";
import bookingReducer from "../features/booking/bookingSlice";
import diningReducer from "../features/diningSlice/diningSlice";
import offerReducer from "../features/offerSlice/offerSlice";
import amenityReducer from "../features/AmenitySlice/amenitySlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    room: roomReducer,
    booking: bookingReducer,
    dining: diningReducer,
    offer: offerReducer,
    amenity: amenityReducer,
  },
});