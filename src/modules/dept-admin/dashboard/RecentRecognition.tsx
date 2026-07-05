import { Plus } from "lucide-react";

export const recentActivityData = [
  {
    initials: "MC",
    sender: "Maya Chen",
    receiver: "Liam Patel",
    occasion: "Peer Recognition",
    dept: "Engineering",
    pts: "25 pts"
  },
  {
    initials: "JR",
    sender: "Jordan Reyes",
    receiver: "Aisha Khan",
    occasion: "Thank You",
    dept: "Marketing",
    pts: "25 pts"
  },
  {
    initials: "AL",
    sender: "Alice Lee",
    receiver: "Noah Smith",
    occasion: "Kudos",
    dept: "Design",
    pts: "30 pts"
  },
  {
    initials: "TK",
    sender: "Tariq Khan",
    receiver: "Zoe Lim",
    occasion: "Appreciation",
    dept: "Product",
    pts: "20 pts"
  },
  {
    initials: "HP",
    sender: "Hannah Park",
    receiver: "James Lee",
    occasion: "Employee of the Month",
    dept: "HR",
    pts: "50 pts"
  }
];
export default function RecentActivity({ activities }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray shadow-sm">
      <h3 className="font-bold mb-4">Recent Recognition Activity</h3>
      <div className="space-y-4">
        {recentActivityData.map((a: any, i: number) => (
          <div key={i} className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-600">
              {a.initials}
            </div>
            <div className="flex-1 text-sm">
              <p className="text-gray-400">
                <span className="font-normal text-black">{a.sender}</span> recognized <span className="font-normal text-black">{a.receiver}</span>
              </p>
              <p className="text-xs text-gray-500">{a.occasion} • {a.dept}</p>
            </div>
            <span className="text-xs font-bold text-indigo-600 flex items-center justify-between"><Plus className="w-3 h-3 " /> {a.pts}</span>
          </div>
        ))}
      </div>
    </div>
  );
}