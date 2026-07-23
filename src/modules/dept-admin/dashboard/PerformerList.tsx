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
export default function TopPerformers({ performers = [] }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray shadow-sm">
      <h3 className="font-bold mb-4 text-gray-900">Top 5 Performers</h3>
      {performers.length === 0 ? (
        <div className="text-sm text-gray-400 py-12 text-center font-medium">No performers data yet.</div>
      ) : (
        <div className="space-y-4">
          {performers.map((p: any, i: number) => {
            const initials = p.name 
              ? p.name.split(" ").filter((w: string) => /^[a-zA-Z0-9]/.test(w)).map((n: string) => n[0]).join("").toUpperCase().slice(0, 2) || p.name[0] 
              : "U";
            return (
              <div key={p.id || i} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold overflow-hidden shrink-0">
                  {p.picture ? (
                    <img src={p.picture} alt={p.name} className="w-full h-full object-cover" />
                  ) : (
                    <span>{initials}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[16px] font-semibold text-gray-900 truncate">{p.name}</p>
                  <p className="text-xs text-gray-500 font-light truncate">
                    {p.department} • {p.role === "SUPER_ADMIN" ? "Super Admin" : p.role === "ORGANIZATION_ADMIN" ? "Org Admin" : p.role === "DEPARTMENT_ADMIN" ? "Dept Admin" : "User"}
                  </p>
                </div>
                <span className="text-xs font-bold flex items-center justify-between gap-0.5 text-indigo-600 shrink-0">
                  <Coins className="w-4 h-4 " /> {p.points}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}