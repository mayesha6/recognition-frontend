// src/components/dashboard/Pagination.tsx

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const baseStyle = "px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium";
  const activeStyle = "bg-[#0B3C5D] text-white font-semibold shadow-sm";
  const inactiveStyle = "hover:bg-[#0B3C5D] hover:text-white text-[#0B3C5D] font-medium";

  return (
    <div className="flex items-center gap-2">
      {/* Previous Button */}
      <button 
        type="button"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage <= 1}
        className={`${baseStyle} ${inactiveStyle} disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[#0B3C5D]`}
      >
        {"< Previous"}
      </button>

      {/* Show only current active page */}
      <span className={`${baseStyle} ${activeStyle} min-w-[40px] text-center`}>
        {currentPage}
      </span>

      {/* Next Button */}
      <button 
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage >= totalPages}
        className={`${baseStyle} ${inactiveStyle} disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[#0B3C5D]`}
      >
        {"Next >"}
      </button>
    </div>
  );
}