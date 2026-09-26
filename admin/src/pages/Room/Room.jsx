// import React, { useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { deleteRoom, reset } from "../../features/room/roomSlice";
// import Carousel from "../../components/Carousel/Carousel";

// const Room = () => {
//   const { user } = useSelector((state) => state.auth);
//   const { isSuccess } = useSelector((state) => state.room);
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [room, setRoom] = useState(null);
//   const [fetching, setFetching] = useState(true);

//   // حالات نافذة الحجز (Modal) - بدون تليفون لأنه مسجل مسبقاً في حساب العميل
//   const [isBookingOpen, setIsBookingOpen] = useState(false);
//   const [bookingData, setBookingData] = useState({
//     checkInDate: "",
//     checkOutDate: "",
//     paymentMethod: "card", // card, vodafone, cash
//   });
//   const [bookingLoading, setBookingLoading] = useState(false);

//   useEffect(() => {
//     if (isSuccess) {
//       dispatch(reset());
//       navigate("/rooms");
//     }
//   }, [isSuccess, dispatch, navigate]);

//   useEffect(() => {
//     const getRoom = async () => {
//       try {
//         setFetching(true);
//         const res = await fetch(`/api/rooms/${id}`);
//         if (res.ok) {
//           const data = await res.json();
//           setRoom(data);
//         }
//       } catch (error) {
//         console.log("Error:", error);
//       } finally {
//         setFetching(false);
//       }
//     };
//     getRoom();
//   }, [id]);

//   const handleDelete = () => {
//     if (window.confirm("Are you sure you want to delete this room?")) {
//       dispatch(deleteRoom(id));
//     }
//   };

//   const handleBookingChange = (e) => {
//     setBookingData({
//       ...bookingData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // إرسال الحجز للباك إند مع جلب تفاصيل العميل ورقم تليفونه المسجل تلقائياً لتظهر للأدمن
//   const handleBookingSubmit = async (e) => {
//     e.preventDefault();
//     if (!user) {
//       navigate("/login");
//       return;
//     }

//     if (!bookingData.checkInDate || !bookingData.checkOutDate) {
//       alert("Please select check-in and check-out dates.");
//       return;
//     }

//     try {
//       setBookingLoading(true);
//       const res = await fetch("/api/bookings", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//         body: JSON.stringify({
//           roomId: room._id,
//           checkInDate: bookingData.checkInDate,
//           checkOutDate: bookingData.checkOutDate,
//           paymentMethod: bookingData.paymentMethod,
//           userId: user._id,
//           roomName: room.name,
//           price: room.price,
//           customerName: user.name || "Customer",
//           customerEmail: user.email,
//           customerPhone: user.phone, // الرقم المسجل مسبقاً في حساب العميل
//         }),
//       });

//       if (res.ok) {
//         alert("Room booked successfully! Details sent to Admin Dashboard.");
//         setIsBookingOpen(false);
//         navigate("/rooms");
//       } else {
//         const err = await res.json();
//         alert(err.message || "Something went wrong during booking.");
//       }
//     } catch (error) {
//       console.log("Booking error:", error);
//     } finally {
//       setBookingLoading(false);
//     }
//   };

//   if (fetching) {
//     return (
//       <div className="min-h-[80vh] flex justify-center items-center bg-[#fdfbf7]">
//         <div className="w-[50px] h-[50px] border-4 border-[#e6dfd5] border-t-4 border-t-[#64031b] rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#fdfbf7] py-10 px-5">
//       <div className="max-w-[900px] mx-auto">
//         {/* زر العودة للخلف */}
//         <button
//           onClick={() => navigate("/rooms")}
//           className="bg-transparent border-none text-[#64031b] font-bold text-sm mb-5 flex items-center gap-2 cursor-pointer hover:underline"
//         >
//           ← Back to Rooms
//         </button>

//         {room ? (
//           <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#e6dfd5]">
//             {/* Carousel لعرض الصور */}
//             <div className="h-[450px] w-full bg-gray-100 relative">
//               <Carousel
//                 data={
//                   room.img && room.img.length > 0 ? room.img : ["/not-or.png"]
//                 }
//               />
//             </div>

