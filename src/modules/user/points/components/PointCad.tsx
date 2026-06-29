import { ReactNode } from "react";

interface PointCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
  iconBgColor?: string;
}

export default function PointCard({ title, value, subtitle, icon, iconBgColor = "bg-orange-100" }: PointCardProps) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
      <div className="flex justify-between items-start">
        <p className="text-gray-500 text-sm font-medium">{title}</p>
        <div className={`p-2 rounded-lg ${iconBgColor}`}>
          {icon}
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
        {subtitle && <p className="text-green-600 text-sm mt-1 font-medium">{subtitle}</p>}
      </div>
    </div>
  );
}