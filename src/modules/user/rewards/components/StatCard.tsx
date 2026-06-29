// src/components/dashboard/StatCard.tsx
import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  count: number | string;
  icon: ReactNode;
  trend?: string; // Optional: যেমন "+11.2%"
  iconBgColor?: string; // কার্ডের কালার ভেরিয়েশন হ্যান্ডেল করার জন্য
}

export default function StatCard({ 
  title, 
  count, 
  icon, 
  trend, 
  iconBgColor = "bg-gray-100" 
}: StatCardProps) {
  return (
    <div className="bg-gray/10 p-6 rounded-2xl border border-gray-100 shadow-sm transition-all duration-200 hover:shadow-md">
      <div className="flex justify-between items-start mb-4">
        <p className="text-gray-500 text-sm font-medium">{title}</p>
        
        {/* আইকন কন্টেইনার */}
        <div className={`p-2 rounded-lg ${iconBgColor}`}>
          {icon}
        </div>
      </div>

      <div className="flex items-end gap-3">
        <h3 className="text-3xl font-bold text-gray-900">{count}</h3>
        
        {/* ট্রেন্ড ভ্যালু থাকলে দেখাবে */}
        {trend && (
          <p className="text-green-600 text-sm font-semibold mb-1">
            {trend}
          </p>
        )}
      </div>
    </div>
  );
}