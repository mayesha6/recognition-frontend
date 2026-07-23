"use client";

import { useState } from "react";
import { Search, Bell, Menu, Award, Gift, MessageSquare, ShieldAlert } from "lucide-react";
import Image from "next/image";
import logo from "@/assets/images/logo.png";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useGetMeQuery } from "@/redux/api/authApi";
import { 
  useGetNotificationsQuery, 
  useGetUnreadCountQuery, 
  useMarkAsReadMutation, 
  useMarkAllAsReadMutation 
} from "@/redux/api/notificationApi";
import Cookies from "js-cookie";

const getNotificationIcon = (type: string) => {
  if (type === "RECOGNITION") return Award;
  if (type === "CLAIM") return Gift;
  if (type === "SUPPORT") return MessageSquare;
  return ShieldAlert;
};

const getNotificationIconColor = (type: string) => {
  if (type === "RECOGNITION") return "bg-indigo-50 text-indigo-600";
  if (type === "CLAIM") return "bg-emerald-50 text-emerald-600";
  if (type === "SUPPORT") return "bg-amber-50 text-amber-600";
  return "bg-rose-50 text-rose-600";
};

const formatTimeAgo = (dateString?: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
};

export default function Header() {
  const router = useRouter();
  const token = useSelector((state: RootState) => state.auth?.token) || Cookies.get("accessToken");
  const { data: profileData, isLoading: isProfileLoading } = useGetMeQuery(undefined, { skip: !token });
  
  const user = profileData?.data;
  const tokenKeep = Cookies.get("accessToken");
  const isAuthenticated = !!tokenKeep && !!user;

  const initials = user?.name
    ? user.name
      .split(" ")
      .filter((word: string) => /^[a-zA-Z0-9]/.test(word))
      .map((item: string) => item[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || user.name.charAt(0).toUpperCase()
    : "U";

  // Notification states & query hooks
  const [showNotifications, setShowNotifications] = useState(false);

  const { data: countRes } = useGetUnreadCountQuery(undefined, { 
    skip: !isAuthenticated,
    pollingInterval: 30000 // Poll count every 30 seconds for unread updates
  });
  const unreadCount = countRes?.data?.count ?? 0;

  const { data: notificationsRes, isLoading: isNotificationsLoading } = useGetNotificationsQuery(
    { limit: 10 },
    { skip: !showNotifications || !isAuthenticated }
  );
  const notifications = notificationsRes?.data || [];

  const [markAsRead] = useMarkAsReadMutation();
  const [markAllAsRead] = useMarkAllAsReadMutation();

  const getRoleLabel = (role?: string) => {
    if (role === "SUPER_ADMIN") return "Super Admin";
    if (role === "ORGANIZATION_ADMIN") return "Org Admin";
    if (role === "DEPARTMENT_ADMIN") return "Dept Admin";
    return "User";
  };

  const handleNotificationClick = async (notification: any) => {
    try {
      if (!notification.isRead) {
        await markAsRead(notification._id).unwrap();
      }
      setShowNotifications(false);
      if (notification.link) {
        router.push(notification.link);
      }
    } catch (err) {
      console.error("Failed to mark notification as read:", err);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead().unwrap();
    } catch (err) {
      console.error("Failed to mark all notifications as read:", err);
    }
  };

  return (
    <header className="h-auto md:h-20 bg-white border-b border-b-gray flex items-center justify-between px-4 md:px-8 py-3 gap-4">
      {/* Greetely Logo */}
      <div className="flex items-center gap-2">
        <Link href="https://greetely.com/" className="flex items-center gap-2 shrink-0">
          <Image
            src={logo} 
            alt="Greetely Logo"
            width={500}
            height={500}
            className="w-32 h-12 object-contain"
          />
        </Link>
      </div>

      {/* Bell Icon & User Profile */}
      <div className="flex items-center gap-3 md:gap-6">
        <div className="flex items-center gap-6">
          
          {/* Notifications Trigger & Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-1.5 rounded-full hover:bg-gray-100 transition-colors shrink-0 text-gray-500 hover:text-indigo-600 focus:outline-none"
            >
              <Bell className="w-6 h-6" />
              {unreadCount > 0 && (
                <span className="absolute top-0.5 right-0.5 w-5 h-5 bg-orange-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border border-white animate-pulse">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <>
                {/* Backdrop overlay to close dropdown on click outside */}
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setShowNotifications(false)}
                />
                
                <div className="absolute right-0 top-12 mt-2 w-80 sm:w-96 bg-white border border-gray-100 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-3 duration-200">
                  <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                    <h4 className="font-bold text-gray-900 text-sm">Notifications</h4>
                    {unreadCount > 0 && (
                      <button 
                        onClick={handleMarkAllAsRead}
                        className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold hover:underline"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-gray-50">
                    {isNotificationsLoading ? (
                      <div className="p-8 text-center text-gray-500 text-xs">Loading...</div>
                    ) : notifications.length === 0 ? (
                      <div className="p-8 text-center text-gray-500 text-xs flex flex-col items-center gap-2">
                        <Bell className="w-8 h-8 text-gray-300" />
                        <span>No notifications yet.</span>
                      </div>
                    ) : (
                      notifications.map((item: any) => {
                        const Icon = getNotificationIcon(item.type);
                        const iconColor = getNotificationIconColor(item.type);
                        
                        return (
                          <div 
                            key={item._id}
                            onClick={() => handleNotificationClick(item)}
                            className={`p-4 flex gap-3 cursor-pointer hover:bg-gray-50/50 transition-colors ${!item.isRead ? 'bg-indigo-50/10' : ''}`}
                          >
                            <div className={`w-9 h-9 rounded-full ${iconColor} flex items-center justify-center shrink-0`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-1.5">
                                <p className="font-semibold text-xs text-gray-900 truncate">{item.title}</p>
                                <span className="text-[10px] text-gray-400 whitespace-nowrap">{formatTimeAgo(item.createdAt)}</span>
                              </div>
                              <p className="text-xs text-gray-500 line-clamp-2 mt-0.5">{item.message}</p>
                            </div>
                            
                            {!item.isRead && (
                              <div className="w-2 h-2 rounded-full bg-orange-500 self-center shrink-0" />
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="h-8 w-px bg-gray-200"></div> {/* Divider */}

          {isProfileLoading ? (
            <div className="text-xs text-gray-400">Loading...</div>
          ) : isAuthenticated && user && (
            <div className="flex items-center gap-3">
              {/* Profile image */}
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center border border-gray-200 overflow-hidden">
                {user.picture ? (
                  <Image
                    src={user.picture}
                    alt={user.name}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-orange-600 font-bold text-sm">
                    {initials}
                  </span>
                )}
              </div>

              {/* User role labels */}
              <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-900">{user.name}</span>
                <span className="text-xs text-gray-500">{getRoleLabel(user.role)}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}