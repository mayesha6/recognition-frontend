// "use client";
// import { X } from "lucide-react";

// export default function EditPointModal({ isOpen, onClose, userData, onSave }: any) {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 backdrop-blur-[1.5px] flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-xl">
//         <div className="flex justify-between items-center mb-6">
//           <h3 className="font-light text-xl">Distribute Points</h3>
//           <button onClick={onClose}><X size={20} /></button>
//         </div>

//         <div className="space-y-4">
//           <div>
//             <label className="text-sm text-gray-500">Name</label>
//             <input disabled value={userData?.name} className="w-full bg-gray-50 border rounded-lg px-3 py-2 mt-1 border-gray text-gray-400 font-light text-[14px]" />
//           </div>
//           <div>
//             <label className="text-sm text-gray-500">Department</label>
//             <input disabled value={userData?.department} className="w-full bg-gray-50 border rounded-lg px-3 py-2 mt-1 border-gray text-gray-400 font-light text-[14px]" />
//           </div>
//           <div>
//             <label className="text-sm text-gray-500">Email</label>
//             <input disabled value={userData?.email} className="w-full bg-gray-50 border rounded-lg px-3 py-2 mt-1 border-gray text-gray-400 font-light text-[14px]" />
//           </div>
//           <div>
//             <label className="text-sm text-gray-500">Points</label>
//             <input 
//               type="number"
//               defaultValue={userData?.point}
//               className="w-full border-2 border-indigo-500 rounded-lg px-3 py-2 mt-1 focus:outline-none"
//               onChange={(e) => userData.point = e.target.value}
//             />
//           </div>
//         </div>

//         <button 
//           onClick={() => onSave(userData)} 
//           className="w-full mt-6 bg-gradient text-white py-3 rounded-lg font-bold hover:bg-indigo-700"
//         >
//           Update Point
//         </button>
//       </div>
//     </div>
//   );
// }

"use client";
import { X } from "lucide-react";
import { useState } from "react";

export default function EditPointModal({
  isOpen,
  onClose,
  userData,
  onSave,
  type = "point" // ডিফল্ট 'point', প্রয়োজনে 'employee' পাঠাবেন
}: any) {
  if (!isOpen) return null;

  const isPointMode = type === "point";

  // স্ট্যাটাস হ্যান্ডল করার জন্য লোকাল স্টেট
  const [status, setStatus] = useState(userData?.status || "Active");

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-light text-xl">
            {isPointMode ? "Distribute Points" : "Employee Information"}
          </h3>
          <button onClick={onClose}><X size={20} /></button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-500">Name</label>
            <input disabled value={userData?.name} className="w-full bg-gray-50 border rounded-lg px-3 py-2 mt-1 border-gray text-gray-400 text-[14px]" />
          </div>
          <div>
            <label className="text-sm text-gray-500">Department</label>
            <input disabled value={userData?.department} className="w-full bg-gray-50 border rounded-lg px-3 py-2 mt-1 border-gray text-gray-400 text-[14px]" />
          </div>
          <div>
            <label className="text-sm text-gray-500">Email</label>
            <input disabled value={userData?.email} className="w-full bg-gray-50 border rounded-lg px-3 py-2 mt-1 border-gray text-gray-400 text-[14px]" />
          </div>

          {/* Status Input */}
          <div>
            <label className="text-sm text-gray-500">Status</label>
            <div className="relative w-full mt-1">
              <select
                disabled={isPointMode}
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className={`w-full appearance-none border rounded-lg pl-4 pr-10 py-2 focus:outline-none 
        ${isPointMode ? "bg-gray-50 text-gray-400 border-gray-200" : "border-indigo-500 text-gray-900"}
      `}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>

              {/* অ্যারো আইকন - এটি সবসময় ডানে ফিক্সড থাকবে */}
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>



          
            <div>
              <label className="text-sm text-gray-500">Points</label>
              <input
                type="number"
                defaultValue={userData?.point}
                className="w-full border-2 border-indigo-500 rounded-lg px-3 py-2 mt-1 focus:outline-none"
                onChange={(e) => userData.point = e.target.value}
              />
            </div>
          
        </div>

        <button
          onClick={() => onSave({ ...userData, status })}
          className="w-full mt-6 bg-gradient text-white py-3 rounded-lg font-bold hover:opacity-90"
        >
          {isPointMode ? "Update Point" : "Update Information"}
        </button>
      </div>
    </div>
  );
}