const Badge = ({ children, type, variant }: any) => {
  const styles: any = {
    // Priority Colors
    High: "bg-amber-50 text-amber-600",
    Urgent: "bg-red-50 text-red-600",
    Medium: "bg-teal-50 text-teal-600",
    Low: "bg-gray-100 text-gray-600",
    // Status Colors
    Resolved: "bg-emerald-50 text-emerald-600",
    Pending: "bg-yellow-50 text-yellow-600",
    Escalated: "bg-rose-50 text-rose-600",
    Open: "bg-indigo-50 text-indigo-600",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[children] || "bg-gray-100"}`}>
      {children}
    </span>
  );
};