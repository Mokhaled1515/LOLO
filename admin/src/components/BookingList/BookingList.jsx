import React from "react";
import { Link } from "react-router-dom";

const BookingList = ({ data }) => {
  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#e6dfd5] bg-[#fdfbf7]/80 text-[#64031b] text-xs font-black uppercase tracking-wider">
              <th className="py-4 px-4">Name</th>
              <th className="py-4 px-4">Email</th>
              <th className="py-4 px-4">Phone</th>
              <th className="py-4 px-4">Room</th>
              <th className="py-4 px-4">Price</th>
              <th className="py-4 px-4">Check-in</th>
              <th className="py-4 px-4">Check-out</th>
              <th className="py-4 px-4">Payment</th>
              <th className="py-4 px-4">Confirmed</th>
              <th className="py-4 px-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#e6dfd5]/60 text-sm text-gray-600 font-medium">
            {data.map((item) => (
              <tr key={item._id} className="hover:bg-[#fdfbf7]/60 transition">
                <td className="py-4 px-4 font-bold text-gray-800">{item.name}</td>

                <td className="py-4 px-4 text-gray-500">{item.email}</td>

                <td className="py-4 px-4">{item.phone}</td>

                <td className="py-4 px-4 font-bold text-[#64031b]">
                  {item.roomId?.name || item.roomName || "N/A"}
                </td>

                <td className="py-4 px-4 font-bold text-gray-800">
                  ${item.price || item.roomId?.price || 0}
                </td>

                <td className="py-4 px-4 whitespace-nowrap">
                  {item.checkInDate ? new Date(item.checkInDate).toLocaleDateString() : "N/A"}
                </td>

                <td className="py-4 px-4 whitespace-nowrap">
                  {item.checkOutDate ? new Date(item.checkOutDate).toLocaleDateString() : "N/A"}
                </td>

                <td className="py-4 px-4">
                  <span className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                    {item.paymentMethod === "vodafone"
                      ? "Vodafone Cash"
                      : item.paymentMethod === "card"
                      ? "Card"
                      : "Cash"}
                  </span>
                </td>

                <td className="py-4 px-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                      item.confirmed
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-rose-50 text-rose-700 border border-rose-200"
                    }`}
                  >
                    {item.confirmed ? "Yes" : "No"}
                  </span>
                </td>

                <td className="py-4 px-4 text-center">
                  <Link
                    to={`/booking/${item._id}`}
                    className="inline-block px-4 py-1.5 bg-[#64031b] text-white text-xs font-bold rounded-xl hover:bg-[#4d0214] transition shadow-sm"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingList;