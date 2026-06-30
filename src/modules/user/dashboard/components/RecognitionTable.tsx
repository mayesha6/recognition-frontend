
// import { Avatar, AvatarFallback } from "@/components/ui/avatar"; // shadcn ui ব্যবহার করলে

export default function RecognitionTable({ title, data }: { title: string, data: any[] }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray shadow-sm mt-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <button className="text-sm text-indigo-600 font-medium">See All</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-400 text-xs uppercase tracking-wider border-b border-gray">
              <th className="pb-4 font-medium">Recipient</th>
              <th className="pb-4 font-medium">Email</th>
              <th className="pb-4 font-medium">Value</th>
              <th className="pb-4 font-medium">Category</th>
              <th className="pb-4 font-medium">Points</th>
              <th className="pb-4 font-medium">Date & Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray">
            {data.map((item, index) => (
              <tr key={index} className="text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                <td className="py-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs">
                    {item.initials}
                  </div>
                  {item.name}
                </td>
                <td className="py-4">{item.email}</td>
                <td className="py-4">{item.value}</td>
                <td className="py-4">{item.category}</td>
                <td className="py-4 font-semibold text-gray-900">{item.points}</td>
                <td className="py-4 text-gray-400">{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}