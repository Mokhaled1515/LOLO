// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import { updateRoom, reset } from "../../features/room/roomSlice";

// import { MdAdd } from "react-icons/md";

// const API_URL = import.meta.env.VITE_API_URL;
// const EditRoom = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { isSuccess, isLoading } = useSelector((state) => state.room);
//   const { id } = useParams();
//   const [customFields, setCustomFields] = useState([]);

//   const [formData, setFormData] = useState({
//     name: "",
//     type: "Single",
//     maxPeople: "1",
//     price: "",
//     desc: "",
//     roomsNumbers: "",
//   });

//   const handleAddCustomField = () => {
//     setCustomFields((prev) => [...prev, { key: "", value: "" }]);
//   };

//   const { name, type, maxPeople, price, desc, roomsNumbers } = formData;

//   useEffect(() => {
//     const getRoom = async () => {
//       try {
//         const res = await fetch(`${API_URL}/api/rooms/${id}`);
//         const data = await res.json();

//         const { roomsNumbers, ...rest } = data;
//         const roomMap = roomsNumbers
//           ? roomsNumbers.map((item) => item.number)
//           : [];
//         const roomString = roomMap.join(", ");

//         setFormData({
//           ...rest,
//           roomsNumbers: roomString,
//         });
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getRoom();
//   }, [id]);

//   useEffect(() => {
//     if (isSuccess) {
//       dispatch(reset());
//       navigate("/rooms");
//     }
//   }, [isSuccess, dispatch, navigate]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "type") {
//       let defaultCapacity = "1";
//       if (value === "Double") defaultCapacity = "2";
//       if (value === "Suite" || value === "Deluxe") defaultCapacity = "4";

