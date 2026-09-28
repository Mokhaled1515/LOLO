import React from "react";
import { Link } from "react-router-dom";
import { FaUser, FaBed, FaCheckCircle, FaPercent } from "react-icons/fa";

const RoomList = ({ data }) => {
  const roomsList = Array.isArray(data) ? data : [];

  if (roomsList.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full max-w-full overflow-hidden">
      {roomsList.key ||
        roomsList.map((room) => {
          const roomImage =
            room.img && room.img.length > 0 ? room.img[0] : "/not-or.png";

          const hasDiscount =
            room.discountPercentage && room.discountPercentage > 0;
          const originalPrice = room.price || 0;
          const discountedPrice = hasDiscount
            ? originalPrice - (originalPrice * room.discountPercentage) / 100
            : originalPrice;

          return (
            <div
              key={room._id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#e6dfd5] flex flex-col justify-between group hover:shadow-md transition duration-300 w-full max-w-full"
            >
              <div className="relative h-44 sm:h-52 overflow-hidden bg-gray-100 w-full">
                <img
                  src={roomImage}
                  alt={room.name || "Room"}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />

                {hasDiscount && (
                  <div className="absolute top-2.5 left-2.5 bg-[#64031b] text-amber-400 text-[10px] sm:text-xs font-black px-2.5 py-1 rounded-xl shadow flex items-center gap-1 z-10">
                    <FaPercent className="text-[9px]" />
                    <span>{room.discountPercentage}% OFF</span>
                  </div>
                )}

                <div className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-md text-white text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-xl">
                  {room.type || "Luxury"}
                </div>
              </div>

              <div className="p-3.5 sm:p-5 flex flex-col flex-grow">
                <h3 className="font-bold text-sm sm:text-lg text-gray-900 mb-1.5 truncate group-hover:text-[#64031b] transition">
                  {room.name || "Standard Room"}
                </h3>

                <p className="text-gray-500 text-[11px] sm:text-xs mb-3 line-clamp-2 leading-relaxed">
                  {room.desc ||
                    "A spacious modern room equipped with premium amenities for your comfort."}
                </p>

                <div className="flex items-center gap-3 text-gray-400 text-[11px] mb-4 pb-3 border-b border-gray-100">
                  <span className="flex items-center gap-1">
                    <FaBed className="text-[#64031b]" />{" "}
                    {room.bedType || "King Bed"}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaUser className="text-[#64031b]" /> {room.maxGuests || 2}{" "}
                    Guests
                  </span>
                </div>

                <div className="flex items-center justify-between mt-auto pt-1 gap-2">
                  <div className="flex flex-col">
                    {hasDiscount ? (
                      <>
                        <span className="text-[10px] text-gray-400 line-through font-semibold">
                          ${originalPrice}
                        </span>
                        <span className="text-sm sm:text-base font-black text-[#64031b]">
                          ${discountedPrice.toFixed(0)}{" "}
                          <span className="text-[10px] text-gray-500 font-normal">
                            / Night
                          </span>
                        </span>
                      </>
                    ) : (
                      <span className="text-sm sm:text-base font-black text-[#64031b]">
                        ${originalPrice}{" "}
                        <span className="text-[10px] text-gray-500 font-normal">
                          / Night
                        </span>
                      </span>
                    )}
                  </div>

                  <Link
                    to={`/rooms/${room._id}`}
                    className="px-3.5 py-2 bg-[#64031b] text-white text-[11px] sm:text-xs font-bold rounded-xl hover:bg-[#4d0214] transition shadow cursor-pointer text-center whitespace-nowrap"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default RoomList;
