"use client";
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export default function PlanDistributionChart({ data }: any) {
  const COLORS = ['#f59e0b', '#6366f1', '#06b6d4', '#f97316'];

  return (
    <div className="flex flex-col items-center">
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie data={data} innerRadius={80} outerRadius={140} dataKey="value">
            {data.map((entry: any, index: number) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      {/* কাস্টম লিজেন্ড সেকশন */}
      <div className="flex flex-wrap justify-center gap-4 mt-4 text-sm">
        {data.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
            <span className="font-semibold text-xl" style={{ color: COLORS[index % COLORS.length] }}>{entry.value}</span>
            <span className="text-gray-500">{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}