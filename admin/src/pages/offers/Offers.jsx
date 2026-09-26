// // import React, { useEffect } from "react";
// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchOffer,
//   deleteOffer,
//   reset,
// } from "../../features/offerSlice/offerSlice";
// import { toast } from "react-toastify";

// const Offers = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { user } = useSelector((state) => state.auth);
//   const { offerList, isLoading, isError, message } = useSelector(
//     (state) => state.offer,
//   );

//   useEffect(() => {
//     dispatch(fetchOffer());
//   }, [dispatch]);

//   useEffect(() => {
//     if (isError) {
//       toast.error(message?.message || message || "Something went wrong");
//       dispatch(reset());
//     }
//   }, [isError, message, dispatch]);

//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this offer?")) {
//       dispatch(deleteOffer(id));
//       toast.success("Offer deleted successfully");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#fdfbf7] py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto space-y-8">
//         {/* ترويسة القسم */}
//         <div className="text-center max-w-2xl mx-auto space-y-3">
//           <span className="text-xs font-bold uppercase tracking-widest text-[#64031b] bg-[#64031b]/10 px-3 py-1 rounded-full">
//             Exclusive Deals
//           </span>
//           <h1 className="text-3xl md:text-5xl font-black text-[#64031b] tracking-wide">
//             Special Offers & Packages
//           </h1>
//           <p className="text-sm text-gray-500">
//             Discover our curated packages and seasonal discounts designed to
//             make your stay even more rewarding.
//           </p>
//         </div>

