
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserBookings } from "../../features/booking/bookingSlice";

const BookingRecords = ({ onClose }) => {
  const dispatch = useDispatch();
  const { bookings, isLoading } = useSelector((state) => state.booking);

  useEffect(() => {
    dispatch(getUserBookings());
  }, [dispatch]);

  const safeBookings = Array.isArray(bookings) ? bookings : [];

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col h-full max-h-[85vh] px-1 sm:px-2">
      
      
      <div className="w-full flex items-center justify-between border-b border-gray-200 pb-3 mb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-[#64031b]">
            My Booking Records
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            View and track all your room reservations
          </p>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition flex items-center justify-center w-8 h-8 cursor-pointer shadow-sm"
            aria-label="Close"
          >
            ✕
          </button>
        )}
      </div>

      {isLoading ? (
        <div className="flex flex-col justify-center items-center py-12 gap-2">
          <div className="w-8 h-8 border-4 border-[#64031b] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 text-sm font-medium">Loading your bookings...</p>
        </div>
      ) : safeBookings.length === 0 ? (
        <div className="text-center py-10 px-4">
          <div className="text-5xl mb-3">🏨</div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1">
            You haven't made any bookings yet.
          </h3>
          <p className="text-gray-500 text-sm mb-6">
            Explore our rooms and book your stay!
          </p>
          <Link
            to="/rooms"
            onClick={onClose}
            className="inline-flex items-center justify-center bg-[#64031b] text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-[#800423] transition shadow-md text-sm sm:text-base"
          >
            Book Now!
          </Link>
        </div>
      ) : (
        <div className="space-y-3.5 overflow-y-auto pr-1 flex-1 max-h-[60vh] custom-scrollbar">
          {safeBookings.map((item) => (
            <div
              key={item._id}
              className="border border-gray-200 rounded-2xl p-4 bg-white shadow-sm hover:shadow-md transition flex flex-col gap-3.5 relative overflow-hidden group"
            >
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#64031b]"></div>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pl-2">
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-gray-800">
                    {item.roomId?.name || item.roomName || "Hotel Room"}
                  </h3>
                  <p className="text-[#64031b] text-sm font-bold mt-0.5">
                    ${item.price || item.roomId?.price || 0}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold self-start sm:self-auto shadow-xs ${
                    item.confirmed
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-amber-50 text-amber-700 border border-amber-200"
                  }`}
                >
                  {item.confirmed ? "Confirmed" : "Pending Confirmation"}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-gray-100 text-xs sm:text-sm pl-2 bg-gray-50/60 p-2.5 rounded-xl">
                <div>
                  <p className="text-gray-400 text-[11px] font-medium uppercase tracking-wider">Check In</p>
                  <p className="font-semibold text-gray-700 mt-0.5">
                    {item.checkInDate
                      ? new Date(item.checkInDate).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-gray-400 text-[11px] font-medium uppercase tracking-wider">Check Out</p>
                  <p className="font-semibold text-gray-700 mt-0.5">
                    {item.checkOutDate
                      ? new Date(item.checkOutDate).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-gray-400 text-[11px] font-medium uppercase tracking-wider">Payment</p>
                  <p className="font-semibold text-gray-700 mt-0.5 capitalize">
                    {item.paymentMethod || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="pt-3 mt-2 border-t border-gray-100">
        <button
          onClick={onClose}
          className="w-full bg-[#79001f] hover:bg-[#5a0218] text-gray-100 py-2.5 rounded-xl transition text-sm sm:text-base font-semibold cursor-pointer shadow-xs"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default BookingRecords;