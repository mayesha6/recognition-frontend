"use client";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { slugify } from "@/utils/slugify";

export default function HomePage() {
  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (!token) {
      let landingPageUrl = "https://greetely.com";
      if (typeof window !== "undefined") {
        if (window.location.hostname.includes("localhost")) {
          landingPageUrl = "http://localhost:3041";
        } else if (window.location.hostname.includes("127.0.0.1")) {
          landingPageUrl = "http://127.0.0.1:3041";
        }
      }
      window.location.href = `${landingPageUrl}/login`;
      return;
    }

    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        window
          .atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );

      const payload = JSON.parse(jsonPayload);
      const role = payload.role;

      let dashboardPath = "/user/dashboard";
      if (role === "SUPER_ADMIN") {
        dashboardPath = "/super-admin";
      } else if (role === "ORGANIZATION_ADMIN") {
        let orgName = "";
        try {
          const storedUser = localStorage.getItem("user");
          if (storedUser) {
            const parsed = JSON.parse(storedUser);
            orgName = parsed.name || "";
          }
        } catch (e) {
          console.error("Failed to parse user from localStorage:", e);
        }

        if (orgName) {
          dashboardPath = `/${slugify(orgName)}`;
        } else {
          dashboardPath = "/org-admin";
        }
      } else if (role === "DEPARTMENT_ADMIN") {
        dashboardPath = "/dept-admin/dashboard";
      } else if (role === "USER") {
        dashboardPath = "/user/dashboard";
      }

      window.location.href = dashboardPath;
    } catch (err) {
      console.error("Token decoding failed:", err);
      window.location.href = "/user/dashboard";
    }
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="flex flex-col items-center p-8 rounded-2xl bg-white/80 backdrop-blur-md shadow-xl border border-slate-100 max-w-sm w-full text-center space-y-6">
        {/* Animated premium spinner */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-slate-100"></div>
          <div className="absolute inset-0 rounded-full border-4 border-t-blue-600 border-r-blue-400 animate-spin"></div>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-slate-800">Opening Workspace</h2>
          <p className="text-sm text-slate-500 animate-pulse">Redirecting you to your dashboard...</p>
        </div>
      </div>
    </main>
  );
}