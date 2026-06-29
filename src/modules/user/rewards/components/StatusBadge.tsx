export default function StatusBadge({ status }: { status: "Approved" | "Rejected" | "Pending" }) {
  const baseClasses = "px-3 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1.5";
  const variants = {
    Approved: "bg-green-50 text-green-700 border border-green-100",
    Rejected: "bg-red-50 text-red-700 border border-red-100",
    Pending: "bg-yellow-50 text-yellow-700 border border-yellow-100",
  };

  return (
    <span className={`${baseClasses} ${variants[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${status === 'Approved' ? 'bg-green-500' : status === 'Rejected' ? 'bg-red-500' : 'bg-yellow-500'}`} />
      {status}
    </span>
  );
}