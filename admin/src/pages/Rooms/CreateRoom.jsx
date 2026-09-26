// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { uploadImage } from "../../helper/utils";
// import { createRoom, reset } from "../../features/room/roomSlice";
// import { MdCloudUpload } from "react-icons/md";

// const CreateRoom = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);
//   const { isSuccess } = useSelector((state) => state.room);
  
//   const [files, setFiles] = useState([]);
//   const [formData, setFormData] = useState({
//     name: "",
//     type: "Single",
//     maxPeople: "1", // البدء بـ 1 ليتناسب مع Single افتراضياً
//     price: "",
//     desc: "",
//     roomsNumbers: "",
//   });
//   const { name, type, maxPeople, price, desc, roomsNumbers } = formData;

//   const [previewImages, setPreviewImages] = useState([]);
//   const [uploading, setUploading] = useState(false);

//   useEffect(() => {
//     if (!user || !user.isAdmin) {
//       navigate("/login");
//     }
//   }, [user]);

//   useEffect(() => {
//     if (isSuccess) {
//       dispatch(reset());
//       navigate("/rooms");
//     }
//   }, [isSuccess]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     // تحديث تلقائي للـ maxPeople عند تغيير الـ type
//     if (name === "type") {
//       let defaultCapacity = "1";
//       if (value === "Double") defaultCapacity = "2";
//       if (value === "Suite" || value === "Deluxe") defaultCapacity = "4";

//       setFormData((prevState) => ({
//         ...prevState,
//         type: value,
//         maxPeople: defaultCapacity,
//       }));
//     } else {
//       setFormData((prevState) => ({
//         ...prevState,
//         [name]: value,
//       }));
//     }
//   };

//   const handleFileChange = (e) => {
//     const filesArray = Array.from(e.target.files);
//     setFiles((prev) => [...prev, ...filesArray]);
//     const newPreviews = filesArray.map((file) => URL.createObjectURL(file));
//     setPreviewImages((prev) => [...prev, ...newPreviews]);
//   };

