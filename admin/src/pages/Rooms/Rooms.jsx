

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { getRooms, reset } from "../../features/room/roomSlice";
import RoomList from "../../components/RoomList/RoomList";
import { FaFilter, FaTimes, FaPercent } from "react-icons/fa";

const Rooms = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { rooms, isLoading, isSuccess } = useSelector((state) => state.room);

  const typeFilter = searchParams.get("type") || "";
  const guestsFilter = searchParams.get("guests") || "";
  const datesFilter = searchParams.get("dates") || "";

  useEffect(() => {
    dispatch(getRooms());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
    }
  }, [isSuccess, dispatch]);

  const roomsList = Array.isArray(rooms) ? rooms : rooms?.rooms || [];

  const filteredRooms = roomsList.filter((room) => {
    if (typeFilter) {
      const roomNameLower = room.name ? room.name.toLowerCase() : "";
      if (!roomNameLower.includes(typeFilter.toLowerCase())) {
        return false;
      }
    }
    return true;
  });

  const discountRooms = filteredRooms.filter(
    (room) => room.discountPercentage && room.discountPercentage > 0,
  );
  const regularRooms = filteredRooms.filter(
    (room) => !room.discountPercentage || room.discountPercentage <= 0,
  );

  const clearFilters = () => {
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7] py-6 px-2 sm:px-6 lg:px-8 relative overflow-x-hidden">
      <div className="absolute top-0 left-0 w-48 h-48 bg-[#64031b]/5 rounded-full blur-2xl pointer-events-none -ml-10 -mt-10"></div>
      
      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="text-center mb-6 px-1">
          <h1 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-[#64031b] tracking-wide mb-1.5 leading-snug">
            Our Rooms & Suites
          </h1>
          <p className="text-gray-500 text-[11px] sm:text-sm max-w-xl mx-auto leading-relaxed px-1">
            Discover our beautifully appointed rooms, carefully curated for your ultimate comfort.
          </p>
          <div className="w-12 h-1 bg-[#64031b]/80 mx-auto mt-3 rounded-full"></div>
        </div>

        {(typeFilter || guestsFilter || datesFilter) && (
          <div className="mb-5 bg-white border border-[#e6dfd5] p-2.5 rounded-xl shadow-sm flex flex-col gap-2.5">
            <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-gray-700">
              <span className="flex items-center gap-1 text-[#64031b] font-bold">
                <FaFilter /> Filters:
              </span>
              {typeFilter && (
                <span className="bg-gray-100 px-2 py-0.5 rounded text-[10px] font-semibold break-all">
                  Type: {typeFilter}
                </span>
              )}
              {guestsFilter && (
                <span className="bg-gray-100 px-2 py-0.5 rounded text-[10px] font-semibold">
                  Guests: {guestsFilter}
                </span>
              )}
              {datesFilter && (
                <span className="bg-gray-100 px-2 py-0.5 rounded text-[10px] font-semibold">
                  Dates: {datesFilter}
                </span>
              )}
            </div>
            <button
              onClick={clearFilters}
              className="flex items-center justify-center gap-1 text-[11px] font-bold text-red-600 bg-red-50 hover:bg-red-100 py-1.5 rounded-lg transition w-full"
            >
              <FaTimes /> Clear Filters
            </button>
          </div>
        )}

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-8 h-8 border-3 border-[#e6dfd5] border-t-[#64031b] rounded-full animate-spin"></div>
            <p className="text-[#64031b] font-bold tracking-widest text-[10px] uppercase mt-3">
              Loading...
            </p>
          </div>
        ) : filteredRooms.length > 0 ? (
          <div className="space-y-8">
            {discountRooms.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3 border-b border-[#e6dfd5] pb-2">
                  <div className="bg-[#64031b] text-white p-2 rounded-lg shadow-sm">
                    <FaPercent className="text-xs" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-xl font-black text-[#64031b]">
                      Discounts Offers Rooms
                    </h2>
                    <p className="text-[10px] sm:text-xs text-gray-500">
                      Explore special discounted rooms.
                    </p>
                  </div>
                </div>
                <RoomList data={discountRooms} />
              </div>
            )}

            {regularRooms.length > 0 && (
              <div>
                {discountRooms.length > 0 && (
                  <div className="flex items-center gap-2 mb-3 border-b border-[#e6dfd5] pb-2">
                    <div>
                      <h2 className="text-base sm:text-xl font-black text-[#64031b]">
                        Standard Rooms & Suites
                      </h2>
                      <p className="text-[10px] sm:text-xs text-gray-500">
                        Browse regular luxury rooms.
                      </p>
                    </div>
                  </div>
                )}
                <RoomList data={regularRooms} />
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-10 px-3 bg-white border border-[#e6dfd5] rounded-xl shadow-sm max-w-sm mx-auto">
            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3 text-gray-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m3-4h1m-1 4h1m-5 8h8" />
              </svg>
            </div>
            <h3 className="text-base font-extrabold text-[#64031b] mb-1">
              No Matching Rooms
            </h3>
            <p className="text-gray-500 text-[11px] sm:text-xs mb-4 leading-relaxed">
              We couldn't find any rooms matching your criteria.
            </p>
            {(typeFilter || guestsFilter || datesFilter) && (
              <button
                onClick={clearFilters}
                className="w-full py-2 bg-[#64031b] text-white font-bold text-xs rounded-lg hover:bg-[#4d0214] transition shadow"
              >
                View All Rooms
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Rooms;