//             {/* تفاصيل الغرفة */}
//             <div className="p-8">
//               <div className="flex justify-between items-start flex-wrap gap-5 mb-5">
//                 <div>
//                   <h1 className="text-3xl font-extrabold text-[#64031b] mb-2.5">
//                     {room.name}
//                   </h1>
//                   <p className="text-sm text-gray-500 leading-relaxed max-w-[600px] m-0">
//                     {room.desc || "No description provided for this room."}
//                   </p>
//                 </div>

//                 <div className="text-right bg-[#fdfbf7] py-4 px-6 rounded-xl border border-[#e6dfd5]">
//                   <span className="text-3xl font-black text-[#64031b]">
//                     ${room.price ? room.price.toFixed(2) : "0.00"}
//                   </span>
//                   <span className="text-xs text-gray-400 block uppercase tracking-wider">
//                     Per Night
//                   </span>
//                 </div>
//               </div>

//               {/* زر حجز الغرفة للعملاء */}
//               {!user?.isAdmin && (
//                 <div className="mt-8 pt-6 border-t border-[#eae5de]">
//                   <button
//                     onClick={() => {
//                       if (!user) navigate("/login");
//                       else setIsBookingOpen(true);
//                     }}
//                     className="w-full bg-[#64031b] text-white py-4 rounded-xl font-bold text-base hover:bg-[#500216] transition shadow-md cursor-pointer"
//                   >
//                     Book This Room Now
//                   </button>
//                 </div>
//               )}

//               {/* أزرار التحكم للأدمن */}
//               {user && user.isAdmin ? (
//                 <div className="flex gap-4 mt-8 pt-6 border-t border-[#eae5de]">
//                   <Link
//                     to={`/edit/rooms/${room._id}`}
//                     className="flex-1 bg-[#64031b] text-white text-center py-3 rounded-lg font-bold text-base shadow-md hover:bg-[#500216] transition"
//                   >
//                     Edit Room
//                   </Link>
//                   <button
//                     onClick={handleDelete}
//                     className="flex-1 bg-red-600 text-white border-none py-3 rounded-lg font-bold text-base cursor-pointer shadow-md hover:bg-red-700 transition"
//                   >
//                     Delete Room
//                   </button>
//                 </div>
//               ) : null}
//             </div>
//           </div>
//         ) : (
//           <div className="text-center p-15 bg-white rounded-2xl border border-[#e6dfd5]">
//             <h2 className="text-[#64031b]">Room not found</h2>
//           </div>
//         )}

//         {/* نافذة إتمام الحجز والدفع (بدون طلب رقم التليفون لأنه مسجل مسبقاً في الـ Profile) */}
//         {isBookingOpen && (
//           <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
//             <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-[#e6dfd5] relative">
//               <h3 className="text-xl font-extrabold text-[#64031b] mb-4">
//                 Complete Your Booking
//               </h3>

//               <form onSubmit={handleBookingSubmit} className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-bold text-gray-700 mb-1">
//                     Check-in Date
//                   </label>
//                   <input
//                     type="date"
//                     name="checkInDate"
//                     value={bookingData.checkInDate}
//                     onChange={handleBookingChange}
//                     className="w-full p-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#64031b]"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-bold text-gray-700 mb-1">
//                     Check-out Date
//                   </label>
//                   <input
//                     type="date"
//                     name="checkOutDate"
//                     value={bookingData.checkOutDate}
//                     onChange={handleBookingChange}
//                     className="w-full p-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#64031b]"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-bold text-gray-700 mb-1">
//                     Payment Method
//                   </label>
//                   <select
//                     name="paymentMethod"
//                     value={bookingData.paymentMethod}
//                     onChange={handleBookingChange}
//                     className="w-full p-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#64031b] bg-white"
//                   >
//                     <option value="card">Credit / Debit Card</option>
//                     <option value="vodafone">
//                        Cash / Mobile Wallet
//                     </option>
//                     <option value="cash">Pay at Hotel / Cash</option>
//                   </select>
//                 </div>

//                 <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-xs text-gray-500">
//                   Note: Booking will be registered using your account phone
//                   number (
//                   <span className="font-bold text-[#64031b]">
//                     {user?.phone}
//                   </span>
//                   ).
//                 </div>

