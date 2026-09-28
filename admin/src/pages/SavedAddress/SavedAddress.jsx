

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserAddress, reset } from "../../features/auth/authSlice";
import { toast } from "react-toastify";

const SavedAddress = ({ onClose }) => {
  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  const [city, setCity] = useState(user?.address?.city || "");
  const [street, setStreet] = useState(user?.address?.street || "");
  const [phone, setPhone] = useState(user?.address?.phone || "");
  const [country, setCountry] = useState(user?.address?.country || "");

  useEffect(() => {
    if (isError) {
      toast.error(message || "Failed to update address ❌");
    }
    if (isSuccess) {
      toast.success("Address updated successfully ✅");
      if (onClose) onClose();
    }
    dispatch(reset());
  }, [isError, isSuccess, message, dispatch, onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const addressData = {
      city,
      street,
      phone,
      country,
    };
    dispatch(updateUserAddress(addressData));
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white p-5 sm:p-8 rounded-3xl max-h-[85vh] overflow-y-auto custom-scrollbar">
      <div className="mb-5 border-b border-gray-100 pb-3">
        <h2 className="text-xl sm:text-2xl font-black text-[#64031b] tracking-wide">
          Saved Address
        </h2>
        <p className="text-[11px] sm:text-xs text-gray-400 mt-1 uppercase tracking-wider font-semibold">
          Manage your shipping and delivery details
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
              City
            </label>
            <input
              type="text"
              placeholder="Enter city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50/50 border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#64031b] focus:bg-white transition text-sm"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
              Country
            </label>
            <input
              type="text"
              placeholder="Enter country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50/50 border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#64031b] focus:bg-white transition text-sm"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
            Street
          </label>
          <input
            type="text"
            placeholder="Enter street name"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50/50 border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#64031b] focus:bg-white transition text-sm"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
              Phone
            </label>
            <input
              type="text"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50/50 border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#64031b] focus:bg-white transition text-sm"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 mt-4 bg-[#64031b] text-white font-bold rounded-xl hover:bg-[#4d0214] active:scale-[0.99] transition shadow-lg cursor-pointer text-sm tracking-wide disabled:opacity-50"
        >
          {isLoading ? "Saving Address..." : "Save Address"}
        </button>
      </form>
    </div>
  );
};

export default SavedAddress;