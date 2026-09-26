import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  deleteBooking,
  confirmBooking,
  reset,
} from "../../features/booking/bookingSlice";
import { useDispatch, useSelector } from "react-redux";

const Booking = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSuccess, isLoading } = useSelector(
    (state) => state.booking
  );
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
      navigate("/dashboard");
    }
  }, [isSuccess, dispatch, navigate]);

  useEffect(() => {
    dispatch(reset());
    
    const getBooking = async () => {
      try {
        const res = await fetch(`/api/bookings/${id}`);
        const data = await res.json();
        setBooking(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getBooking();
  }, [id, dispatch]);

  const handleDelete = () => {
    dispatch(deleteBooking(id));
  };
  
  const handleConfirm = () => {
    dispatch(confirmBooking(id));
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-[#64031b] bg-[#64031b]/10 px-3 py-1 rounded-full">
            Reservation Details
          </span>
          <h1 className="text-3xl md:text-4xl font-black text-[#64031b] mt-3">
            Booking Information
          </h1>
        </div>

        {booking ? (
          <div className="bg-white rounded-3xl border border-[#e6dfd5] shadow-sm p-8 md:p-10 space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-[#e6dfd5]/60 pb-6 gap-4">
              <div>
                <h2 className="text-2xl font-black text-gray-800">
                  {booking.userId?.name || booking.name || "Guest"}
                </h2>
                <p className="text-sm text-gray-500 mt-0.5">
                  {booking.userId?.email || booking.email || "No Email Provided"}
                </p>
              </div>
              <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${
                booking.confirmed
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  : "bg-rose-50 text-rose-700 border border-rose-200"
              }`}>
                {booking.confirmed ? "Confirmed" : "Not Confirmed"}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#fdfbf7] p-6 rounded-2xl border border-[#e6dfd5]/60">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase">Reserved Room</p>
                <p className="text-base font-bold text-[#64031b] mt-1">
                  {booking.roomId?.name || "Standard Room"}
                </p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase">Total Price</p>
                <p className="text-base font-bold text-gray-800 mt-1">
                  ${booking.roomId?.price || booking.price || "0"}
                </p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase">Check-in Date</p>
                <p className="text-sm font-semibold text-gray-700 mt-1">
                  {booking.checkIn ? new Date(booking.checkIn).toLocaleDateString() : booking.checkInDate || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase">Check-out Date</p>
                <p className="text-sm font-semibold text-gray-700 mt-1">
                  {booking.checkOut ? new Date(booking.checkOut).toLocaleDateString() : booking.checkOutDate || "N/A"}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4 border-t border-[#e6dfd5]/60">
              {!booking.confirmed && (
                <button
                  onClick={handleConfirm}
                  disabled={isLoading}
                  className="px-6 py-3 bg-[#64031b] hover:bg-[#4d0214] text-white text-sm font-bold rounded-2xl transition shadow-md cursor-pointer"
                >
                  {isLoading ? "Processing..." : "Confirm Booking"}
                </button>
              )}
              <button
                onClick={handleDelete}
                disabled={isLoading}
                className="px-6 py-3 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-sm font-bold rounded-2xl transition cursor-pointer"
              >
                {isLoading ? "Deleting..." : "Delete Booking"}
              </button>
              <button
                onClick={() => navigate("/dashboard")}
                className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-bold rounded-2xl transition cursor-pointer ms-auto"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-3xl border border-[#e6dfd5]">
            <div className="w-12 h-12 border-4 border-[#e6dfd5] border-t-[#64031b] rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-[#64031b] font-bold tracking-widest uppercase text-sm">
              Loading Details...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Booking;