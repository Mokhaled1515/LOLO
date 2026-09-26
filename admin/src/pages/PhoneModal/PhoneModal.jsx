import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";


const PhoneModal = () => {
  const { user } = useSelector((state) => state.auth);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  if (!user || user.phone) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phone.trim()) {
      alert("Please enter your phone number.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`/api/users/update-phone`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user._id, phone }),
      });

      if (res.ok) {
        alert("Phone number saved successfully!");
        window.location.reload(); 
      } else {
        const err = await res.json();
        alert(err.message || "Failed to save phone number.");
      }
    } catch (error) {
      console.log("Error updating phone:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl border border-[#e6dfd5] text-center">
        <div className="w-12 h-12 bg-[#64031b]/10 text-[#64031b] rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
          📱
        </div>
        
        <h3 className="text-2xl font-extrabold text-[#64031b] mb-2">Complete Your Profile</h3>
        <p className="text-sm text-gray-500 mb-6">
          Please enter your mobile number (or Vodafone Cash wallet) to continue using the platform and enable bookings.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Mobile Number</label>
            <input
              type="tel"
              placeholder="e.g. 01012345678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#64031b]"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#64031b] text-white py-3.5 rounded-lg font-bold text-base hover:bg-[#500216] transition shadow-md cursor-pointer disabled:opacity-70 mt-2"
          >
            {loading ? "Saving..." : "Save & Continue"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PhoneModal;