//                 <div className="flex gap-3 pt-4">
//                   <button
//                     type="button"
//                     onClick={() => setIsBookingOpen(false)}
//                     className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-bold text-sm cursor-pointer hover:bg-gray-300 transition"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     disabled={bookingLoading}
//                     className="flex-1 bg-[#64031b] text-white py-3 rounded-lg font-bold text-sm cursor-pointer hover:bg-[#500216] transition disabled:opacity-70"
//                   >
//                     {bookingLoading ? "Processing..." : "Confirm & Pay"}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// Room.displayName = "Room";

// export default Room;

import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteRoom, reset } from "../../features/room/roomSlice";
import Carousel from "../../components/Carousel/Carousel";
import { toast } from "react-toastify";

const Room = () => {
  const { user } = useSelector((state) => state.auth);
  const { isSuccess } = useSelector((state) => state.room);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [fetching, setFetching] = useState(true);

  // حالات نافذة الحجز والدفع
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [paymentStep, setPaymentStep] = useState(1); // 1: اختيار التواريخ ووسيلة الدفع, 2: إدخال بيانات الدفع

  const [bookingData, setBookingData] = useState({
    checkInDate: "",
    checkOutDate: "",
    paymentMethod: "card", // card, vodafone, cash
    // بيانات الكارت
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    // بيانات المحفظة الإلكترونية
    walletNumber: "",
  });

  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
      navigate("/rooms");
    }
  }, [isSuccess, dispatch, navigate]);

  useEffect(() => {
    const getRoom = async () => {
      try {
        setFetching(true);
        const res = await fetch(`/api/rooms/${id}`);
        if (res.ok) {
          const data = await res.json();
          setRoom(data);
        }
      } catch (error) {
        console.log("Error:", error);
      } finally {
        setFetching(false);
      }
    };
    getRoom();
  }, [id]);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      dispatch(deleteRoom(id));
    }
  };

  const handleBookingChange = (e) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value,
    });
  };

  const getNextDay = (date) => {
    if (!date) return "";

    const nextDay = new Date(`${date}T00:00:00`);
    nextDay.setDate(nextDay.getDate() + 1);

    return nextDay.toISOString().split("T")[0];
  };

  // الانتقال لخطوة إدخال بيانات الدفع أو إتمام الحجز مباشرة لو الدفع كاش
  const handleProceedToPayment = (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/login");
      return;
    }
    // if (!bookingData.checkInDate || !bookingData.checkOutDate) {
    //   alert("Please select check-in and check-out dates.");
    //   return;
    // }
    if (!bookingData.checkInDate || !bookingData.checkOutDate) {
      // alert("Please select check-in and check-out dates.");
      toast.error("Please select check-in and check-out dates.")
      return;
    }

    const checkIn = new Date(`${bookingData.checkInDate}T00:00:00`);
    const checkOut = new Date(`${bookingData.checkOutDate}T00:00:00`);

    if (checkOut <= checkIn) {
      toast.error("Check-out date must be after the check-in date.")
      return;
    }

    // لو الدفع في الفندق، مش محتاجين خطوة ثانية، نبعت دايركت
    if (bookingData.paymentMethod === "cash") {
      submitFinalBooking();
    } else {
      // الانتقال لخطوة إدخال بيانات الكارت أو المحفظة
      setPaymentStep(2);
    }
  };

  // إرسال الحجز النهائي للباك إند بعد إدخال تفاصيل الدفع
  const submitFinalBooking = async () => {
    // التحقق البسيط من الحقول حسب وسيلة الدفع
    if (bookingData.paymentMethod === "card") {
      if (
        !bookingData.cardNumber ||
        !bookingData.cardExpiry ||
        !bookingData.cardCvc
      ) {
        toast.error("Please fill in all credit card details.")
        return;
      }
    } else if (bookingData.paymentMethod === "vodafone") {
      if (!bookingData.walletNumber) {
        toast.error("Please enter your mobile wallet phone number.")
        return;
      }
    }

    try {
      setBookingLoading(true);
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          roomId: room._id,
          checkInDate: bookingData.checkInDate,
          checkOutDate: bookingData.checkOutDate,
          paymentMethod: bookingData.paymentMethod,
          paymentDetails: {
            cardNumber:
              bookingData.paymentMethod === "card"
                ? bookingData.cardNumber.slice(-4)
                : null, // حفظ آخر 4 أرقام فقط للأمان
            walletNumber:
              bookingData.paymentMethod === "vodafone"
                ? bookingData.walletNumber
                : null,
          },
          userId: user._id,
          roomName: room.name,
          price: room.price,
          customerName: user.name || "Customer",
          customerEmail: user.email,
          customerPhone: user.phone,
        }),
      });

      if (res.ok) {
          
        toast.success("Payment successful & Room booked successfully!")
        setIsBookingOpen(false);
        setPaymentStep(1);
        navigate("/rooms");
      } else {
        const err = await res.json();
        alert(err.message || "Something went wrong during booking.");
      }
    } catch (error) {
      console.log("Booking error:", error);
    } finally {
      setBookingLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-[80vh] flex justify-center items-center bg-[#fdfbf7]">
        <div className="w-[50px] h-[50px] border-4 border-[#e6dfd5] border-t-4 border-t-[#64031b] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdfbf7] py-10 px-5">
      <div className="max-w-[900px] mx-auto">
        {/* زر العودة للخلف */}
        <button
          onClick={() => navigate("/rooms")}
          className="bg-transparent border-none text-[#64031b] font-bold text-sm mb-5 flex items-center gap-2 cursor-pointer hover:underline"
        >
          ← Back to Rooms
        </button>

        {room ? (
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#e6dfd5]">
            {/* Carousel لعرض الصور */}
            <div className="h-[450px] w-full bg-gray-100 relative">
              <Carousel
                data={
                  room.img && room.img.length > 0 ? room.img : ["/not-or.png"]
                }
              />
            </div>

            {/* تفاصيل الغرفة */}
            <div className="p-8">
              <div className="flex justify-between items-start flex-wrap gap-5 mb-5">
                <div>
                  <h1 className="text-3xl font-extrabold text-[#64031b] mb-2.5">
                    {room.name}
                  </h1>
                  <p className="text-sm text-gray-500 leading-relaxed max-w-[600px] m-0">
                    {room.desc || "No description provided for this room."}
                  </p>
                </div>
                <div className="text-right bg-[#fdfbf7] py-4 px-6 rounded-xl border border-[#e6dfd5]">
                  <span className="text-3xl font-black text-[#64031b]">
                    ${room.price ? room.price.toFixed(2) : "0.00"}
                  </span>
                  <span className="text-xs text-gray-400 block uppercase tracking-wider">
                    Per Night
                  </span>
                </div>
              </div>

              {/* زر حجز الغرفة للعملاء */}
              {!user?.isAdmin && (
                <div className="mt-8 pt-6 border-t border-[#eae5de]">
                  <button
                    onClick={() => {
                      if (!user) navigate("/login");
                      else {
                        setPaymentStep(1);
                        setIsBookingOpen(true);
                      }
                    }}
                    className="w-full bg-[#64031b] text-white py-4 rounded-xl font-bold text-base hover:bg-[#500216] transition shadow-md cursor-pointer"
                  >
                    Book This Room Now
                  </button>
                </div>
              )}

              {/* أزرار التحكم للأدمن */}
              {user && user.isAdmin ? (
                <div className="flex gap-4 mt-8 pt-6 border-t border-[#eae5de]">
                  <Link
                    to={`/edit/rooms/${room._id}`}
                    className="flex-1 bg-[#64031b] text-white text-center py-3 rounded-lg font-bold text-base shadow-md hover:bg-[#500216] transition"
                  >
                    Edit Room
                  </Link>
                  <button
                    onClick={handleDelete}
                    className="flex-1 bg-red-600 text-white border-none py-3 rounded-lg font-bold text-base cursor-pointer shadow-md hover:bg-red-700 transition"
                  >
                    Delete Room
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        ) : (
          <div className="text-center p-15 bg-white rounded-2xl border border-[#e6dfd5]">
            <h2 className="text-[#64031b]">Room not found</h2>
          </div>
        )}

        {/* نافذة الحجز والدفع التفاعلية */}
        {isBookingOpen && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-[#e6dfd5] relative animate-fadeIn">
              {/* الخطوة الأولى: اختيار التواريخ ووسيلة الدفع */}
              {paymentStep === 1 && (
                <>
                  <h3 className="text-xl font-extrabold text-[#64031b] mb-4">
                    Complete Your Booking
                  </h3>
                  <form onSubmit={handleProceedToPayment} className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">
                        Check-in Date
                      </label>
                      <input
                        type="date"
                        name="checkInDate"
                        value={bookingData.checkInDate}
                        onChange={handleBookingChange}
                        className="w-full p-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#64031b]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">
                        Check-out Date
                      </label>
                      <input
                        type="date"
                        name="checkOutDate"
                        value={bookingData.checkOutDate}
                        min={getNextDay(bookingData.checkInDate)}
                        onChange={handleBookingChange}
                        className="w-full p-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#64031b]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">
                        Payment Method
                      </label>
                      <select
                        name="paymentMethod"
                        value={bookingData.paymentMethod}
                        onChange={handleBookingChange}
                        className="w-full p-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#64031b] bg-white"
                      >
                        <option value="card">
                          Credit / Debit Card (Visa/Mastercard)
                        </option>
                        <option value="vodafone">
                          Mobile Wallet (Vodafone Cash / InstaPay)
                        </option>
                        <option value="cash">Pay at Hotel / Cash</option>
                      </select>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-xs text-gray-500">
                      Note: Booking will be registered using your account phone
                      number (
                      <span className="font-bold text-[#64031b]">
                        {user?.phone}
                      </span>
                      ).
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        type="button"
                        onClick={() => setIsBookingOpen(false)}
                        className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-bold text-sm cursor-pointer hover:bg-gray-300 transition"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 bg-[#64031b] text-white py-3 rounded-lg font-bold text-sm cursor-pointer hover:bg-[#500216] transition"
                      >
                        Proceed to Payment →
                      </button>
                    </div>
                  </form>
                </>
              )}

              {/* الخطوة الثانية: إدخال تفاصيل الدفع الفعلي (كريديت أو محفظة) */}
              {paymentStep === 2 && (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-extrabold text-[#64031b]">
                      {bookingData.paymentMethod === "card"
                        ? "Card Payment Details"
                        : "Mobile Wallet Details"}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setPaymentStep(1)}
                      className="text-xs text-[#64031b] font-bold hover:underline cursor-pointer"
                    >
                      ← Back
                    </button>
                  </div>

                  <div className="space-y-4">
                    {bookingData.paymentMethod === "card" ? (
                      <>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1">
                            Card Number
                          </label>
                          <input
                            type="text"
                            name="cardNumber"
                            placeholder="4532 •••• •••• 8921"
                            maxLength="19"
                            value={bookingData.cardNumber}
                            onChange={handleBookingChange}
                            className="w-full p-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#64031b]"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">
                              Expiry Date
                            </label>
                            <input
                              type="text"
                              name="cardExpiry"
                              placeholder="MM/YY"
                              maxLength="5"
                              value={bookingData.cardExpiry}
                              onChange={handleBookingChange}
                              className="w-full p-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#64031b]"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">
                              CVV / CVC
                            </label>
                            <input
                              type="password"
                              name="cardCvc"
                              placeholder="123"
                              maxLength="4"
                              value={bookingData.cardCvc}
                              onChange={handleBookingChange}
                              className="w-full p-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#64031b]"
                              required
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="bg-amber-50 p-3 rounded-lg border border-amber-200 text-xs text-amber-800 leading-relaxed">
                          Please transfer the total amount to our official
                          wallet number:{" "}
                          <span className="font-bold">01012345678</span>, then
                          enter your mobile wallet number below to verify
                          payment.
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1">
                            Your Mobile Wallet Number
                          </label>
                          <input
                            type="text"
                            name="walletNumber"
                            placeholder="010XXXXXXXX"
                            maxLength="11"
                            value={bookingData.walletNumber}
                            onChange={handleBookingChange}
                            className="w-full p-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#64031b]"
                            required
                          />
                        </div>
                      </>
                    )}

                    <div className="pt-4 flex gap-3">
                      <button
                        type="button"
                        onClick={() => setIsBookingOpen(false)}
                        className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-bold text-sm cursor-pointer hover:bg-gray-300 transition"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={submitFinalBooking}
                        disabled={bookingLoading}
                        className="flex-1 bg-[#64031b] text-white py-3 rounded-lg font-bold text-sm cursor-pointer hover:bg-[#500216] transition disabled:opacity-70"
                      >
                        {bookingLoading
                          ? "Processing Payment..."
                          : `Pay $${room.price ? room.price.toFixed(2) : "0.00"}`}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

Room.displayName = "Room";
export default Room;