//         {/* حالة التحميل */}
//         {isLoading ? (
//           <div className="flex flex-col items-center justify-center py-24 space-y-4">
//             <div className="w-12 h-12 border-4 border-[#e6dfd5] border-t-[#64031b] rounded-full animate-spin"></div>
//             <p className="text-[#64031b] font-bold tracking-widest uppercase text-sm animate-pulse">
//               Loading Offers...
//             </p>
//           </div>
//         ) : offerList && offerList.length > 0 ? (
//           /* شبكة عرض العروض */
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {offerList.map((item) => (
//               <div
//                 key={item._id}
//                 className="bg-white rounded-3xl border border-[#e6dfd5] shadow-sm overflow-hidden flex flex-col justify-between transition hover:shadow-md"
//               >
//                 <div>
//                   {/* صورة العرض */}
//                   {item.image && (
//                     <div className="h-56 w-full overflow-hidden relative">
//                       <img
//                         src={item.image}
//                         alt={item.title}
//                         className="w-full h-full object-cover transition duration-500 hover:scale-105"
//                       />
//                       {item.discountPercentage && (
//                         <span className="absolute top-4 right-4 bg-[#64031b] text-white text-xs font-black px-3 py-1 rounded-full shadow-md">
//                           {item.discountPercentage}% OFF
//                         </span>
//                       )}
//                     </div>
//                   )}

//                   <div className="p-6 space-y-3">
//                     <h3 className="text-xl font-bold text-[#64031b]">
//                       {item.title}
//                     </h3>
//                     <p className="text-xs text-gray-500 leading-relaxed">
//                       {item.description}
//                     </p>
//                   </div>
//                 </div>

//                 {/* تفاصيل صالحة حتى وأزرار التحكم للأدمن */}
//                 <div className="px-6 pb-6 pt-2 border-t border-[#e6dfd5]/60 flex items-center justify-between mt-4">
//                   <span className="text-xs font-bold text-gray-400">
//                     {item.validUntil
//                       ? `Valid until: ${new Date(
//                           item.validUntil,
//                         ).toLocaleDateString()}`
//                       : "Limited Time Offer"}
//                   </span>

//                   {/* {user && user.isAdmin && (
//                     <button
//                       onClick={() => handleDelete(item._id)}
//                       className="px-4 py-2 bg-red-50 text-red-600 rounded-xl text-xs font-bold hover:bg-red-600 hover:text-white transition"
//                     >
//                       Delete
//                     </button>
//                   )} */}

//                   {user && user.isAdmin && (
//                     <div className="flex items-center gap-2">
//                       <button
//                         onClick={() =>
//                           navigate(`/admin/edit-offer/${item._id}`)
//                         }
//                         className="px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-xs font-bold hover:bg-blue-600 hover:text-white transition"
//                       >
//                         Edit
//                       </button>

//                       <button
//                         onClick={() => handleDelete(item._id)}
//                         className="px-4 py-2 bg-red-50 text-red-600 rounded-xl text-xs font-bold hover:bg-red-600 hover:text-white transition"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           /* في حالة عدم وجود بيانات */
//           <div className="text-center py-20 px-6 bg-white rounded-3xl border border-[#e6dfd5]">
//             <h3 className="text-lg font-bold text-[#64031b]">
//               No Active Offers
//             </h3>
//             <p className="text-xs text-gray-400 mt-1">
//               Check back soon for our latest promotions and getaway deals.
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Offers;

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOffer,
  deleteOffer,
  reset,
} from "../../features/offerSlice/offerSlice";
import { toast } from "react-toastify";

const Offers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { offerList, isLoading, isError, message } = useSelector(
    (state) => state.offer,
  );

  useEffect(() => {
    dispatch(fetchOffer());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      toast.error(message?.message || message || "Something went wrong");
      dispatch(reset());
    }
  }, [isError, message, dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this offer?")) {
      dispatch(deleteOffer(id));
      toast.success("Offer deleted successfully");
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* ترويسة القسم */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#64031b] bg-[#64031b]/10 px-3 py-1 rounded-full">
            Exclusive Deals
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-[#64031b] tracking-wide">
            Special Offers & Packages
          </h1>
          <p className="text-sm text-gray-500">
            Discover our curated packages and seasonal discounts designed to
            make your stay even more rewarding.
          </p>
        </div>

        {/* حالة التحميل */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-4">
            <div className="w-12 h-12 border-4 border-[#e6dfd5] border-t-[#64031b] rounded-full animate-spin"></div>
            <p className="text-[#64031b] font-bold tracking-widest uppercase text-sm animate-pulse">
              Loading Offers...
            </p>
          </div>
        ) : offerList && offerList.length > 0 ? (
          /* شبكة عرض العروض */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {offerList.map((item) => (
              <div
                key={item._id}
                onClick={() => navigate(`/offer/${item._id}`)}
                className="bg-white rounded-3xl border border-[#e6dfd5] shadow-sm overflow-hidden flex flex-col justify-between transition hover:shadow-md cursor-pointer group"
              >
                <div>
                  {/* صورة العرض */}
                  {item.image && (
                    <div className="h-56 w-full overflow-hidden relative">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                      />
                      {item.discountPercentage && (
                        <span className="absolute top-4 right-4 bg-[#64031b] text-white text-xs font-black px-3 py-1 rounded-full shadow-md">
                          {item.discountPercentage}% OFF
                        </span>
                      )}
                    </div>
                  )}

                  <div className="p-6 space-y-3">
                    <h3 className="text-xl font-bold text-[#64031b] group-hover:underline">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* تفاصيل صالحة حتى وأزرار التحكم للأدمن */}
                <div
                  className="px-6 pb-6 pt-2 border-t border-[#e6dfd5]/60 flex items-center justify-between mt-4"
                  onClick={(e) => e.stopPropagation()} // منع انتقال الضغط لصفحة التفاصيل لو الأدمن ضغط على أزرار التعديل/الحذف
                >
                  <span className="text-xs font-bold text-gray-400">
                    {item.validUntil
                      ? `Valid until: ${new Date(
                          item.validUntil,
                        ).toLocaleDateString()}`
                      : "Limited Time Offer"}
                  </span>

                  {user && user.isAdmin && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          navigate(`/admin/edit-offer/${item._id}`)
                        }
                        className="px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-xs font-bold hover:bg-blue-600 hover:text-white transition"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(item._id)}
                        className="px-4 py-2 bg-red-50 text-red-600 rounded-xl text-xs font-bold hover:bg-red-600 hover:text-white transition"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* في حالة عدم وجود بيانات */
          <div className="text-center py-20 px-6 bg-white rounded-3xl border border-[#e6dfd5]">
            <h3 className="text-lg font-bold text-[#64031b]">
              No Active Offers
            </h3>
            <p className="text-xs text-gray-400 mt-1">
              Check back soon for our latest promotions and getaway deals.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Offers;
