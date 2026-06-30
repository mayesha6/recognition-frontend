"use client";

import RecognitionChart from "@/modules/user/dashboard/components/RecognitionChart";
import RecognitionTable from "@/modules/user/dashboard/components/RecognitionTable";
import PointCard from "@/modules/user/points/components/PointCad";
import { ClockIcon, Coins, Gift, MinusCircle, PlusCircle } from "lucide-react";

// চার্টের জন্য
export const mockData = [
  { name: 'Jan', receive: 22, sent: 25 },
  { name: 'Mar', receive: 28, sent: 32 },
  { name: 'Jun', receive: 30, sent: 38 },
  { name: 'Sep', receive: 35, sent: 42 },
  { name: 'Dec', receive: 38, sent: 46 },
];

// টেবিলের জন্য
export const recognitionData = [
  { initials: 'SR', name: 'Saifur Rahman', email: 'saifur@example.com', value: 'Engineering', category: 'Promotion', points: 1002, date: 'June 12, 2026 | 08:00 PM' },
  { initials: 'RE', name: 'Ralph Edwards', email: 'ralph@example.com', value: 'Engineering', category: 'Milestone', points: 1356, date: 'June 12, 2026 | 08:00 PM' },
  { initials: 'TM', name: 'Tina Moore', email: 'tina@example.com', value: 'Engineering', category: 'Daily Rec.', points: 885, date: 'June 12, 2026 | 08:00 PM' },
];

const pointsData = [
    { title: "Available Points", value: "284.5K", subtitle: "Across all programs", icon: <Coins className="w-5 h-5 text-orange-500" />, color: "bg-orange-100" },
    { title: "Total Sent Points", value: "21,054", icon: <MinusCircle className="w-5 h-5 text-red-500" />, color: "bg-red-100" },
    { title: "Total Received Points", value: "21,054", icon: <PlusCircle className="w-5 h-5 text-green-500" />, color: "bg-green-100" },
    { title: "Reward Redeemed", value: "5", icon: <Gift className="w-5 h-5 text-green-500" />, color: "bg-green-100" },
  ];

export default function DashboardPage() {
  // API থেকে ডেটা আসবে
  // const { data: stats } = useGetDashboardStatsQuery();

  return (
    <div className="p-8 bg-gray-50/50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">User Overview</h1>

      {/* ১. স্ট্যাটস কার্ডস */}
      
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
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
      

      {/* ২. চার্ট এবং কুইক অ্যাকশনস */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="col-span-2 bg-white p-6 rounded-2xl border border-gray shadow-sm">
           <h3 className="font-bold mb-4">Use Recognitions</h3>
           <RecognitionChart data={mockData} />
        </div>
        {/* <div className="bg-white p-6 rounded-2xl border shadow-sm">
           <h3 className="font-bold mb-4">Quick Actions</h3>
           <button className="w-full p-4 border rounded-xl mb-4 hover:bg-gray-50">Send Recognition</button>
           <button className="w-full p-4 border rounded-xl hover:bg-gray-50">Redeem Rewards</button>
        </div> */}
      </div>

      {/* ৩. টেবিল সেকশন (Send & Received) */}
      <RecognitionTable title="Send Recognition" data={recognitionData} />
      <RecognitionTable title="Received Recognition" data={recognitionData} />
    </div>
  );
}