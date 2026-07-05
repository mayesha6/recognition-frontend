import { Coins } from "lucide-react";

export const topPerformersData = [
  {
    initials: "MC",
    name: "Maya Chen",
    dept: "Engineering",
    role: "Top Giver",
    points: 1240
  },
  {
    initials: "JR",
    name: "Jordan Reyes",
    dept: "Engineering",
    role: "Most Recognized",
    points: 1240
  },
  {
    initials: "AL",
    name: "Alice Lee",
    dept: "Marketing",
    role: "Rising Star",
    points: 1240
  },
  {
    initials: "TK",
    name: "Tariq Khan",
    dept: "Sales",
    role: "Team Hero",
    points: 1240
  },
  {
    initials: "HP",
    name: "Hannah Park",
    dept: "Support",
    role: "Excellence",
    points: 1240
  }
];
export default function TopPerformers({ performers }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray shadow-sm">
      <h3 className="font-bold mb-4">Top 5 Performers</h3>
      <div className="space-y-4">
        {topPerformersData.map((p: any, i: number) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
              {p.initials}
            </div>
            <div className="flex-1">
              <p className="text-[16px] font-normal">{p.name}</p>
              <p className="text-sm text-gray-500 font-light">{p.dept} • {p.role}</p>
            </div>
            <span className="text-xs font-medium flex items-center justify-between gap-0.5 text-indigo-600"><Coins className="w-4 h-4 " /> {p.points}</span>
          </div>
        ))}
      </div>
    </div>
  );
}