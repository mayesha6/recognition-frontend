export default function TopPerformers({ performers }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl border shadow-sm">
      <h3 className="font-bold mb-4">Top 5 Performers</h3>
      <div className="space-y-4">
        {performers.map((p: any, i: number) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
              {p.initials}
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold">{p.name}</p>
              <p className="text-xs text-gray-500">{p.dept} • {p.role}</p>
            </div>
            <span className="text-xs text-gray-400 font-medium">💬 {p.points}</span>
          </div>
        ))}
      </div>
    </div>
  );
}