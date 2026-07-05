"use client";
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Peer', value: 45, color: '#FFB800' },
  { name: 'Thank You', value: 25, color: '#5D5FEF' },
  { name: 'Milestone', value: 20, color: '#00C4C4' },
  { name: 'Excellence', value: 10, color: '#FF4D4F' },
];

export default function RecognitionMix() {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray shadow-sm">
      <h3 className="font-bold mb-4">Recognition Mix</h3>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value">
              {data.map((entry, index) => <Cell key={index} fill={entry.color} />)}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-wrap gap-4 text-sm justify-center">
        {data.map(item => (
          <div key={item.name} className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
            <span>{item.value} {item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}