import { Search, Bell } from "lucide-react";
import Image from "next/image";
import logo from "@/assets/images/logo.png";

export default function Header() {
  return (
    <header className="h-20 bg-white border-b border-b-gray flex items-center justify-between px-8 py-3">
      {/* লোগো সেকশন */}
      <div className="flex items-center">
        <Image 
          src={logo} 
          alt="Greetely Logo" 
          width={112} 
          height={56} 
          priority 
        />
      </div>

      {/* সার্চবার এবং প্রোফাইল */}
      <div className="flex items-center gap-6">
        <div className="flex justify-center w-96 h-12 items-center  border rounded-[10px] border-gradient px-4 py-3 gap-2">
          <Search className=" text-gray-400 w-4 h-4" />
          <input 
            className="w-full  focus:outline-none" 
            placeholder="Search Departments, users, tickets..." 
          />
        </div>
        <Bell className="w-6 h-6 text-gray-500 cursor-pointer" />
        {/* <div className="w-0.5 h-6 bg-gray-300"></div> */}
        <div className="flex items-center gap-2 border-l border-l-0.5 pl-4 border-l-gray">
          <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs">AS</div>
          <p className="text-sm font-bold">Aisha Sharma <span className="block text-xs font-normal text-gray-500">Department Admin</span></p>
        </div>
      </div>
    </header>
  );
}