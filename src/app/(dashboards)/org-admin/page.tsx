"use client";
import { Calendar, CheckIcon, ClockIcon, Coins, Trophy, XIcon } from "lucide-react";
import { CategoryBar } from "@/modules/dept-admin/recognition/CategoryBar";
import StatCard from "@/modules/user/rewards/components/StatCard";
import RecognitionTable from "@/modules/dept-admin/recognition/RecognitionTable";
import RecognitionChart from "@/modules/dept-admin/recognition/RecognitionChart";
import RecognitionByDeptChart from "@/modules/org-admin/recognition/RecognitionByDeptChart";
import TopPerformers from "@/modules/dept-admin/dashboard/PerformerList";
import RecentActivity from "@/modules/dept-admin/dashboard/RecentRecognition";
export const trendData = [
  { name: 'Jan', value: 70000 },
  { name: 'Feb', value: 95000 },
  { name: 'Mar', value: 120000 },
  { name: 'Apr', value: 150000 },
  { name: 'May', value: 190000 },
  { name: 'Jun', value: 180000 },
  { name: 'Jul', value: 170000 },
  { name: 'Aug', value: 200000 },
  { name: 'Sep', value: 250000 },
  { name: 'Oct', value: 300000 },
  { name: 'Nov', value: 400000 },
  { name: 'Dec', value: 500000 },
];

export const recognitionList = [
  { sender: "Courtney Henry", recipient: "Darrell Steward", department: "Engineering", points: 320, date: "Apr 12, 2026", occasion: "Daily Recognition", status: "Delivered" },
  { sender: "Darlene Robertson", recipient: "Jerome Bell", department: "Engineering", points: 180, date: "Mar 02, 2026", occasion: "Milestone", status: "Delivered" },
  { sender: "Kristin Watson", recipient: "Ronald Richards", department: "Engineering", points: 210, date: "Mar 02, 2026", occasion: "Promotion", status: "Delivered" },
  { sender: "Dianne Russell", recipient: "Jane Cooper", department: "Engineering", points: 180, date: "Mar 02, 2026", occasion: "Welcome", status: "Delivered" },
  { sender: "Darrell Steward", recipient: "Courtney Henry", department: "Engineering", points: 320, date: "Apr 12, 2026", occasion: "Appreciation", status: "Delivered" },
  { sender: "Leslie Alexander", recipient: "Brooklyn Simmons", department: "Engineering", points: 210, date: "Mar 02, 2026", occasion: "Welcome", status: "Delivered" },
  { sender: "Jane Cooper", recipient: "Theresa Webb", department: "Engineering", points: 210, date: "Mar 02, 2026", occasion: "Daily Recognition", status: "Delivered" },
];
const dashboardData = {
  stats: { total: 100, sent: 21054, received: 4680, points: "284.5K", engagement: 91, topPerformer: "Saifur" },
  users: [/* ... */],
  performers: [/* ... */],
  activities: [/* ... */]
};
export default function DashboardPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <h2 className="text-[28px] font-medium mb-4">Organization Overview</h2>

      {/* ১. স্ট্যাটস কার্ডস */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-5">
        <StatCard
          title="Total Recognitions"
          count={5}
          icon={<Trophy className="w-5 h-5 text-orange-500" />}
          iconBgColor="bg-[#FFAA00]/10"
        />

        <StatCard
          title="Recognition This Months"
          count={3}
          icon={<Calendar className="w-5 h-5 text-green-500" />}
          iconBgColor="bg-[#00AC5F]/10"
        />

        <StatCard
          title="Point Distributed"
          count={3}
          // trend="+11.2%"
          icon={<Coins className="w-5 h-5 text-red-500" />}
          iconBgColor="bg-[#FF0000]/10"
        />
      </div>


      {/* ২. চার্ট এবং ক্যাটাগরি */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="col-span-2 bg-white p-6 rounded-2xl border border-gray shadow-sm">
          <h3 className="font-bold mb-4">Recognition Trends</h3>
          <RecognitionChart data={trendData} />
        </div>
        <div className="bg-white p-6 rounded-2xl border shadow-sm border-gray">
          <h3 className="font-bold mb-4">Recognition by Category</h3>
          <CategoryBar label="Team Collaboration" percentage={85} color="#6366f1" />
          <CategoryBar label="Peer Recognition" percentage={72} color="#ec4899" />
          <CategoryBar label="Innovation" percentage={65} color="#3b82f6" />

        </div>
      </div>

      <div className="mb-5">
        <RecognitionByDeptChart />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* <RecognitionMix /> */}
        <TopPerformers performers={dashboardData.performers} />
        <RecentActivity activities={dashboardData.activities} />
      </div>
    </div>
  );
}