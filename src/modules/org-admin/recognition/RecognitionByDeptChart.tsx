"use client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: 'Marketing', value: 450000 },
  { name: 'Sales', value: 300000 },
  { name: 'Personal', value: 150000 },
  { name: 'HR', value: 100000 },
  { name: 'Super Admin', value: 200000 },
  { name: 'Operations', value: 150000 },
  { name: 'Marketing', value: 250000 },
  { name: 'Sales', value: 100000 },
  { name: 'Personal', value: 150000 },
  { name: 'HR', value: 250000 },
  { name: 'Super Admin', value: 300000 },
  { name: 'Operations', value: 400000 },
];

export default function RecognitionByDeptChart() {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray shadow-sm w-full h-80">
      <h3 className="font-bold mb-6">Recognition by Department</h3>
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
            tickFormatter={(val) => `$${val/1000}k`}
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