//       setFormData((prev) => ({
//         ...prev,
//         type: value,
//         maxPeople: defaultCapacity,
//       }));
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!name || !price || !roomsNumbers) {
//       alert("Please fill in all required fields.");
//       return;
//     }

//     const roomArray = roomsNumbers.split(",").map((item) => {
//       return {
//         number: parseInt(item.trim()),
//         unavailableDates: [],
//       };
//     });

//     const dataToSubmit = {
//       name,
//       type,
//       maxPeople: Number(maxPeople),
//       price: Number(price),
//       desc,
//       roomsNumbers: roomArray,
//       roomId: id,
//     };

//     dispatch(updateRoom(dataToSubmit));
//   };

//   return (
//     <div className="min-h-screen bg-[#fdfbf7] py-12 px-4">
//       <div className="max-w-xl mx-auto">
//         <button
//           onClick={() => navigate("/rooms")}
//           className="text-[#64031b] font-bold text-sm mb-5 flex items-center gap-2 hover:underline cursor-pointer"
//         >
//           ← Back to Rooms
//         </button>

//         <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#e6dfd5]">
//           <h1 className="text-2xl font-extrabold text-[#64031b] text-center mb-8">
//             Edit Room Details
//           </h1>

//           <form onSubmit={handleSubmit} className="flex flex-col gap-5">
//             <div className="flex flex-col gap-2">
//               <label className="text-sm font-bold text-gray-700">
//                 Room Name
//               </label>
//               <input
//                 type="text"
//                 name="name"
//                 value={name}
//                 placeholder="Enter room name"
//                 onChange={handleChange}
//                 className="p-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#64031b] bg-gray-50"
//               />
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div className="flex flex-col gap-2">
//                 <label className="text-sm font-bold text-gray-700">
//                   Room Type
//                 </label>
//                 <select
//                   name="type"
//                   value={type}
//                   onChange={handleChange}
//                   className="p-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#64031b] bg-gray-50"
//                 >
//                   <option value="Single">Single</option>
//                   <option value="Double">Double</option>
//                   <option value="Suite">Suite</option>
//                   <option value="Deluxe">Deluxe</option>
//                 </select>
//               </div>

//               <div className="flex flex-col gap-2">
//                 <label className="text-sm font-bold text-gray-700">
//                   Max Guests
//                 </label>
//                 <input
//                   type="number"
//                   name="maxPeople"
//                   value={
//                     maxPeople !== undefined && maxPeople !== null
//                       ? maxPeople
//                       : ""
//                   }
//                   min="1"
//                   onChange={handleChange}
//                   className="p-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#64031b] bg-gray-50"
//                 />
//               </div>
//             </div>

//             <div className="flex flex-col gap-2">
//               <label className="text-sm font-bold text-gray-700">
//                 Price ($)
//               </label>
//               <input
//                 type="number"
//                 name="price"
//                 value={price}
//                 placeholder="Enter room price"
//                 onChange={handleChange}
//                 className="p-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#64031b] bg-gray-50"
//               />
//             </div>

//             <div className="flex flex-col gap-2">
//               <label className="text-sm font-bold text-gray-700">
//                 Description
//               </label>
//               <textarea
//                 name="desc"
//                 rows="4"
//                 onChange={handleChange}
//                 value={desc}
//                 placeholder="Enter a brief description..."
//                 className="p-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#64031b] bg-gray-50 resize-vertical"
//               ></textarea>
//             </div>

//             <div className="flex flex-col gap-2">
//               <label className="text-sm font-bold text-gray-700">
//                 Room Numbers
//               </label>
//               <textarea
//                 name="roomsNumbers"
//                 rows="3"
//                 onChange={handleChange}
//                 value={roomsNumbers}
//                 placeholder="e.g. 202, 203, 204, 400"
//                 className="p-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#64031b] bg-gray-50 resize-vertical"
//               ></textarea>
//               <span className="text-xs text-gray-400">
//                 Separate numbers using commas.
//               </span>
//             </div>

//             <div className="border-t border-gray-200 pt-4 flex flex-col gap-3">
//               <div className="flex justify-between items-center mb-1">
//                 <label className="font-semibold text-gray-700 text-sm">
//                   Custom Attributes / Fields
//                 </label>
//                 <button
//                   type="button"
//                   onClick={handleAddCustomField}
//                   className="flex items-center gap-1 text-xs bg-[#5A1827] text-white px-3 py-1.5 rounded-md hover:bg-[#47121e] transition cursor-pointer"
//                 >
//                   <MdAdd size={16} /> Add Field
//                 </button>
//               </div>

//               {customFields.map((field, index) => (
//                 <div key={index} className="flex gap-2 items-center">
//                   <input
//                     type="text"
//                     placeholder="Key (e.g. View)"
//                     value={field.key}
//                     onChange={(e) => {
//                       const newFields = [...customFields];
//                       newFields[index].key = e.target.value;
//                       setCustomFields(newFields);
//                     }}
//                     className="p-2.5 flex-1 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#64031b] bg-gray-50"
//                   />
//                   <input
//                     type="text"
//                     placeholder="Value (e.g. Sea View)"
//                     value={field.value}
//                     onChange={(e) => {
//                       const newFields = [...customFields];
//                       newFields[index].value = e.target.value;
//                       setCustomFields(newFields);
//                     }}
//                     className="p-2.5 flex-1 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#64031b] bg-gray-50"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => {
//                       const newFields = customFields.filter(
//                         (_, i) => i !== index,
//                       );
//                       setCustomFields(newFields);
//                     }}
//                     className="text-red-500 hover:text-red-700 font-bold px-2 py-1 text-sm cursor-pointer"
//                     title="Remove field"
//                   >
//                     ✕
//                   </button>
//                 </div>
//               ))}
//             </div>
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="bg-[#64031b] text-white py-3.5 rounded-lg font-bold text-base hover:bg-[#500216] transition shadow-md mt-2 cursor-pointer disabled:opacity-70"
//             >
//               {isLoading ? "Saving Changes..." : "Update Room"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// EditRoom.defaultName = "EditRoom";

// export default EditRoom;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateRoom, reset } from "../../features/room/roomSlice";
import { MdAdd } from "react-icons/md";

const API_URL = import.meta.env.VITE_API_URL;

const EditRoom = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSuccess, isLoading } = useSelector((state) => state.room);
  const { id } = useParams();

  const [customFields, setCustomFields] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    type: "Single",
    maxPeople: "1",
    price: "",
    desc: "",
    roomsNumbers: "",
  });

  const { name, type, maxPeople, price, desc, roomsNumbers } = formData;

  // ================= ADD CUSTOM FIELD =================
  const handleAddCustomField = () => {
    setCustomFields((prev) => [...prev, { key: "", value: "" }]);
  };

  // ================= GET ROOM =================
  useEffect(() => {
    const getRoom = async () => {
      try {
        const res = await fetch(`${API_URL}/api/rooms/${id}`);
        const data = await res.json();

        const { roomsNumbers, ...rest } = data;

        const roomMap = roomsNumbers
          ? roomsNumbers.map((item) => item.number)
          : [];

        const roomString = roomMap.join(", ");

        setFormData({
          ...rest,
          roomsNumbers: roomString,
        });
      } catch (error) {
        console.log(error);
      }
    };

    getRoom();
  }, [id]);

  // ================= SUCCESS =================
  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
      navigate("/rooms");
    }
  }, [isSuccess, dispatch, navigate]);

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "type") {
      let defaultCapacity = "1";

      if (value === "Double") defaultCapacity = "2";
      if (value === "Suite" || value === "Deluxe") {
        defaultCapacity = "4";
      }

      setFormData((prev) => ({
        ...prev,
        type: value,
        maxPeople: defaultCapacity,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // ================= UPDATE CUSTOM FIELD =================
  const handleCustomFieldChange = (index, field, value) => {
    setCustomFields((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              [field]: value,
            }
          : item,
      ),
    );
  };

  // ================= REMOVE CUSTOM FIELD =================
  const handleRemoveCustomField = (index) => {
    setCustomFields((prev) => prev.filter((_, i) => i !== index));
  };

  // ================= SUBMIT =================
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !price || !roomsNumbers) {
      alert("Please fill in all required fields.");
      return;
    }

    const roomArray = roomsNumbers.split(",").map((item) => ({
      number: parseInt(item.trim()),
      unavailableDates: [],
    }));

    const dataToSubmit = {
      name,
      type,
      maxPeople: Number(maxPeople),
      price: Number(price),
      desc,
      roomsNumbers: roomArray,
      roomId: id,
    };

    dispatch(updateRoom(dataToSubmit));
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7] py-6 px-3 min-[500px]:py-12 min-[500px]:px-4">
      <div className="w-full max-w-xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/rooms")}
          className="text-[#64031b] font-bold text-sm mb-5 flex items-center gap-2 hover:underline cursor-pointer"
        >
          ← Back to Rooms
        </button>

        {/* Card */}
        <div className="w-full bg-white p-4 min-[500px]:p-8 rounded-2xl shadow-sm border border-[#e6dfd5] overflow-hidden">
          <h1 className="text-xl min-[500px]:text-2xl font-extrabold text-[#64031b] text-center mb-6 min-[500px]:mb-8">
            Edit Room Details
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Room Name */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-700">
                Room Name
              </label>

              <input
                type="text"
                name="name"
                value={name}
                placeholder="Enter room name"
                onChange={handleChange}
                className="w-full min-w-0 p-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#64031b] bg-gray-50"
              />
            </div>

            {/* Room Type + Max Guests */}
            <div className="grid grid-cols-1 min-[500px]:grid-cols-2 gap-4">
              {/* Room Type */}
              <div className="flex flex-col gap-2 min-w-0">
                <label className="text-sm font-bold text-gray-700">
                  Room Type
                </label>

                <select
                  name="type"
                  value={type}
                  onChange={handleChange}
                  className="w-full min-w-0 p-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#64031b] bg-gray-50"
                >
                  <option value="Single">Single</option>
                  <option value="Double">Double</option>
                  <option value="Suite">Suite</option>
                  <option value="Deluxe">Deluxe</option>
                </select>
              </div>

              {/* Max Guests */}
              <div className="flex flex-col gap-2 min-w-0">
                <label className="text-sm font-bold text-gray-700">
                  Max Guests
                </label>

                <input
                  type="number"
                  name="maxPeople"
                  value={
                    maxPeople !== undefined && maxPeople !== null
                      ? maxPeople
                      : ""
                  }
                  min="1"
                  onChange={handleChange}
                  className="w-full min-w-0 p-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#64031b] bg-gray-50"
                />
              </div>
            </div>

            {/* Price */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-700">
                Price ($)
              </label>

              <input
                type="number"
                name="price"
                value={price}
                placeholder="Enter room price"
                onChange={handleChange}
                className="w-full min-w-0 p-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#64031b] bg-gray-50"
              />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-700">
                Description
              </label>

              <textarea
                name="desc"
                rows="4"
                onChange={handleChange}
                value={desc}
                placeholder="Enter a brief description..."
                className="w-full min-w-0 p-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#64031b] bg-gray-50 resize-y"
              />
            </div>

            {/* Room Numbers */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-700">
                Room Numbers
              </label>

              <textarea
                name="roomsNumbers"
                rows="3"
                onChange={handleChange}
                value={roomsNumbers}
                placeholder="e.g. 202, 203, 204, 400"
                className="w-full min-w-0 p-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#64031b] bg-gray-50 resize-y"
              />

              <span className="text-xs text-gray-400">
                Separate numbers using commas.
              </span>
            </div>

            {/* ================= CUSTOM FIELDS ================= */}
            <div className="border-t border-gray-200 pt-4 flex flex-col gap-3 overflow-hidden">
              {/* Header */}
              <div className="flex flex-col min-[500px]:flex-row min-[500px]:items-center min-[500px]:justify-between gap-3 mb-1">
                <label className="font-semibold text-gray-700 text-sm">
                  Custom Attributes / Fields
                </label>

                <button
                  type="button"
                  onClick={handleAddCustomField}
                  className="w-full min-[500px]:w-auto flex items-center justify-center gap-1 text-xs bg-[#5A1827] text-white px-3 py-2 min-[500px]:py-1.5 rounded-md hover:bg-[#47121e] transition cursor-pointer whitespace-nowrap"
                >
                  <MdAdd size={16} />
                  Add Field
                </button>
              </div>

              {/* Custom Fields */}
              {customFields.map((field, index) => (
                <div
                  key={index}
                  className="
                    w-full
                    min-w-0
                    flex
                    flex-col
                    min-[500px]:flex-row
                    gap-2
                    items-stretch
                    min-[500px]:items-center
                    bg-gray-50
                    p-2
                    rounded-lg
                    border
                    border-gray-200
                  "
                >
                  {/* Key */}
                  <input
                    type="text"
                    placeholder="Key (e.g. View)"
                    value={field.key}
                    onChange={(e) =>
                      handleCustomFieldChange(index, "key", e.target.value)
                    }
                    className="
                      w-full
                      min-w-0
                      min-[500px]:flex-1
                      p-2.5
                      rounded-lg
                      border
                      border-gray-300
                      text-sm
                      focus:outline-none
                      focus:ring-2
                      focus:ring-[#64031b]
                      bg-white
                    "
                  />

                  {/* Value */}
                  <input
                    type="text"
                    placeholder="Value (e.g. Sea View)"
                    value={field.value}
                    onChange={(e) =>
                      handleCustomFieldChange(index, "value", e.target.value)
                    }
                    className="
                      w-full
                      min-w-0
                      min-[500px]:flex-1
                      p-2.5
                      rounded-lg
                      border
                      border-gray-300
                      text-sm
                      focus:outline-none
                      focus:ring-2
                      focus:ring-[#64031b]
                      bg-white
                    "
                  />

                  {/* Remove */}
                  <button
                    type="button"
                    onClick={() => handleRemoveCustomField(index)}
                    className="
                      self-end
                      min-[500px]:self-auto
                      shrink-0
                      text-red-500
                      hover:text-red-700
                      font-bold
                      px-2
                      py-1
                      text-sm
                      cursor-pointer
                    "
                    title="Remove field"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#64031b] text-white py-3.5 rounded-lg font-bold text-base hover:bg-[#500216] transition shadow-md mt-2 cursor-pointer disabled:opacity-70"
            >
              {isLoading ? "Saving Changes..." : "Update Room"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

EditRoom.defaultName = "EditRoom";

export default EditRoom;
