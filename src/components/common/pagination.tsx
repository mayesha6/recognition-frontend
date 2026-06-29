// src/components/dashboard/Pagination.tsx

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  // সাধারণ বাটন স্টাইল
  const baseStyle = "px-4 py-2 rounded-lg transition-all duration-200 text-sm";
  
  // অ্যাক্টিভ বাটন স্টাইল
  const activeStyle = "bg-[#0B3C5D] text-white";
  
  // ইনঅ্যাক্টিভ বাটন স্টাইল (hover সহ)
  const inactiveStyle = "hover:bg-[#0B3C5D] hover:text-white text-gray-700";

  return (
    <div className="flex items-center gap-2">
      {/* Previous Button */}
      <button 
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${baseStyle} ${inactiveStyle} disabled:opacity-50`}
      >
        {"< Previous"}
      </button>

      {/* পেজ নাম্বার রেন্ডারিং */}
      {[1, 2, 3, 16].map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`${baseStyle} ${currentPage === page ? activeStyle : inactiveStyle}`}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button 
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${baseStyle} ${inactiveStyle} ${activeStyle} disabled:opacity-50`}
      >
        {"Next >"}
      </button>
    </div>
  );
}