"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const COLORS: Record<string, string> = {
  Premium: "#3B82F6", // Indigo/Blue
  Enterprise: "#F59E0B", // Amber/Yellow
  Professional: "#06B6D4", // Cyan
  Free: "#F43F5E" // Red/Rose
};

// Fallback colors for other plans
const FALLBACK_COLORS = ["#10B981", "#8B5CF6", "#EC4899", "#6B7280"];

export default function PlanDistributionChart({ distributionData }: { distributionData: any[] }) {
  // Map backend _id/count structure to recharts Pie data format
  const mappedData = (distributionData || []).map((item, index) => {
    const name = item._id || "Unknown";
    const value = item.count || 0;
    const color = COLORS[name] || FALLBACK_COLORS[index % FALLBACK_COLORS.length];
    
    return { name, value, color };
  });

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray shadow-sm h-88 flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-900">Plan Distribution</h3>
        <button className="text-xs text-gray-400 font-semibold hover:text-gray-600 bg-gray-50 px-2.5 py-1 rounded-lg">
          View
        </button>
      </div>

      <div className="h-44 w-full flex items-center justify-center relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={mappedData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={70}
              paddingAngle={4}
              dataKey="value"
            >
              {mappedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legends */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4 text-xs font-semibold text-gray-600">
        {mappedData.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: entry.color }} />
            <span className="truncate">{entry.value} {entry.name}</span>
          </div>
        ))}
        {mappedData.length === 0 && (
          <div className="col-span-2 text-center text-[10px] text-gray-400 font-medium py-2">
            No active plan data.
          </div>
        )}
      </div>
    </div>
  );
}
