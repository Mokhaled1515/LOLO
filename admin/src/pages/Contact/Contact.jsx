import React, { useState } from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
} from "react-icons/fa";
import { toast } from "react-toastify";
const API_URL = import.meta.env.VITE_API_URL;
const RESORT_LOCATION = import.meta.env.VITE_RESORT_LOCATION;
const RESORT_PHONE = import.meta.env.VITE_RESORT_PHONE;
const RESORT_EMAIL = import.meta.env.VITE_RESORT_EMAIL;
const RESORT_HOURS = import.meta.env.VITE_RESORT_HOURS;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      // استخدام fetch العادي لإرسال البيانات للـ Backend
      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Your message has been sent successfully!");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        toast.error(
          data.message || "Failed to send message. Please try again.",
        );
      }
    } catch (error) {
      console.error(error);
      toast.error("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7] py-10 sm:py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#64031b]/5 rounded-full blur-3xl pointer-events-none -ml-12 -mt-12" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#e6dfd5]/40 rounded-full blur-3xl pointer-events-none -mr-12 -mb-12" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#64031b] bg-[#64031b]/10 px-3.5 py-1.5 rounded-full inline-block">
            Get In Touch
          </span>

          <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black text-[#64031b] tracking-wide">
            Contact Us
          </h1>

          <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed px-2">
            Have a question about your stay or one of our offers? We&apos;re
            here to help you plan your perfect experience.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-5 bg-white border border-[#e6dfd5] rounded-3xl shadow-sm p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-black text-[#64031b] mb-6">
              Let&apos;s Talk
            </h2>

            <div className="space-y-5">
              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-11 h-11 rounded-xl bg-[#64031b]/10 text-[#64031b] flex items-center justify-center">
                  <FaMapMarkerAlt />
                </div>

                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-gray-800">
                    {RESORT_LOCATION}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 leading-relaxed break-words">
                    -
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-11 h-11 rounded-xl bg-[#64031b]/10 text-[#64031b] flex items-center justify-center">
                  <FaPhoneAlt />
                </div>

                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-gray-800">
                    {RESORT_PHONE}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 break-all">
                    +20 100 000 0000
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-11 h-11 rounded-xl bg-[#64031b]/10 text-[#64031b] flex items-center justify-center">
                  <FaEnvelope />
                </div>

                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-gray-800">
                    {RESORT_EMAIL}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 break-all">
                    info@lavilla.com
                  </p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-11 h-11 rounded-xl bg-[#64031b]/10 text-[#64031b] flex items-center justify-center">
                  <FaClock />
                </div>

                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-gray-800">
                    Working Hours
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                    {RESORT_HOURS}
                  </p>
                </div>
              </div>
            </div>

            {/* Small Note */}
            <div className="mt-8 pt-6 border-t border-[#e6dfd5]">
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                Our team is always ready to assist you with reservations,
                offers, and any questions about your stay.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white border border-[#e6dfd5] rounded-3xl shadow-sm p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-black text-[#64031b] mb-6">
              Send Us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#64031b] text-sm bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#64031b] text-sm bg-gray-50"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Subject
                </label>

                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#64031b] text-sm bg-gray-50"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Message
                </label>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  rows="6"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#64031b] text-sm bg-gray-50 resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-[#64031b] text-white font-bold text-sm rounded-xl hover:bg-[#4d0214] transition shadow-md cursor-pointer disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
