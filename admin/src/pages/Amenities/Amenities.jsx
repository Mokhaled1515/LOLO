import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAmenity, deleteAmenity, reset } from "../../features/AmenitySlice/amenitySlice";
import { toast } from "react-toastify";

const Amenities = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { amenityList, isLoading, isError, message } = useSelector(
    (state) => state.amenity
  );

  useEffect(() => {
    dispatch(fetchAmenity());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      toast.error(message?.message || message || "Something went wrong");
      dispatch(reset());
    }
  }, [isError, message, dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this amenity?")) {
      dispatch(deleteAmenity(id));
      toast.success("Amenity deleted successfully");
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#64031b] bg-[#64031b]/10 px-3 py-1 rounded-full">
            Luxury & Comfort
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-[#64031b] tracking-wide">
            Hotel Amenities & Facilities
          </h1>
          <p className="text-sm text-gray-500">
            Immerse yourself in relaxation and wellness with our world-class facilities tailored for your ultimate comfort.
          </p>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-4">
            <div className="w-12 h-12 border-4 border-[#e6dfd5] border-t-[#64031b] rounded-full animate-spin"></div>
            <p className="text-[#64031b] font-bold tracking-widest uppercase text-sm animate-pulse">
              Loading Amenities...
            </p>
          </div>
        ) : amenityList && amenityList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {amenityList.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-3xl border border-[#e6dfd5] shadow-sm overflow-hidden flex flex-col justify-between transition hover:shadow-md"
              >
                <div>
                  {item.image && (
                    <div className="h-56 w-full overflow-hidden relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition duration-500 hover:scale-105"
                      />
                    </div>
                  )}
                  
                  <div className="p-6 space-y-3">
                    <h3 className="text-xl font-bold text-[#64031b]">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 border-t border-[#e6dfd5]/60 flex items-center justify-between mt-4">
                  <span className="text-xs font-bold text-gray-400">
                    {item.location || "Available On-Site"}
                  </span>

                  {user && user.isAdmin && (
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="px-4 py-2 bg-red-50 text-red-600 rounded-xl text-xs font-bold hover:bg-red-600 hover:text-white transition"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 px-6 bg-white rounded-3xl border border-[#e6dfd5]">
            <h3 className="text-lg font-bold text-[#64031b]">No Amenities Available</h3>
            <p className="text-xs text-gray-400 mt-1">
              Check back later for our updated hotel facilities and opening schedules.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default Amenities;