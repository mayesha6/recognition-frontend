// src/components/dashboard/MyPoints.tsx
"use client";
import PointCard from "@/modules/user/points/components/PointCad";
import { Circle, MinusCircle, PlusCircle } from "lucide-react";

// ধরি আপনার API থেকে পাওয়া ডেটা এমন স্ট্রাকচারের
const MyPoints = () => {
  // const { data } = useGetPointsQuery(); // আপনার API হুক
  
  const pointsData = [
    { title: "Available Points", value: "284.5K", subtitle: "Across all programs", icon: <Circle className="w-5 h-5 text-orange-500" />, color: "bg-orange-100" },
    { title: "Total Sent Points", value: "21,054", icon: <MinusCircle className="w-5 h-5 text-red-500" />, color: "bg-red-100" },
    { title: "Total Received Points", value: "21,054", icon: <PlusCircle className="w-5 h-5 text-green-500" />, color: "bg-green-100" },
  ];

  return (
    <section className="py-6">
      <h2 className="text-2xl font-bold mb-6">My Point</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pointsData.map((item, index) => (
          <PointCard 
            key={index}
            title={item.title}
            value={item.value}
            subtitle={item.subtitle}
            icon={item.icon}
            iconBgColor={item.color}
          />
        ))}
      </div>
    </section>
  );
};

export default MyPoints;