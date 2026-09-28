
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserProfile } from "../../features/auth/authSlice";
import { toast } from "react-toastify";

const EditProfile = ({ onClose }) => {
  const { user, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [name, setName] = useState(user?.name || "");
  const [nationality, setNationality] = useState(user?.nationality || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [profilePic, setProfilePic] = useState(user?.profilePic || "");
  const [previewPic, setPreviewPic] = useState(user?.profilePic || "");

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setNationality(user.nationality || "");
      setPhone(user.phone || "");
      setProfilePic(user.profilePic || "");
      setPreviewPic(user.profilePic || "");
    }
  }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
        setPreviewPic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { name, nationality, phone, profilePic };
    dispatch(updateUserProfile(userData)).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        toast.success("Profile updated successfully!");
        if (onClose) onClose();
      }
    });
  };

  return (
    <div className="w-full flex flex-col h-full max-h-[85vh] overflow-y-auto px-2 sm:px-4 py-2 relative">
      <div className="w-full flex items-center justify-between border-b border-gray-200 pb-3 mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-[#64031b]">
          Edit Profile
        </h2>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 p-1.5 rounded-full transition flex items-center justify-center w-8 h-8 cursor-pointer"
            aria-label="Close"
          >
            ✕
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 w-full">
        <div className="flex flex-col items-center justify-center my-1">
          <label
            htmlFor="profileImageInput"
            className="cursor-pointer group relative"
          >
            <div className="w-20 h-20 rounded-full bg-amber-900 text-amber-100 flex items-center justify-center font-bold text-2xl overflow-hidden shadow border-2 border-[#64031b]">
              {previewPic ? (
                <img
                  src={previewPic}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>{name ? name.charAt(0).toUpperCase() : "U"}</span>
              )}
            </div>
            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition text-white text-xs font-semibold">
              Change
            </div>
          </label>
          <input
            type="file"
            id="profileImageInput"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          <span className="text-[11px] text-gray-500 mt-1">
            Click image to upload new photo
          </span>
        </div>

        <div className="w-full">
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#64031b] text-sm bg-gray-50"
            required
          />
        </div>

        <div className="w-full">
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Nationality
          </label>
          <input
            type="text"
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
            placeholder="e.g. Egyptian"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#64031b] text-sm bg-gray-50"
          />
        </div>

        <div className="w-full">
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#64031b] text-sm bg-gray-50"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2.5 mt-2 bg-[#64031b] text-white font-bold rounded-lg hover:bg-[#4d0214] transition shadow text-sm cursor-pointer disabled:opacity-50"
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
