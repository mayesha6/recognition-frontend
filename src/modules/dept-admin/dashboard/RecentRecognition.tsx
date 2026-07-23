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
export default function RecentActivity({ activities = [] }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray shadow-sm">
      <h3 className="font-bold mb-4 text-gray-900">Recent Recognition Activity</h3>
      {activities.length === 0 ? (
        <div className="text-sm text-gray-400 py-12 text-center font-medium">No recent recognition activity.</div>
      ) : (
        <div className="space-y-4">
          {activities.map((a: any, i: number) => {
            const initials = a.senderName 
              ? a.senderName.split(" ").filter((w: string) => /^[a-zA-Z0-9]/.test(w)).map((n: string) => n[0]).join("").toUpperCase().slice(0, 2) || a.senderName[0] 
              : "U";
            return (
              <div key={a._id || i} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-600 overflow-hidden shrink-0 border border-gray-50">
                  {a.senderPicture ? (
                    <img src={a.senderPicture} alt={a.senderName} className="w-full h-full object-cover" />
                  ) : (
                    <span>{initials}</span>
                  )}
                </div>
                <div className="flex-1 text-sm min-w-0">
                  <p className="text-gray-400 truncate">
                    <span className="font-semibold text-black">{a.senderName}</span> recognized <span className="font-semibold text-black">{a.receiverName}</span>
                  </p>
                  <p className="text-xs text-gray-500 truncate">{a.category || "General"} • {a.department}</p>
                </div>
                <span className="text-xs font-bold text-indigo-600 flex items-center gap-0.5 shrink-0">
                  <Plus className="w-3 h-3 " /> {a.points} pts
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}