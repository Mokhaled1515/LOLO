import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { getBookings, reset } from "../../features/booking/bookingSlice";
import { createDining } from "../../features/diningSlice/diningSlice";
import { createOffer, updateOffer } from "../../features/offerSlice/offerSlice";
import { createAmenity } from "../../features/AmenitySlice/amenitySlice";
import BookingList from "../../components/BookingList/BookingList";
import { toast } from "react-toastify";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { bookings, isLoading, isSuccess } = useSelector(
    (state) => state.booking,
  );
  const [activeForm, setActiveForm] = useState(null);
  const [diningData, setDiningData] = useState({
    name: "",
    description: "",
    cuisineType: "",
    openingHours: "",
    location: "",
    image: null,
  });

  const [offerData, setOfferData] = useState({
    title: "",
    description: "",
    discountPercentage: "",
    image: "",
    validUntil: "",
    imagePreview: "",
  });
  const [amenityData, setAmenityData] = useState({
    title: "",
    description: "",
    icon: "",
  });

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate("/login");
    } else {
      dispatch(getBookings());
    }
  }, [user, navigate, dispatch]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
    }
  }, [isSuccess, dispatch]);

  const handleDiningSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(createDining(diningData));

    if (createDining.fulfilled.match(result)) {
      toast.success("Dining item created successfully!");
      setDiningData({
        name: "",
        description: "",
        cuisineType: "",
        openingHours: "",
        location: "",
        image: null,
      });
      setActiveForm(null);
    } else {
      toast.error(result.payload?.message || "Failed to create dining item");
    }
  };


  const handleOfferSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", offerData.title);
    formData.append("description", offerData.description);
    formData.append("discountPercentage", offerData.discountPercentage);
    formData.append("validUntil", offerData.validUntil);

    if (offerData.image) {
      formData.append("image", offerData.image);
    }

    const result = await dispatch(createOffer(formData));

    if (createOffer.fulfilled.match(result)) {
      toast.success("Offer created successfully!");

      setOfferData({
        title: "",
        description: "",
        discountPercentage: "",
        image: "",
        validUntil: "",
        imagePreview: "",
      });

      setActiveForm(null);
    } else {
      toast.error(result.payload?.message || "Failed to create offer");
    }
  };
  const handleAmenitySubmit = (e) => {
    e.preventDefault();
    dispatch(createAmenity(amenityData));
    toast.success("Amenity created successfully!");
    setAmenityData({ title: "", description: "", icon: "" });
    setActiveForm(null);
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-8 rounded-3xl border border-[#e6dfd5] shadow-sm gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#64031b] bg-[#64031b]/10 px-3 py-1 rounded-full">
              Admin Control Panel
            </span>
            <h1 className="text-3xl md:text-4xl font-black text-[#64031b] mt-2 tracking-wide">
              Welcome Back, {user?.name || "Admin"}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage rooms, bookings, dining options, offers, and amenities from
              here.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              to="/admin/add-room"
              className="px-4 py-2.5 bg-[#64031b] text-white text-xs font-bold rounded-xl hover:bg-[#4d0214] transition shadow flex items-center gap-1.5"
            >
              + Add Room
            </Link>
          
            <button
              onClick={() =>
                setActiveForm(activeForm === "offer" ? null : "offer")
              }
              className="px-4 py-2.5 bg-emerald-700 text-white cursor-pointer text-xs font-bold rounded-xl hover:bg-emerald-800 transition shadow"
            >
              {activeForm === "offer" ? "Close" : "+ Add Offer"}
            </button>
            
          </div>
        </div>

        {activeForm === "dining" && (
          <div className="bg-white p-8 rounded-[2rem] border border-[#e6dfd5] shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#e6dfd5]/60">
              <div>
                <h3 className="text-2xl font-black text-[#64031b]">
                  Add New Dining Item
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Add restaurant details and upload a cover image
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveForm(null)}
                className="text-gray-400 hover:text-gray-600 font-bold text-sm"
              >
                ✕ Close
              </button>
            </div>

            <form onSubmit={handleDiningSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                    Restaurant Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. The Royal Restaurant"
                    required
                    className="p-3.5 bg-[#fdfbf7] border border-[#e6dfd5] rounded-2xl w-full focus:outline-none focus:border-[#64031b] transition"
                    value={diningData.name}
                    onChange={(e) =>
                      setDiningData({ ...diningData, name: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                    Cuisine Type
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Italian, Egyptian, International"
                    required
                    className="p-3.5 bg-[#fdfbf7] border border-[#e6dfd5] rounded-2xl w-full focus:outline-none focus:border-[#64031b] transition"
                    value={diningData.cuisineType}
                    onChange={(e) =>
                      setDiningData({
                        ...diningData,
                        cuisineType: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                  Description
                </label>
                <textarea
                  rows="3"
                  placeholder="Describe the restaurant, its food, atmosphere, or specialties..."
                  required
                  className="p-3.5 bg-[#fdfbf7] border border-[#e6dfd5] rounded-2xl w-full focus:outline-none focus:border-[#64031b] transition"
                  value={diningData.description}
                  onChange={(e) =>
                    setDiningData({
                      ...diningData,
                      description: e.target.value,
                    })
                  }
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                    Opening Hours
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 10:00 AM - 11:00 PM"
                    required
                    className="p-3.5 bg-[#fdfbf7] border border-[#e6dfd5] rounded-2xl w-full focus:outline-none focus:border-[#64031b] transition"
                    value={diningData.openingHours}
                    onChange={(e) =>
                      setDiningData({
                        ...diningData,
                        openingHours: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Ground Floor"
                    className="p-3.5 bg-[#fdfbf7] border border-[#e6dfd5] rounded-2xl w-full focus:outline-none focus:border-[#64031b] transition"
                    value={diningData.location}
                    onChange={(e) =>
                      setDiningData({
                        ...diningData,
                        location: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                  Restaurant Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  required
                  className="p-2.5 bg-[#fdfbf7] border border-[#e6dfd5] rounded-2xl w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#64031b] file:text-white hover:file:bg-[#4d0214] transition cursor-pointer"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setDiningData({ ...diningData, image: file });
                      toast.info(`Selected: ${file.name}`);
                    }
                  }}
                />
                {diningData.image && (
                  <div className="mt-3 flex items-center gap-3">
                    <img
                      src={URL.createObjectURL(diningData.image)}
                      alt="Restaurant preview"
                      className="w-24 h-20 object-cover rounded-xl border border-[#e6dfd5]"
                    />
                    <div>
                      <p className="text-xs font-bold text-[#64031b]">
                        {diningData.image.name}
                      </p>
                      <p className="text-[10px] text-gray-400 mt-1">
                        One image will be uploaded to Cloudinary.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={!diningData.image}
                className="w-full py-4 bg-[#64031b] text-white font-bold text-sm tracking-wider uppercase rounded-2xl hover:bg-[#4d0214] transition shadow-lg shadow-[#64031b]/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save Dining Item
              </button>
            </form>
          </div>
        )}

        {activeForm === "offer" && (
          <div className="bg-white p-8 rounded-[2rem] border border-[#e6dfd5] shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#e6dfd5]/60">
              <div>
                <h3 className="text-2xl font-black text-[#64031b]">
                  Add New Special Offer
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Create an attractive discount package for guests
                </p>
              </div>
              <button
                onClick={() => setActiveForm(null)}
                className="text-gray-400 hover:text-gray-600 font-bold text-sm"
              >
                ✕ Close
              </button>
            </div>

          
            <form onSubmit={handleOfferSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                    Offer Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Summer Getaway"
                    required
                    className="p-3.5 bg-[#fdfbf7] border border-[#e6dfd5] rounded-2xl w-full focus:outline-none focus:border-[#64031b] transition"
                    value={offerData.title}
                    onChange={(e) =>
                      setOfferData({ ...offerData, title: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                    Discount Percentage (%)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 25"
                    required
                    className="p-3.5 bg-[#fdfbf7] border border-[#e6dfd5] rounded-2xl w-full focus:outline-none focus:border-[#64031b] transition"
                    value={offerData.discountPercentage}
                    onChange={(e) =>
                      setOfferData({
                        ...offerData,
                        discountPercentage: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                  Valid Until Date
                </label>
                <input
                  type="date"
                  required
                  className="p-3.5 bg-[#fdfbf7] border border-[#e6dfd5] rounded-2xl w-full focus:outline-none focus:border-[#64031b] transition"
                  value={offerData.validUntil}
                  onChange={(e) =>
                    setOfferData({ ...offerData, validUntil: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                  Description
                </label>
                <textarea
                  rows="3"
                  placeholder="Explain what is included in this offer..."
                  required
                  className="p-3.5 bg-[#fdfbf7] border border-[#e6dfd5] rounded-2xl w-full focus:outline-none focus:border-[#64031b] transition"
                  value={offerData.description}
                  onChange={(e) =>
                    setOfferData({ ...offerData, description: e.target.value })
                  }
                />
              </div>


              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                  Offer Banner Image
                </label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-[#e6dfd5] border-dashed rounded-2xl cursor-pointer bg-[#fdfbf7] hover:bg-[#f5efe6] transition relative overflow-hidden">
                    {offerData.imagePreview ? (
                      <img
                        src={offerData.imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover absolute inset-0"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4">
                        <svg
                          className="w-8 h-8 mb-2 text-[#64031b]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <p className="text-xs text-gray-500 font-medium">
                          <span className="font-bold text-[#64031b]">
                            Click to upload
                          </span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-[10px] text-gray-400 mt-1">
                          PNG, JPG, WEBP (MAX. 5MB)
                        </p>
                      </div>
                    )}

                    <input
                      type="file"
                      accept="image/*"
                      required
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const previewUrl = URL.createObjectURL(file);
                          setOfferData({
                            ...offerData,
                            image: file,
                            imagePreview: previewUrl,
                          });
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#64031b] text-white font-bold text-sm tracking-wider uppercase rounded-2xl hover:bg-[#4d0214] transition shadow-lg shadow-[#64031b]/20"
              >
                Save Special Offer
              </button>
            </form>
          </div>
        )}

        {activeForm === "amenity" && (
          <div className="bg-white p-8 rounded-[2rem] border border-[#e6dfd5] shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#e6dfd5]/60">
              <div>
                <h3 className="text-2xl font-black text-[#64031b]">
                  Add New Amenity
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Highlight hotel facilities and luxury amenities
                </p>
              </div>
              <button
                onClick={() => setActiveForm(null)}
                className="text-gray-400 hover:text-gray-600 font-bold text-sm"
              >
                ✕ Close
              </button>
            </div>

            <form onSubmit={handleAmenitySubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                    Amenity Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Swimming Pool & Spa"
                    required
                    className="p-3.5 bg-[#fdfbf7] border border-[#e6dfd5] rounded-2xl w-full focus:outline-none focus:border-[#64031b] transition"
                    value={amenityData.title}
                    onChange={(e) =>
                      setAmenityData({ ...amenityData, title: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                    Icon / Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="p-2.5 bg-[#fdfbf7] border border-[#e6dfd5] rounded-2xl w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#64031b] file:text-white hover:file:bg-[#4d0214] transition cursor-pointer"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setAmenityData({ ...amenityData, icon: file });
                        toast.info(`Selected: ${file.name}`);
                      }
                    }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                  Description
                </label>
                <textarea
                  rows="3"
                  placeholder="Brief details about this amenity..."
                  required
                  className="p-3.5 bg-[#fdfbf7] border border-[#e6dfd5] rounded-2xl w-full focus:outline-none focus:border-[#64031b] transition"
                  value={amenityData.description}
                  onChange={(e) =>
                    setAmenityData({
                      ...amenityData,
                      description: e.target.value,
                    })
                  }
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#64031b] text-white font-bold text-sm tracking-wider uppercase rounded-2xl hover:bg-[#4d0214] transition shadow-lg shadow-[#64031b]/20"
              >
                Save Amenity
              </button>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-[#e6dfd5] shadow-sm flex items-center space-x-4">
            <div className="w-14 h-14 bg-[#64031b]/10 rounded-2xl flex items-center justify-center text-[#64031b]">
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Total Bookings
              </p>
              <h3 className="text-3xl font-black text-[#64031b] mt-1">
                {bookings ? bookings.length : 0}
              </h3>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#e6dfd5] shadow-sm flex items-center space-x-4">
            <div className="w-14 h-14 bg-[#64031b]/10 rounded-2xl flex items-center justify-center text-[#64031b]">
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m3-4h1m-1 4h1m-5 8h8"
                />
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                System Status
              </p>
              <h3 className="text-xl font-bold text-emerald-600 mt-1">
                Active & Online
              </h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-[#e6dfd5] shadow-sm overflow-hidden">
          <div className="p-8 border-b border-[#e6dfd5]/60 flex justify-between items-center bg-[#fdfbf7]/50">
            <div>
              <h2 className="text-2xl font-black text-[#64031b] tracking-wide">
                Reservations & Guest Details
              </h2>
              <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider font-semibold">
                Complete list of who booked which room, dates, and client
                information
              </p>
            </div>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-24 space-y-4">
              <div className="w-12 h-12 border-4 border-[#e6dfd5] border-t-[#64031b] rounded-full animate-spin"></div>
              <p className="text-[#64031b] font-bold tracking-widest uppercase text-sm animate-pulse">
                Loading Bookings...
              </p>
            </div>
          ) : bookings && bookings.length > 0 ? (
            <div className="overflow-x-auto p-2">
              <BookingList data={bookings} />
            </div>
          ) : (
            <div className="text-center py-20 px-6">
              <h3 className="text-lg font-bold text-[#64031b]">
                No Bookings Found
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                There are no room reservations recorded in the system yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
