"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function UpgradeBarChart({ data }: any) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <XAxis dataKey="month" axisLine={false} tickLine={false} />
        <YAxis axisLine={false} tickLine={false} />
        <Tooltip cursor={{fill: '#f3f4f6'}} />
        <Bar dataKey="value" radius={[6, 6, 0, 0]}>
          {data.map((entry: any, index: number) => (
            <Cell key={`cell-${index}`} fill="#c7b9f9" /> // আপনার ইমেজের কালারের সাথে মিলিয়ে
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}