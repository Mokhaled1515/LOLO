// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { fetchOfferById } from "../../features/offerSlice/offerSlice";

// const EditOffer = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();

//   const { offer, isLoading, isError, message } = useSelector(
//     (state) => state.offer,
//   );

//   useEffect(() => {
//     dispatch(fetchOfferById(id));
//   }, [dispatch, id]);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (isError) {
//     return <div>{message}</div>;
//   }

//   if (!offer) {
//     return <div>No offer found</div>;
//   }

//   return (
//     <div>
//       <h1>Edit Offer</h1>

//       <p>Title: {offer.title}</p>
//       <p>Description: {offer.description}</p>
//       <p>Discount: {offer.discountPercentage}</p>
//       <p>Valid Until: {offer.validUntil}</p>

//       <img src={offer.image} alt={offer.title} width="200" />
//     </div>
//   );
// };

// export default EditOffer;


import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchOfferById, updateOffer } from "../../features/offerSlice/offerSlice"; // تأكد من استيراد دالة التحديث المناسبة عندك

const EditOffer = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { offer, isLoading, isError, message } = useSelector(
    (state) => state.offer
  );

  const [offerData, setOfferData] = useState({
    title: "",
    description: "",
    discountPercentage: "",
    validUntil: "",
    image: null,
    imagePreview: "",
  });

  useEffect(() => {
    dispatch(fetchOfferById(id));
  }, [dispatch, id]);

  // تحديث الـ local state أول ما بيانات العرض تتحمل من الـ Redux
  useEffect(() => {
    if (offer) {
      setOfferData({
        title: offer.title || "",
        description: offer.description || "",
        discountPercentage: offer.discountPercentage || "",
        validUntil: offer.validUntil ? offer.validUntil.split("T")[0] : "",
        image: null,
        imagePreview: offer.image || "",
      });
    }
  }, [offer]);

  const handleChange = (e) => {
    setOfferData({ ...offerData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setOfferData({
        ...offerData,
        image: file,
        imagePreview: previewUrl,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", offerData.title);
    formData.append("description", offerData.description);
    formData.append("discountPercentage", offerData.discountPercentage);
    formData.append("validUntil", offerData.validUntil);
    if (offerData.image) {
      formData.append("image", offerData.image);
    }
    dispatch(updateOffer({ id, formData })).then((result) => {
      if (!result.error) {
        navigate("/dashboard"); // رجعه للداشبورد بعد التعديل الناجح
      }
    });

    // هنا بتنادي دالة التحديث (Update Thunk) وتبعت الـ id والـ formData
    // dispatch(updateOffer({ id, formData })).then(() => navigate('/dashboard'));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] bg-[#fdfbf7]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#64031b]"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-center text-red-600 bg-red-50 rounded-xl max-w-md mx-auto mt-10">
        <p className="font-semibold">{message || "Something went wrong!"}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdfbf7] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl border border-[#e6dfd5] p-6 sm:p-10">
        
        {/* Header */}
        <div className="mb-8 border-b border-gray-100 pb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#64031b] bg-[#f5efe6] px-3 py-1 rounded-full">
            Admin Management
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2">
            Edit Special Offer
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Update the discount details and package options for your guests.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Offer Title */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
              Offer Title
            </label>
            <input
              type="text"
              name="title"
              value={offerData.title}
              onChange={handleChange}
              required
              placeholder="e.g. Summer Luxury Getaway"
              className="w-full px-4 py-3 rounded-xl border border-[#e6dfd5] bg-[#fdfbf7] text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#64031b] transition"
            />
          </div>

          {/* Discount & Valid Until Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                Discount Percentage (%)
              </label>
              <input
                type="number"
                name="discountPercentage"
                value={offerData.discountPercentage}
                onChange={handleChange}
                required
                min="1"
                max="100"
                placeholder="20"
                className="w-full px-4 py-3 rounded-xl border border-[#e6dfd5] bg-[#fdfbf7] text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#64031b] transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                Valid Until Date
              </label>
              <input
                type="date"
                name="validUntil"
                value={offerData.validUntil}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-[#e6dfd5] bg-[#fdfbf7] text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#64031b] transition"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
              Description
            </label>
            <textarea
              name="description"
              rows="4"
              value={offerData.description}
              onChange={handleChange}
              required
              placeholder="Explain what is included in this offer..."
              className="w-full px-4 py-3 rounded-xl border border-[#e6dfd5] bg-[#fdfbf7] text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#64031b] transition resize-none"
            />
          </div>

          {/* Banner Image Upload & Preview */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
              Offer Banner Image
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-44 border-2 border-[#e6dfd5] border-dashed rounded-2xl cursor-pointer bg-[#fdfbf7] hover:bg-[#f5efe6] transition relative overflow-hidden group">
                
                {offerData.imagePreview ? (
                  <>
                    <img
                      src={offerData.imagePreview}
                      alt="Offer Preview"
                      className="w-full h-full object-cover absolute inset-0"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-xs font-semibold">
                      Click to change image
                    </div>
                  </>
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
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-3 rounded-xl border border-[#e6dfd5] text-gray-700 text-sm font-semibold hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 rounded-xl bg-[#64031b] text-white text-sm font-semibold hover:bg-[#500215] shadow-lg shadow-[#64031b]/20 transition"
            >
              Update Offer
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EditOffer;