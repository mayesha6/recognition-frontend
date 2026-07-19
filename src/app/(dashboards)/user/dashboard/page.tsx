"use client";

import Link from "next/link";
import RecognitionChart from "@/modules/user/dashboard/components/RecognitionChart";
import RecognitionTable from "@/modules/user/dashboard/components/RecognitionTable";
import PointCard from "@/modules/user/points/components/PointCad";
import { Coins, Gift, MinusCircle, PlusCircle, Send } from "lucide-react";
import { useGetMeQuery } from "@/redux/api/authApi";
import { useGetMyBalanceQuery } from "@/redux/api/recognitionApi";
import { useGetRecognitionHistoryQuery } from "@/redux/api/userApi";
import { useGetMyClaimsQuery } from "@/redux/api/rewardApi";

const getDisplayNameFromEmail = (email: string) => {
  if (!email) return "User";
  const username = email.split("@")[0];
  return username
    .split(/[._-]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
};

const formatDate = (dateString: string) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "N/A";
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
};

export default function DashboardPage() {
  const { data: userRes, isLoading: isProfileLoading } = useGetMeQuery(undefined);
  const currentUser = userRes?.data;

  const { data: balanceRes, isLoading: isBalanceLoading } = useGetMyBalanceQuery(undefined);
  const { data: historyRes, isLoading: isHistoryLoading } = useGetRecognitionHistoryQuery({ limit: 100 });
  const { data: claimsRes, isLoading: isClaimsLoading } = useGetMyClaimsQuery(undefined);

  const isLoading = isProfileLoading || isBalanceLoading || isHistoryLoading || isClaimsLoading;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] gap-2">
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500 font-medium">Loading dashboard overview...</p>
      </div>
    );
  }

  const balance = balanceRes?.data?.balance ?? 0;
  const recognitions = historyRes?.data || [];
  const claims = claimsRes?.data || [];

  // Calculate totals dynamically
  const sentRecognitions = recognitions.filter((rec: any) => rec.senderEmail === currentUser?.email);
  const receivedRecognitions = recognitions.filter((rec: any) => rec.receiverEmail === currentUser?.email);

  const sentPointsTotal = sentRecognitions.reduce((sum: number, rec: any) => sum + (rec.points || 0), 0);
  const receivedPointsTotal = receivedRecognitions.reduce((sum: number, rec: any) => sum + (rec.points || 0), 0);

  const totalClaims = claimsRes?.meta?.total ?? claims.length ?? 0;
  const lastRedeemedReward = claims[0]?.reward?.name || "None";

  // Build pointsData
  const pointsData = [
    { 
      title: "Available Points", 
      value: balance.toLocaleString(), 
      subtitle: "Across all programs", 
      icon: <Coins className="w-5 h-5 text-orange-500" />, 
      color: "bg-orange-100" 
    },
    { 
      title: "Total Sent Points", 
      value: sentPointsTotal.toLocaleString(), 
      icon: <MinusCircle className="w-5 h-5 text-red-500" />, 
      color: "bg-red-100" 
    },
    { 
      title: "Total Received Points", 
      value: receivedPointsTotal.toLocaleString(), 
      icon: <PlusCircle className="w-5 h-5 text-green-500" />, 
      color: "bg-green-100" 
    },
    { 
      title: "Reward Redeemed", 
      value: totalClaims.toString(), 
      subtitle: lastRedeemedReward !== "None" ? `Last: ${lastRedeemedReward}` : "No claims yet",
      icon: <Gift className="w-5 h-5 text-indigo-500" />, 
      color: "bg-indigo-100" 
    },
  ];

  // Group history by month for the chart
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const chartData = months.map((month, idx) => {
    const monthlyRecs = recognitions.filter((rec: any) => {
      const date = new Date(rec.createdAt);
      return date.getMonth() === idx && date.getFullYear() === new Date().getFullYear();
    });

    const receiveCount = monthlyRecs.filter((rec: any) => rec.receiverEmail === currentUser?.email).length;
    const sentCount = monthlyRecs.filter((rec: any) => rec.senderEmail === currentUser?.email).length;

    return {
      name: month,
      receive: receiveCount,
      sent: sentCount
    };
  });

  // Table Data Mapping
  const sentTableData = sentRecognitions.slice(0, 5).map((rec: any) => {
    const name = getDisplayNameFromEmail(rec.receiverEmail);
    return {
      initials: name.charAt(0),
      name,
      email: rec.receiverEmail,
      value: rec.recognition_values?.join(", ") || "N/A",
      category: rec.category || "N/A",
      points: rec.points,
      date: formatDate(rec.createdAt)
    };
  });

  const receivedTableData = receivedRecognitions.slice(0, 5).map((rec: any) => {
    const name = getDisplayNameFromEmail(rec.senderEmail);
    return {
      initials: name.charAt(0),
      name,
      email: rec.senderEmail,
      value: rec.recognition_values?.join(", ") || "N/A",
      category: rec.category || "N/A",
      points: rec.points,
      date: formatDate(rec.createdAt)
    };
  });

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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <h3 className="font-bold mb-4 text-gray-900">Use Recognitions</h3>
          <RecognitionChart data={chartData} />
        </div>
        
        {/* Quick Actions Panel */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between">
          <h3 className="font-bold mb-4 text-gray-900">Quick Actions</h3>
          <div className="flex flex-col gap-4 h-full justify-center">
            <Link 
              href="/user/send-recognition" 
              className="flex items-center gap-3 p-4 border border-gray-100 rounded-xl hover:bg-indigo-50/50 hover:border-indigo-200 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
                <Send className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="font-bold text-sm text-gray-900">Send Recognition</p>
                <p className="text-xs text-gray-500">Recognize a teammate</p>
              </div>
            </Link>

            <Link 
              href="/user/rewards" 
              className="flex items-center gap-3 p-4 border border-gray-100 rounded-xl hover:bg-emerald-50/50 hover:border-emerald-200 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                <Gift className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="font-bold text-sm text-gray-900">Redeem Rewards</p>
                <p className="text-xs text-gray-500">Claim your rewards</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* ৩. টেবিল সেকশন (Send & Received) */}
      <RecognitionTable title="Send Recognition" data={sentTableData} />
      <RecognitionTable title="Received Recognition" data={receivedTableData} />
    </div>
  );
}