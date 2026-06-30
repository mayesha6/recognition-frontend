export default function StatCard({ title, value, subtext, icon: Icon }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      <div className="flex justify-between items-start">
        <p className="text-gray-500 text-sm font-medium">{title}</p>
        <div className="p-2 bg-gray-50 rounded-lg"><Icon className="w-5 h-5 text-gray-400" /></div>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mt-2">{value}</h3>
      <p className="text-sm text-gray-400 mt-1">{subtext}</p>
    </div>
  );
}