export const CategoryBar = ({ label, percentage, color }: any) => (
  <div className="mb-4">
    <div className="flex justify-between text-sm mb-1">
      <span>{label}</span>
      <span className="font-semibold">{percentage}%</span>
    </div>
    <div className="h-2 w-full bg-gray-100 rounded-full">
      <div className="h-full rounded-full" style={{ width: `${percentage}%`, backgroundColor: color }} />
    </div>
  </div>
);