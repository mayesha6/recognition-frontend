import { ArrowUpCircle, Gift, AlertCircle, MessageSquare, Settings, ArrowUpRight } from "lucide-react";

const getActivityIcon = (type: string) => {
  if (type === "UPGRADE" || type === "RENEWAL") return ArrowUpCircle;
  if (type === "TRIAL") return Gift;
  if (type === "EXPIRED") return AlertCircle;
  if (type === "TICKET") return MessageSquare;
  return Settings;
};

const getActivityIconColor = (type: string) => {
  if (type === "UPGRADE" || type === "RENEWAL") return "bg-emerald-50 text-emerald-600";
  if (type === "TRIAL") return "bg-blue-50 text-blue-600";
  if (type === "EXPIRED") return "bg-rose-50 text-rose-600";
  if (type === "TICKET") return "bg-amber-50 text-amber-600";
  return "bg-slate-50 text-slate-600";
};

const formatTimeAgo = (dateString?: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
};

export default function RecentSystemActivity({ activities }: { activities: any[] }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray shadow-sm">
      <h3 className="font-bold mb-4">Recent Activities</h3>
      <div className="space-y-4">
        {activities.length === 0 ? (
          <div className="text-sm text-gray-500 text-center py-6">No recent activities.</div>
        ) : (
          activities.map((a: any, i: number) => {
            const Icon = getActivityIcon(a.type);
            const iconColor = getActivityIconColor(a.type);
            
            return (
              <div key={a._id || i} className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full ${iconColor} flex items-center justify-center shrink-0`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="text-sm">
                    <p className="text-gray-900 font-medium">{a.description}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{formatTimeAgo(a.createdAt)}</p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer shrink-0" />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