//   const handleRemoveImage = (indexToRemove) => {
//     setFiles((prevFiles) => prevFiles.filter((_, i) => i !== indexToRemove));
//     setPreviewImages((prevPreviews) => {
//       URL.revokeObjectURL(prevPreviews[indexToRemove]);
//       return prevPreviews.filter((_, i) => i !== indexToRemove);
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!name || !price || !roomsNumbers || files.length === 0) {
//       alert("Please fill all required fields and upload at least one image.");
//       return;
//     }

//     try {
//       setUploading(true);

//       const roomArray = roomsNumbers.split(",").map((item) => {
//         return {
//           number: parseInt(item.trim()),
//           unavailableDates: [],
//         };
//       });

//       let list = [];
//       list = await Promise.all(
//         Object.values(files).map(async (file) => {
//           const url = await uploadImage(file);
//           return url;
//         })
//       );

//       const dataToSubmit = {
//         name,
//         type,
//         maxPeople: Number(maxPeople),
//         price: Number(price),
//         desc,
//         roomsNumbers: roomArray,
//         img: list,
//       };

//       dispatch(createRoom(dataToSubmit));
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-10 px-4">
//       <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        
//         {/* Header Banner */}
//         <div className="bg-[#5A1827] py-6 px-8 text-center text-white">
//           <h2 className="text-2xl font-bold">Add New Hotel Room</h2>
//           <p className="text-sm text-gray-200 mt-1">Upload multiple images and fill room specs for Lavilla</p>
//         </div>

//         {/* Form Body */}
//         <form onSubmit={handleSubmit} className="p-8 space-y-5">
          
//           {/* Room Name */}
//           <div>
//             <label className="block mb-2 font-semibold text-gray-700 text-sm">Room Title</label>
//             <input
//               type="text"
//               name="name"
//               value={name}
//               placeholder="e.g. Deluxe Suite, Luxury Sea View"
//               onChange={handleChange}
//               className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#5A1827]"
//               required
//             />
//           </div>

//           {/* Row for Type and Max People */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//             <div>
//               <label className="block mb-2 font-semibold text-gray-700 text-sm">Room Type</label>
//               <select
//                 name="type"
//                 value={type}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#5A1827] bg-white"
//               >
//                 <option value="Single">Single</option>
//                 <option value="Double">Double</option>
//                 <option value="Suite">Suite</option>
//                 <option value="Deluxe">Deluxe</option>
//               </select>
//             </div>

//             <div>
//               <label className="block mb-2 font-semibold text-gray-700 text-sm">Max Guests (Capacity)</label>
//               <input
//                 type="number"
//                 name="maxPeople"
//                 value={maxPeople}
//                 min="1"
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#5A1827]"
//                 required
//               />
//             </div>
//           </div>

//           {/* Price */}
//           <div>
//             <label className="block mb-2 font-semibold text-gray-700 text-sm">Price per Night ($)</label>
//             <input
//               type="number"
//               name="price"
//               value={price}
//               placeholder="e.g. 2000"
//               onChange={handleChange}
//               className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#5A1827]"
//               required
//             />
//           </div>

//           {/* Description */}
//           <div>
//             <label className="block mb-2 font-semibold text-gray-700 text-sm">Description</label>
//             <textarea
//               name="desc"
//               onChange={handleChange}
//               value={desc}
//               placeholder="Describe room amenities, view..."
//               rows="3"
//               className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#5A1827] resize-vertical"
//             ></textarea>
//           </div>

//           {/* Room Numbers */}
//           <div>
//             <label className="block mb-2 font-semibold text-gray-700 text-sm">Room Numbers</label>
//             <textarea
//               name="roomsNumbers"
//               onChange={handleChange}
//               value={roomsNumbers}
//               placeholder="Enter separated by commas, eg: 707, 512, 684, 106"
//               rows="2"
//               className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#5A1827] resize-vertical"
//               required
//             ></textarea>
//           </div>

//           {/* Multiple Image Upload Box */}
//           <div>
//             <label className="block mb-2 font-semibold text-gray-700 text-sm">
//               Room Images ({previewImages.length} selected)
//             </label>
            
//             <label
//               htmlFor="file-upload"
//               className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-[#5A1827] rounded-lg bg-[#fdf8f9] cursor-pointer text-center hover:bg-[#f5ebee] transition"
//             >
//               <MdCloudUpload size={45} className="text-[#5A1827] mb-2" />
//               <span className="text-sm font-semibold text-[#5A1827]">Click to select multiple images</span>
//               <span className="text-xs text-gray-500 mt-1">You can select as many pictures as you want at once</span>
//             </label>

//             <input
//               id="file-upload"
//               type="file"
//               name="file"
//               onChange={handleFileChange}
//               multiple
//               className="hidden"
//             />
//           </div>

//           {/* Preview Gallery */}
//           {previewImages.length > 0 && (
//             <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
//               {previewImages.map((src, i) => (
//                 <div
//                   key={i}
//                   className="relative h-20 rounded-md overflow-hidden border border-gray-300 shadow-sm group"
//                 >
//                   <img
//                     src={src}
//                     alt={`preview-${i}`}
//                     className="w-full h-full object-cover"
//                   />
//                   <button
//                     type="button"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleRemoveImage(i);
//                     }}
//                     className="absolute top-1 right-1 bg-red-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold hover:bg-red-700 transition"
//                   >
//                     ✕
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={uploading}
//             className="w-full bg-[#5A1827] text-white py-3.5 rounded-lg font-semibold text-base hover:bg-[#47121e] transition duration-200 disabled:opacity-70 cursor-pointer"
//           >
//             {uploading ? "Publishing Room..." : "Publish Room"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// CreateRoom.displayName = "CreateRoom";

// export default CreateRoom;





import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { uploadImage } from "../../helper/utils";
import { createRoom, reset } from "../../features/room/roomSlice";
import { MdCloudUpload, MdAdd, MdDelete } from "react-icons/md";

const CreateRoom = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { isSuccess } = useSelector((state) => state.room);
  
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    type: "Single",
    maxPeople: "1",
    price: "",
    desc: "",
    roomsNumbers: "",
  });
  const { name, type, maxPeople, price, desc, roomsNumbers } = formData;

  // حقول ديناميكية مخصصة (Custom Fields: Key & Value)
  const [customFields, setCustomFields] = useState([{ key: "", value: "" }]);

  const [previewImages, setPreviewImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate("/login");
    }
  }, [user]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
      navigate("/rooms");
    }
  }, [isSuccess]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "type") {
      let defaultCapacity = "1";
      if (value === "Double") defaultCapacity = "2";
      if (value === "Suite" || value === "Deluxe") defaultCapacity = "4";

      setFormData((prevState) => ({
        ...prevState,
        type: value,
        maxPeople: defaultCapacity,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  // دوال التحكم في الحقول المخصصة الديناميكية (Add / Update / Remove)
  const handleCustomFieldChange = (index, fieldName, fieldValue) => {
    const updatedFields = [...customFields];
    updatedFields[index][fieldName] = fieldValue;
    setCustomFields(updatedFields);
  };

  const handleAddCustomField = () => {
    setCustomFields((prev) => [...prev, { key: "", value: "" }]);
  };

  const handleRemoveCustomField = (index) => {
    const updatedFields = customFields.filter((_, i) => i !== index);
    setCustomFields(updatedFields.length > 0 ? updatedFields : [{ key: "", value: "" }]);
  };

  const handleFileChange = (e) => {
    const filesArray = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...filesArray]);
    const newPreviews = filesArray.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...newPreviews]);
  };

  const handleRemoveImage = (indexToRemove) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== indexToRemove));
    setPreviewImages((prevPreviews) => {
      URL.revokeObjectURL(prevPreviews[indexToRemove]);
      return prevPreviews.filter((_, i) => i !== indexToRemove);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price || !roomsNumbers || files.length === 0) {
      alert("Please fill all required fields, room numbers, and upload at least one image.");
      return;
    }

    try {
      setUploading(true);

      const roomArray = roomsNumbers.split(",").map((item) => {
        return {
          number: parseInt(item.trim()),
          unavailableDates: [],
        };
      });

      // تحويل الحقول المخصصة إلى كائن (Object) لو حابب تبعتهم مع الداتا
      const extraAttributes = {};
      customFields.forEach((item) => {
        if (item.key.trim() !== "") {
          extraAttributes[item.key.trim()] = item.value.trim();
        }
      });

      let list = [];
      list = await Promise.all(
        Object.values(files).map(async (file) => {
          const url = await uploadImage(file);
          return url;
        })
      );

      const dataToSubmit = {
        name,
        type,
        maxPeople: Number(maxPeople),
        price: Number(price),
        desc,
        roomsNumbers: roomArray,
        img: list,
        ...extraAttributes, // دمج الحقول الإضافية مع بيانات الغرفة المرسلة للباك اند
      };

      dispatch(createRoom(dataToSubmit));
    } catch (error) {
      console.log(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        
        {/* Header Banner */}
        <div className="bg-[#5A1827] py-6 px-8 text-center text-white">
          <h2 className="text-2xl font-bold">Add New Hotel Room</h2>
          <p className="text-sm text-gray-200 mt-1">Upload images and manage custom fields dynamically</p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          
          {/* Room Name */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700 text-sm">Room Title</label>
            <input
              type="text"
              name="name"
              value={name}
              placeholder="e.g. Deluxe Suite, Luxury Sea View"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#5A1827]"
              required
            />
          </div>

          {/* Row for Type and Max People */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block mb-2 font-semibold text-gray-700 text-sm">Room Type</label>
              <select
                name="type"
                value={type}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#5A1827] bg-white"
              >
                <option value="Single">Single</option>
                <option value="Double">Double</option>
                <option value="Suite">Suite</option>
                <option value="Deluxe">Deluxe</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700 text-sm">Max Guests (Capacity)</label>
              <input
                type="number"
                name="maxPeople"
                value={maxPeople}
                min="1"
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#5A1827]"
                required
              />
            </div>
          </div>

          {/* Price */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700 text-sm">Price per Night ($)</label>
            <input
              type="number"
              name="price"
              value={price}
              placeholder="e.g. 2000"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#5A1827]"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700 text-sm">Description</label>
            <textarea
              name="desc"
              onChange={handleChange}
              value={desc}
              placeholder="Describe room amenities, view..."
              rows="3"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#5A1827] resize-vertical"
            ></textarea>
          </div>

          {/* Room Numbers */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700 text-sm">Room Numbers</label>
            <textarea
              name="roomsNumbers"
              onChange={handleChange}
              value={roomsNumbers}
              placeholder="Enter separated by commas, eg: 707, 512, 684, 106"
              rows="2"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#5A1827] resize-vertical"
              required
            ></textarea>
          </div>

          {/* Dynamic Custom Fields (Key & Value) */}
          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between items-center mb-3">
              <label className="font-semibold text-gray-700 text-sm">Custom Attributes / Fields</label>
              <button
                type="button"
                onClick={handleAddCustomField}
                className="flex items-center gap-1 text-xs bg-[#5A1827] text-white px-3 py-1.5 rounded-md hover:bg-[#47121e] transition cursor-pointer"
              >
                <MdAdd size={16} /> Add Field
              </button>
            </div>

            <div className="space-y-3">
              {customFields.map((field, index) => (
                <div key={index} className="flex items-center gap-3">
                  <input
                    type="text"
                    placeholder="Field Name (e.g. View)"
                    value={field.key}
                    onChange={(e) => handleCustomFieldChange(index, "key", e.target.value)}
                    className="w-1/2 px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#5A1827]"
                  />
                  <input
                    type="text"
                    placeholder="Field Value (e.g. Sea View)"
                    value={field.value}
                    onChange={(e) => handleCustomFieldChange(index, "value", e.target.value)}
                    className="w-1/2 px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#5A1827]"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveCustomField(index)}
                    className="bg-red-100 text-red-600 p-2.5 rounded-lg hover:bg-red-200 transition cursor-pointer shrink-0"
                    title="Remove Field"
                  >
                    <MdDelete size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Multiple Image Upload Box */}
          <div className="border-t border-gray-200 pt-4">
            <label className="block mb-2 font-semibold text-gray-700 text-sm">
              Room Images ({previewImages.length} selected)
            </label>
            
            <label
              htmlFor="file-upload"
              className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-[#5A1827] rounded-lg bg-[#fdf8f9] cursor-pointer text-center hover:bg-[#f5ebee] transition"
            >
              <MdCloudUpload size={45} className="text-[#5A1827] mb-2" />
              <span className="text-sm font-semibold text-[#5A1827]">Click to select multiple images</span>
              <span className="text-xs text-gray-500 mt-1">You can select as many pictures as you want at once</span>
            </label>

            <input
              id="file-upload"
              type="file"
              name="file"
              onChange={handleFileChange}
              multiple
              className="hidden"
            />
          </div>

          {/* Preview Gallery */}
          {previewImages.length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {previewImages.map((src, i) => (
                <div
                  key={i}
                  className="relative h-20 rounded-md overflow-hidden border border-gray-300 shadow-sm group"
                >
                  <img
                    src={src}
                    alt={`preview-${i}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveImage(i);
                    }}
                    className="absolute top-1 right-1 bg-red-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold hover:bg-red-700 transition"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={uploading}
            className="w-full bg-[#5A1827] text-white py-3.5 rounded-lg font-semibold text-base hover:bg-[#47121e] transition duration-200 disabled:opacity-70 cursor-pointer"
          >
            {uploading ? "Publishing Room..." : "Publish Room"}
          </button>
        </form>
      </div>
    </div>
  );
};

CreateRoom.displayName = "CreateRoom";

export default CreateRoom;