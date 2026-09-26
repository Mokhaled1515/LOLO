// import React from "react";
// import { Link } from "react-router-dom";
// import Carousel from "../Carousel/Carousel";

// const RoomList = ({ data }) => {
//   return (
//     <div id="room-list">
//       {data.map((item, index) => {
//         return (
//           <Link
//             to={`/rooms/all/${item._id}`}
//             key={item._id}
//             className="room-unit"
//           >
//             <div className="img-wrapper">
//               <Carousel
//                 data={
//                   item.img && item.img.length > 0 ? item.img : ["/not-or.png"]
//                 }
//               />
//             </div>
//             <p className="name">{item.name}</p>
//           </Link>
//         );
//       })}
//     </div>
//   );
// };

// export default RoomList;



// import React from "react";
// import { Link } from "react-router-dom";
// import Carousel from "../Carousel/Carousel";

// const RoomList = ({ data }) => {
//   return (
//     <div 
//       style={{
//         display: "grid",
//         gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
//         gap: "30px",
//         padding: "20px 0"
//       }}
//     >
//       {data.map((item) => {
//         return (
//           <Link
//             to={`/rooms/all/${item._id}`}
//             key={item._id}
//             style={{
//               backgroundColor: "#ffffff",
//               borderRadius: "16px",
//               overflow: "hidden",
//               boxShadow: "0 6px 25px rgba(0, 0, 0, 0.06)",
//               textDecoration: "none",
//               border: "1px solid #eae5de",
//               transition: "transform 0.3s ease, box-shadow 0.3s ease",
//               display: "flex",
//               flexDirection: "column",
//             }}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.transform = "translateY(-6px)";
//               e.currentTarget.style.boxShadow = "0 12px 30px rgba(100, 3, 27, 0.12)";
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.transform = "translateY(0)";
//               e.currentTarget.style.boxShadow = "0 6px 25px rgba(0, 0, 0, 0.06)";
//             }}
//           >
//             {/* إطار الصور بتنسيق ثابت ومتناسق */}
//             <div style={{ height: "220px", width: "100%", overflow: "hidden", position: "relative", backgroundColor: "#f3f4f6" }}>
//               <Carousel
//                 data={
//                   item.img && item.img.length > 0 ? item.img : ["/not-or.png"]
//                 }
//               />
//             </div>

//             {/* تفاصيل الغرفة */}
//             <div style={{ padding: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//               <div>
//                 <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#64031b", margin: "0 0 6px 0" }}>
//                   {item.name}
//                 </h3>
//                 <p style={{ fontSize: "13px", color: "#6b7280", margin: 0 }}>
//                   Luxury Room & Amenities
//                 </p>
//               </div>
              
//               {item.price && (
//                 <div style={{ textAlign: "right" }}>
//                   <span style={{ fontSize: "16px", fontWeight: "800", color: "#64031b" }}>
//                     ${item.price}
//                   </span>
//                   <span style={{ fontSize: "11px", color: "#9ca3af", display: "block" }}>
//                     per night
//                   </span>
//                 </div>
//               )}
//             </div>
//           </Link>
//         );
//       })}
//     </div>
//   );
// };

// export default RoomList;


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
      {roomsList.key || roomsList.map((room) => {
        const roomImage =
          room.img && room.img.length > 0 ? room.img[0] : "/not-or.png";
        
        const hasDiscount = room.discountPercentage && room.discountPercentage > 0;
        const originalPrice = room.price || 0;
        const discountedPrice = hasDiscount 
          ? originalPrice - (originalPrice * room.discountPercentage) / 100 
          : originalPrice;

        return (
          <div
            key={room._id}
            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#e6dfd5] flex flex-col justify-between group hover:shadow-md transition duration-300 w-full max-w-full"
          >
            {/* صورة الغرفة */}
            <div className="relative h-44 sm:h-52 overflow-hidden bg-gray-100 w-full">
              <img
                src={roomImage}
                alt={room.name || "Room"}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              
              {/* شارة الخصم لو موجودة */}
              {hasDiscount && (
                <div className="absolute top-2.5 left-2.5 bg-[#64031b] text-amber-400 text-[10px] sm:text-xs font-black px-2.5 py-1 rounded-xl shadow flex items-center gap-1 z-10">
                  <FaPercent className="text-[9px]" />
                  <span>{room.discountPercentage}% OFF</span>
                </div>
              )}

              {/* نوع الغرفة أو حالتها */}
              <div className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-md text-white text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-xl">
                {room.type || "Luxury"}
              </div>
            </div>

            {/* تفاصيل الغرفة */}
            <div className="p-3.5 sm:p-5 flex flex-col flex-grow">
              <h3 className="font-bold text-sm sm:text-lg text-gray-900 mb-1.5 truncate group-hover:text-[#64031b] transition">
                {room.name || "Standard Room"}
              </h3>
              
              <p className="text-gray-500 text-[11px] sm:text-xs mb-3 line-clamp-2 leading-relaxed">
                {room.desc || "A spacious modern room equipped with premium amenities for your comfort."}
              </p>

              {/* خصائص سريعة (أسرّة، أفراد) */}
              <div className="flex items-center gap-3 text-gray-400 text-[11px] mb-4 pb-3 border-b border-gray-100">
                <span className="flex items-center gap-1">
                  <FaBed className="text-[#64031b]" /> {room.bedType || "King Bed"}
                </span>
                <span className="flex items-center gap-1">
                  <FaUser className="text-[#64031b]" /> {room.maxGuests || 2} Guests
                </span>
              </div>

              {/* الأسعار وزر الحجز */}
              <div className="flex items-center justify-between mt-auto pt-1 gap-2">
                <div className="flex flex-col">
                  {hasDiscount ? (
                    <>
                      <span className="text-[10px] text-gray-400 line-through font-semibold">
                        ${originalPrice}
                      </span>
                      <span className="text-sm sm:text-base font-black text-[#64031b]">
                        ${discountedPrice.toFixed(0)} <span className="text-[10px] text-gray-500 font-normal">/ Night</span>
                      </span>
                    </>
                  ) : (
                    <span className="text-sm sm:text-base font-black text-[#64031b]">
                      ${originalPrice} <span className="text-[10px] text-gray-500 font-normal">/ Night</span>
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