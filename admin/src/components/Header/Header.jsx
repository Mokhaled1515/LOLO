import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, reset } from "../../features/auth/authSlice";
import EditProfile from "../../pages/EditProfile/EditProfile";
import SavedAddress from "../../pages/SavedAddress/SavedAddress";
import BookingRecords from "../../pages/BookingRecords/BookingRecords";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    dispatch(logoutUser());
    dispatch(reset());
    setDropdownOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (dropdownOpen) {
        setDropdownOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dropdownOpen]);

  return (
    <>
      <header className="bg-[#64031b] text-white shadow-md sticky top-0 z-[100] border-b border-[#800423]">
        <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <h1 className="text-xl md:text-3xl font-extrabold tracking-wider text-amber-100 hover:text-white transition">
              LOLO
            </h1>
          </Link>

          <nav className="hidden lg:flex items-center space-x-6 space-x-reverse">
            {user && !user.isAdmin && (
              <>
                <Link
                  to="/rooms"
                  className="text-amber-100/90 hover:text-white font-medium transition px-3 py-2 rounded-lg hover:bg-white/10"
                >
                  Rooms
                </Link>

                <Link
                  to="/offers"
                  className="text-amber-100/90 hover:text-white font-medium transition px-3 py-2 rounded-lg hover:bg-white/10"
                >
                  Offers
                </Link>

                <button
                  onClick={() => setActiveModal("bookings")}
                  className="text-amber-100/90 hover:text-white font-medium transition px-3 py-2 rounded-lg hover:bg-white/10 cursor-pointer"
                >
                  Bookings
                </button>
              </>
            )}

            {user && user.isAdmin && (
              <>
                <Link
                  to="/dashboard"
                  className="text-amber-100/90 hover:text-white font-medium transition px-3 py-2 rounded-lg hover:bg-white/10"
                >
                  Dashboard
                </Link>
                <Link
                  to="/admin/add-room"
                  className="text-amber-100/90 hover:text-white font-medium transition px-3 py-2 rounded-lg hover:bg-white/10"
                >
                  Create Room
                </Link>
                <Link
                  to="/admin/offers"
                  className="text-amber-100/90 hover:text-white font-medium transition px-3 py-2 rounded-lg hover:bg-white/10"
                >
                  Manage Offers
                </Link>
              </>
            )}
          </nav>

          <div className="flex items-center space-x-3 space-x-reverse">
            {user && (
              <div className="relative inline-block text-left">
                <button
                  onClick={() => {
                    setDropdownOpen(!dropdownOpen);
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center focus:outline-none cursor-pointer rounded-full ring-2 ring-amber-400/50 hover:ring-amber-400 transition"
                >
                  <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-amber-900 text-amber-100 flex items-center justify-center font-bold overflow-hidden shadow-inner">
                    {user.profilePic ? (
                      <img
                        src={user.profilePic}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span>
                        {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                      </span>
                    )}
                  </div>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 left-auto mt-3 w-56 max-w-[calc(100vw-2rem)] rounded-xl shadow-2xl bg-[#fdfbf7] border border-[#e6dfd5] py-2 z-50 text-right text-gray-800 animate-fadeIn">
                    <div className="px-4 py-3 border-b border-[#e6dfd5] text-sm font-bold text-[#64031b] truncate">
                      {user.name}{" "}
                      {user.isAdmin && (
                        <span className="text-xs text-amber-700 block font-normal">
                          (Admin)
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => {
                        setActiveModal("edit");
                        setDropdownOpen(false);
                      }}
                      className="w-full text-right block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-[#f3ede2] cursor-pointer transition"
                    >
                      Edit Info
                    </button>

                    {user && !user.isAdmin && (
                      <button
                        onClick={() => {
                          setActiveModal("address");
                          setDropdownOpen(false);
                        }}
                        className="w-full text-right block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-[#f3ede2] cursor-pointer transition"
                      >
                        Saved Address
                      </button>
                    )}

                    <div className="border-t border-[#e6dfd5] my-1"></div>

                    <button
                      onClick={handleLogout}
                      className="w-full text-right block px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 cursor-pointer transition"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            {!user && (
              <div className="hidden md:flex items-center space-x-3 space-x-reverse">
                <Link
                  to="/login"
                  className="text-amber-100 hover:text-white font-medium px-4 py-2 rounded-lg hover:bg-white/10 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-amber-500 text-[#64031b] font-bold px-4 py-2 rounded-lg hover:bg-amber-400 transition shadow"
                >
                  Register
                </Link>
              </div>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                setDropdownOpen(false);
              }}
              className="relative z-[110] lg:hidden text-amber-100 hover:text-white p-2 focus:outline-none cursor-pointer"
              aria-label="Toggle Menu"
            >
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        <div
          className={`relative z-[105] lg:hidden bg-[#520216] border-t border-[#800423] px-6 overflow-hidden transition-all duration-300 ease-in-out shadow-xl ${
            mobileMenuOpen
              ? "max-h-[450px] py-4 opacity-100 translate-y-0"
              : "max-h-0 py-0 opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          <div className="space-y-3 text-right">
            {user && !user.isAdmin && (
              <>
                <Link
                  to="/rooms"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-amber-100/90 hover:text-white font-medium py-2 border-b border-white/5 transition"
                >
                  Rooms
                </Link>

                <Link
                  to="/offers"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-amber-100/90 hover:text-white font-medium py-2 border-b border-white/5 transition"
                >
                  Offers
                </Link>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setActiveModal("bookings");
                  }}
                  className="w-full text-right block text-amber-100/90 hover:text-white font-medium py-2 border-b border-white/5 transition cursor-pointer"
                >
                  Bookings
                </button>
              </>
            )}

            {user && user.isAdmin && (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-amber-100/90 hover:text-white font-medium py-2 border-b border-white/5 transition"
                >
                  Dashboard
                </Link>
                <Link
                  to="/admin/add-room"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-amber-100/90 hover:text-white font-medium py-2 border-b border-white/5 transition"
                >
                  Create Room
                </Link>
              </>
            )}

            {!user && (
              <div className="flex flex-col space-y-2 pt-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center text-amber-100 hover:text-white font-medium py-2 rounded-lg bg-white/5 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center bg-amber-500 text-[#64031b] font-bold py-2 rounded-lg transition"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {activeModal === "edit" && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-[150] p-4 overflow-y-auto">
          <div className="bg-[#fdfbf7] border border-[#d4af37]/40 rounded-2xl shadow-2xl max-w-md w-full p-6 relative animate-fadeIn my-auto">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 left-4 text-gray-400 hover:text-gray-700 text-xl font-bold cursor-pointer z-10"
            >
              ✕
            </button>
            <EditProfile onClose={() => setActiveModal(null)} />
          </div>
        </div>
      )}

      {activeModal === "address" && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-[150] p-4 overflow-y-auto">
          <div className="bg-[#fdfbf7] border border-[#d4af37]/40 rounded-2xl shadow-2xl max-w-lg w-full p-6 relative animate-fadeIn my-auto">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 left-4 text-gray-400 hover:text-gray-700 text-xl font-bold cursor-pointer z-10"
            >
              ✕
            </button>
            <SavedAddress onClose={() => setActiveModal(null)} />
          </div>
        </div>
      )}

      {activeModal === "bookings" && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-[150] p-4 overflow-y-auto">
          <div className="bg-[#fdfbf7] border border-[#d4af37]/40 rounded-2xl shadow-2xl max-w-lg w-full p-6 relative animate-fadeIn my-auto">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 left-4 text-gray-400 hover:text-gray-700 text-xl font-bold cursor-pointer z-10"
            >
              ✕
            </button>
            <BookingRecords onClose={() => setActiveModal(null)} />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
