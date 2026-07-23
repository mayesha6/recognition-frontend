"use client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from 'recharts';

interface RecognitionByDeptChartProps {
  data?: Array<{ name: string; value: number }>;
}

export default function RecognitionByDeptChart({ data = [] }: RecognitionByDeptChartProps) {
  if (data.length === 0) {
    return (
      <div className="bg-white p-6 rounded-2xl border border-gray shadow-sm w-full h-80 flex flex-col justify-center items-center">
        <h3 className="font-bold mb-6 self-start text-gray-900">Recognition by Department</h3>
        <p className="text-sm text-gray-400 font-medium">No recognition data available by department.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray shadow-sm w-full h-80">
      <h3 className="font-bold mb-6 text-gray-900">Recognition by Department</h3>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f9f9f9" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{fontSize: 10, fill: '#9ca3af'}} 
            interval={0} // সব নাম দেখানোর জন্য
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{fontSize: 10, fill: '#9ca3af'}} 
            tickFormatter={(val) => `${val}`}
          />
          <Bar 
            dataKey="value" 
            fill="#C7B9FF" 
            radius={[6, 6, 6, 6]} // বারগুলোর কর্নার রাউন্ড করার জন্য
            barSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}