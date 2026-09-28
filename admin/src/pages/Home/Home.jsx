import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaCalendarAlt,
  FaUser,
  FaTag,
  FaShieldAlt,
  FaHeadset,
  FaSmile,
  FaChevronLeft,
  FaChevronRight,
  FaPercent,
} from "react-icons/fa";
const API_URL = import.meta.env.VITE_API_URL;
const Home = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roomType, setRoomType] = useState("");
  const [dates, setDates] = useState("");
  const [guests, setGuests] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const videoRef = useRef(null);

  // 🌟 تم تحديث مصفوفة البانر لتصبح كائنات تدعم الصور والفيديوهات معاً
  const bannerItems = [
    { type: "video", src: "/vedioplayer.mp4" },
    { type: "image", src: "entryhotel3.jpg" },
    { type: "image", src: "entryhotel4.jpg" },
    { type: "image", src: "entryhotel5.jpg" },
    { type: "image", src: "entryhotel1.jpg" },
    { type: "image", src: "entryhotel6.jpg" },
    { type: "image", src: "entryhotel2.jpg" },
    { type: "image", src: "entryhotel7.jpg" },
    { type: "image", src: "/40485673_8848625.jpg" },
    { type: "image", src: "/bannerdesktop2.jpg" },
    { type: "image", src: "/bannerdesktop3.jpg" },
    { type: "image", src: "/bannerdesktop4.jpg" },
    { type: "image", src: "/bannerdesktop5.jpg" },
  ];

  const currentItem = bannerItems[currentImageIndex];

  // 🌟 التقليب التلقائي للصور فقط (كل 4 ثوانٍ مثلاً ليكون الوقت مريح للعين)
  useEffect(() => {
    // إذا كان العنصر الحالي فيديو، لا نkـعل الـ timer العادي يقطعه، بل ندع حدث الـ onEnded أو نحدد وقتاً أطول للفيديو
    if (currentItem.type === "video") return;

    const timer = setInterval(() => {
      setCurrentImageIndex((prev) =>
        prev === bannerItems.length - 1 ? 0 : prev + 1,
      );
    }, 2000); // زوّدت الوقت لـ 4 ثوانٍ عشان الصور ما تتخطفش بسرعة

    return () => clearInterval(timer);
  }, [currentImageIndex, bannerItems.length, currentItem.type]);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? bannerItems.length - 1 : prev - 1,
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === bannerItems.length - 1 ? 0 : prev + 1,
    );
  };

  // جلب الغرف والعروض معاً
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [roomsRes, offersRes] = await Promise.all([
          fetch(`${API_URL}/api/rooms`),
          fetch(`${API_URL}/api/offers`),
        ]);

        if (roomsRes.ok) {
          const roomsData = await roomsRes.json();
          setRooms(roomsData);
        }

        if (offersRes.ok) {
          const offersData = await offersRes.json();
          setOffers(
            Array.isArray(offersData) ? offersData : offersData.data || [],
          );
        }
      } catch (error) {
        console.log("Error fetching home data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    if (roomType) queryParams.append("type", roomType);
    if (guests) queryParams.append("guests", guests);
    if (dates) queryParams.append("dates", dates);

    navigate(`/rooms?${queryParams.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* 1. Hero Section */}
      <div className="relative bg-[#64031b] text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4">
            Find Your Dream Stay at <span className="text-amber-400">LOLO</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-200 max-w-2xl mx-auto mb-10">
            Experience luxury, comfort, and unmatched hospitality. Book your
            perfect room today with the best rates guaranteed.
          </p>

          {/* Quick Search Bar */}
          <form
            onSubmit={handleSearch}
            className="bg-white p-4 rounded-2xl shadow-2xl max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 text-gray-800"
          >
            <div className="flex items-center px-4 py-3 bg-gray-50 rounded-xl border border-gray-200">
              <FaTag className="text-[#64031b] mr-3 text-lg" />
              <div className="text-left w-full">
                <label className="block text-xs font-bold text-gray-400 uppercase">
                  Room Type
                </label>
                <select
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                  className="w-full bg-transparent focus:outline-none text-sm font-semibold cursor-pointer"
                >
                  <option value="">All Types</option>
                  <option value="Single">Single</option>
                  <option value="Double">Double</option>
                  <option value="Suite">Suite & Deluxe</option>
                </select>
              </div>
            </div>

            <div className="flex items-center px-4 py-3 bg-gray-50 rounded-xl border border-gray-200">
              <FaCalendarAlt className="text-[#64031b] mr-3 text-lg" />
              <div className="text-left w-full">
                <label className="block text-xs font-bold text-gray-400 uppercase">
                  Check in - out
                </label>
                <input
                  type="text"
                  placeholder="e.g. 28/8 - 31/8"
                  value={dates}
                  onChange={(e) => setDates(e.target.value)}
                  className="w-full bg-transparent focus:outline-none text-sm font-semibold"
                />
              </div>
            </div>

            <div className="flex items-center px-4 py-3 bg-gray-50 rounded-xl border border-gray-200">
              <FaUser className="text-[#64031b] mr-3 text-lg" />
              <div className="text-left w-full">
                <label className="block text-xs font-bold text-gray-400 uppercase">
                  Guests & Rooms
                </label>
                <input
                  type="text"
                  placeholder="e.g. 4 Adults, 2 Rooms"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full bg-transparent focus:outline-none text-sm font-semibold"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <button
                type="submit"
                className="w-full py-3 bg-[#64031b] hover:bg-[#4d0214] text-white font-bold rounded-xl transition shadow-md cursor-pointer"
              >
                Search Available Rooms
              </button>
            </div>
          </form>

          <div className="mt-6">
            <Link
              to="/rooms"
              className="inline-block px-8 py-4 bg-amber-400 hover:bg-amber-500 text-[#64031b] font-black rounded-xl shadow-lg transition transform hover:-translate-y-0.5"
            >
              Explore All Rooms
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Special Offers Section */}
      {offers.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#64031b] bg-amber-100 px-3 py-1 rounded-full">
              Limited Time
            </span>
            <h2 className="text-3xl font-black text-[#64031b] mt-2">
              Special Offers & Packages
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Take advantage of our exclusive discounts and curated stay
              packages
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {offers.map((offer) => (
              <div
                key={offer._id}
                onClick={() => navigate("/offers")}
                className="bg-white rounded-3xl overflow-hidden shadow-md border border-[#e6dfd5] flex flex-col justify-between group hover:shadow-xl transition duration-300 cursor-pointer"
              >
                <div className="relative h-52 overflow-hidden bg-gray-100">
                  <img
                    src={offer.image || "/not-or.png"}
                    alt={offer.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#64031b] text-amber-400 text-xs font-black px-3 py-1.5 rounded-xl shadow flex items-center gap-1">
                    <FaPercent className="text-[10px]" />
                    <span>{offer.discountPercentage}% OFF</span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-[#64031b] transition">
                    {offer.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-grow">
                    {offer.description}
                  </p>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
                    <span className="text-xs text-gray-400 font-medium">
                      Valid until:{" "}
                      {offer.validUntil
                        ? new Date(offer.validUntil).toLocaleDateString()
                        : "N/A"}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate("/rooms");
                      }}
                      className="px-4 py-2 bg-[#64031b] text-white text-xs font-bold rounded-xl hover:bg-[#4d0214] transition shadow"
                    >
                      Book Offer
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Features / Why Choose Us */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-[#64031b]">
            Why Choose LOLO?
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            We provide the ultimate experience for our valued guests
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition">
            <div className="w-14 h-14 bg-red-50 text-[#64031b] rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              <FaShieldAlt />
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-800">
              Secure Booking
            </h3>
            <p className="text-gray-500 text-sm">
              Book with confidence using our secure payment and data protection
              systems.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition">
            <div className="w-14 h-14 bg-red-50 text-[#64031b] rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              <FaHeadset />
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-800">
              24/7 Support
            </h3>
            <p className="text-gray-500 text-sm">
              Our dedicated team is always ready to assist you anytime,
              anywhere.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition">
            <div className="w-14 h-14 bg-red-50 text-[#64031b] rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              <FaSmile />
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-800">
              Best Price Guarantee
            </h3>
            <p className="text-gray-500 text-sm">
              Enjoy luxurious stays at competitive rates with exclusive member
              discounts.
            </p>
          </div>
        </div>
      </div>

      {/* 4. Full Width Banner Section with Prev/Next Sliders (Supports Images & Videos) */}
      <div className="w-full my-8 relative group overflow-hidden shadow-lg bg-black">
        <div className="w-full sm:hidden relative h-auto flex items-center justify-center">
          <img
            src="/bannermob.jpg"
            alt="LOLO Hotel Mobile Banner"
            className="w-full h-full object-cover object-center"
            style={{ imageRendering: "-webkit-optimize-contrast" }}
          />
        </div>

        <div className="w-full h-[320px] sm:h-[450px] lg:h-[650px] relative hidden sm:block">
          {/* 🌟 عرض الفيديو أو الصورة بناءً على نوع العنصر الحالي مع ربط حدث انتهاء الفيديو */}
          {currentItem.type === "video" ? (
            <video
              ref={videoRef}
              src={currentItem.src}
              autoPlay
              muted
              playsInline
              onEnded={() => {
                // الانتقال تلقائياً للعنصر التالي فور انتهاء الفيديو تماماً
                setCurrentImageIndex((prev) =>
                  prev === bannerItems.length - 1 ? 0 : prev + 1,
                );
              }}
              className="w-full h-full object-cover object-center transition-opacity duration-700 ease-in-out opacity-100"
            />
          ) : (
            <img
              src={currentItem.src}
              alt="LOLO Hotel Banner"
              className="w-full h-full object-cover object-center transition-all duration-1000 ease-out transform scale-105 animate-fade"
              style={{
                imageRendering: "-webkit-optimize-contrast",
                animation: "fadeInZoom 1s ease-in-out forwards",
              }}
            />
          )}

          <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>

          <button
            onClick={handlePrevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full opacity-70 group-hover:opacity-100 transition duration-300 z-10 cursor-pointer shadow-lg"
            aria-label="Previous Item"
          >
            <FaChevronLeft className="text-xl" />
          </button>

          <button
            onClick={handleNextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full opacity-70 group-hover:opacity-100 transition duration-300 z-10 cursor-pointer shadow-lg"
            aria-label="Next Item"
          >
            <FaChevronRight className="text-xl" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
            {bannerItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentImageIndex === index
                    ? "bg-amber-400 w-6"
                    : "bg-white/50 hover:bg-white"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 5. Featured Rooms Preview Section */}
      <div className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-black text-[#64031b]">
                Featured Rooms
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Handpicked rooms for your ultimate comfort
              </p>
            </div>
            <Link
              to="/rooms"
              className="text-[#64031b] font-bold hover:underline text-sm"
            >
              View All &rarr;
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-12 text-gray-500">
              Loading rooms...
            </div>
          ) : rooms.length === 0 ? (
            <div className="text-center py-12 text-gray-500 bg-white rounded-2xl border border-gray-200">
              No rooms available yet. Check back soon!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {rooms.slice(0, 3).map((room) => {
                const roomImage =
                  room.img && room.img.length > 0 ? room.img[0] : "/not-or.png";
                return (
                  <div
                    key={room._id}
                    className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-200 group"
                  >
                    <div className="relative h-48 overflow-hidden bg-gray-200">
                      <img
                        src={roomImage}
                        alt={room.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                      <span className="absolute top-3 right-3 bg-[#64031b] text-amber-400 text-xs font-bold px-3 py-1 rounded-full shadow">
                        ${room.price} / Night
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-xl text-gray-800 mb-2">
                        {room.name}
                      </h3>
                      <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                        {room.desc ||
                          "A spacious modern room equipped with premium amenities."}
                      </p>
                      <Link
                        to={`/rooms/${room._id}`}
                        className="block text-center w-full py-2.5 bg-[#64031b] text-white font-bold rounded-xl hover:bg-[#4d0214] transition text-sm"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* 6. Footer Banner / CTA */}
      <div className="bg-[#64031b] text-white py-14 px-4 text-center">
        <h2 className="text-3xl font-black mb-3">Ready to Experience LOLO?</h2>
        <p className="text-gray-300 text-sm max-w-xl mx-auto mb-6">
          Sign up or log in now to manage your bookings easily and get special
          offers.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/register"
            className="px-6 py-3 bg-amber-400 text-[#64031b] font-bold rounded-xl hover:bg-amber-600 transition shadow"
          >
            Get Started
          </Link>
         
          <Link
            to="/login"
            className="px-6 py-3 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-[#64031b] transition"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
