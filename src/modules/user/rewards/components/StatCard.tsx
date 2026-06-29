// src/components/dashboard/StatCard.tsx
export default function StatCard({ title, count, icon, extra }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      <div className="flex justify-between items-start">
        <p className="text-gray-500 text-sm font-medium">{title}</p>
        <div className="text-gray-400">{icon}</div>
      </div>
      <h3 className="text-3xl font-bold mt-2">{count}</h3>
      {extra && <p className="text-green-600 text-sm font-medium mt-1">{extra}</p>}
    </div>
  );
}