import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOffer, reset } from "../../features/offerSlice/offerSlice"; // تأكد من المسار الصحيح للـ slice
import { FaArrowLeft, FaPercent, FaCalendarAlt, FaCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";

const OfferDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { offerList, isLoading, isError, message } = useSelector(
    (state) => state.offer
  );

  useEffect(() => {
    if (!offerList || offerList.length === 0) {
      dispatch(fetchOffer());
    }
  }, [dispatch, offerList]);

  useEffect(() => {
    if (isError) {
      toast.error(message?.message || message || "Something went wrong");
      dispatch(reset());
    }
  }, [isError, message, dispatch]);

  const offer = offerList?.find((item) => item._id === id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fdfbf7] flex flex-col items-center justify-center py-24 space-y-4">
        <div className="w-12 h-12 border-4 border-[#e6dfd5] border-t-[#64031b] rounded-full animate-spin"></div>
        <p className="text-[#64031b] font-bold tracking-widest uppercase text-sm animate-pulse">
          Loading Offer Details...
        </p>
      </div>
    );
  }

  if (!offer) {
    return (
      <div className="min-h-screen bg-[#fdfbf7] flex items-center justify-center px-4">
        <div className="text-center py-16 px-8 bg-white border border-[#e6dfd5] rounded-3xl shadow-sm max-w-md w-full space-y-4">
          <h2 className="text-2xl font-black text-[#64031b]">Offer Not Found</h2>
          <p className="text-gray-500 text-sm">
            The offer you are looking for might have expired or doesn't exist.
          </p>
          <button
            onClick={() => navigate("/offers")}
            className="w-full py-3 bg-[#64031b] text-white font-bold text-sm rounded-xl hover:bg-[#4d0214] transition shadow cursor-pointer"
          >
            Back to Offers
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdfbf7] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#64031b]/5 rounded-full blur-3xl pointer-events-none -ml-12 -mt-12"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#e6dfd5]/40 rounded-full blur-3xl pointer-events-none -mr-12 -mb-12"></div>

      <div className="max-w-5xl mx-auto relative z-10 space-y-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-xs font-bold text-[#64031b] bg-white border border-[#e6dfd5] px-4 py-2.5 rounded-xl hover:bg-[#64031b] hover:text-white transition shadow-sm cursor-pointer group"
        >
          <FaArrowLeft className="transition-transform group-hover:-translate-x-1" />
          <span>Back to Offers</span>
        </button>

        <div className="bg-white border border-[#e6dfd5] rounded-3xl shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">
          
          {offer.image && (
            <div className="lg:col-span-6 relative h-72 sm:h-96 lg:h-full min-h-[300px] bg-gray-100 overflow-hidden">
              <img
                src={offer.image}
                alt={offer.title}
                className="w-full h-full object-cover"
              />
              {offer.discountPercentage && (
                <div className="absolute top-4 left-4 bg-[#64031b] text-white text-xs font-black px-4 py-2 rounded-xl shadow-md flex items-center gap-1.5">
                  <FaPercent className="text-[10px]" />
                  <span>{offer.discountPercentage}% OFF</span>
                </div>
              )}
            </div>
          )}

          <div className={`p-6 sm:p-10 flex flex-col justify-between space-y-6 ${offer.image ? 'lg:col-span-6' : 'lg:col-span-12'}`}>
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#64031b] bg-[#64031b]/10 px-3.5 py-1 rounded-full inline-block">
                Exclusive Package
              </span>
              
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#64031b] tracking-wide">
                {offer.title}
              </h1>

              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                {offer.description}
              </p>

              <div className="flex items-center gap-2 text-xs font-bold text-gray-500 bg-[#fdfbf7] border border-[#e6dfd5] p-3 rounded-2xl w-fit">
                <FaCalendarAlt className="text-[#64031b]" />
                <span>
                  {offer.validUntil
                    ? `Valid until: ${new Date(offer.validUntil).toLocaleDateString()}`
                    : "Limited Time Offer"}
                </span>
              </div>

              <div className="space-y-2 pt-2 border-t border-gray-100">
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                  <FaCheckCircle className="text-[#64031b]" />
                  <span>Includes all resort standard amenities and luxury services.</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                  <FaCheckCircle className="text-[#64031b]" />
                  <span>Flexible cancellation policy according to terms.</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#e6dfd5]/60 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={() => navigate("/rooms")} // أو توجيهه لصفحة الحجز أو الغرف
                className="w-full sm:flex-1 py-3.5 bg-[#64031b] text-white font-bold text-sm rounded-2xl hover:bg-[#4d0214] transition shadow-md cursor-pointer text-center"
              >
                Book This Offer Now
              </button>
              
              <button
                onClick={() => navigate("/contact")} 
                className="w-full sm:w-auto px-6 py-3.5 bg-gray-50 text-gray-700 border border-[#e6dfd5] font-bold text-sm rounded-2xl hover:bg-gray-100 transition cursor-pointer text-center"
              >
                Inquire More
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default OfferDetails;