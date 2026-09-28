import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDining, deleteDining, reset } from "../../features/diningSlice/diningSlice";
import { toast } from "react-toastify";

const Dining = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { diningList, isLoading, isError, message } = useSelector(
    (state) => state.dining
  );

  useEffect(() => {
    dispatch(fetchDining());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      toast.error(message?.message || message || "Something went wrong");
      dispatch(reset());
    }
  }, [isError, message, dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this dining spot?")) {
      dispatch(deleteDining(id));
      toast.success("Dining spot deleted successfully");
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#64031b] bg-[#64031b]/10 px-3 py-1 rounded-full">
            Culinary Excellence
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-[#64031b] tracking-wide">
            Restaurants & Bars
          </h1>
          <p className="text-sm text-gray-500">
            Savor exceptional flavors, exquisite dining atmospheres, and signature beverages crafted by world-class chefs.
          </p>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-4">
            <div className="w-12 h-12 border-4 border-[#e6dfd5] border-t-[#64031b] rounded-full animate-spin"></div>
            <p className="text-[#64031b] font-bold tracking-widest uppercase text-sm animate-pulse">
              Loading Dining Options...
            </p>
          </div>
        ) : diningList && diningList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {diningList.map((item) => (
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
                    {item.cuisine && (
                      <div className="inline-block bg-[#fdfbf7] border border-[#e6dfd5] px-3 py-1 rounded-full text-xs font-semibold text-[#64031b]">
                        Cuisine: {item.cuisine}
                      </div>
                    )}
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 border-t border-[#e6dfd5]/60 flex items-center justify-between mt-4">
                  <span className="text-xs font-bold text-gray-400">
                    {item.openingHours || "Open Daily"}
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
            <h3 className="text-lg font-bold text-[#64031b]">No Dining Options Available</h3>
            <p className="text-xs text-gray-400 mt-1">
              Check back later for our updated restaurant menus and opening hours.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default Dining;