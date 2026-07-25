"use client";
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export default function RecognitionMix({ categoryMix = [] }: { categoryMix?: any[] }) {
  const colors = ['#FFB800', '#5D5FEF', '#00C4C4', '#FF4D4F', '#A5A6F6', '#8884d8'];
  
  const chartData = categoryMix
    .filter((c: any) => c.count > 0)
    .map((c: any, index: number) => ({
      name: c.category || "General",
      value: c.count || 0,
      color: colors[index % colors.length]
    }));

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray shadow-sm flex flex-col justify-between h-[320px]">
      <h3 className="font-bold mb-4 text-gray-900">Recognition Mix</h3>
      {chartData.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-sm text-gray-400 py-12 text-center font-medium">
          No recognition mix data yet.
        </div>
      ) : (
        <>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={chartData} innerRadius={55} outerRadius={75} paddingAngle={2} dataKey="value">
                  {chartData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-4 text-xs justify-center mt-2">
            {chartData.map(item => (
              <div key={item.name} className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-gray-600 font-medium">{item.value} {item.name}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}