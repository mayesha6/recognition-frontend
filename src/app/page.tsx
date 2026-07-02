"use client";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="space-y-4 w-80">

        <Link
          href="/user/dashboard"
          className="block w-full text-center px-4 py-3 bg-blue-500 text-white rounded-lg"
          onClick={() => {
            localStorage.setItem("role", "user");
          }}
        >
          User Dashboard
        </Link>

        <Link
          href="/dept-admin"
          className="block w-full text-center px-4 py-3 bg-green-500 text-white rounded-lg"
          onClick={() => {
            localStorage.setItem("role", "dept-admin");
          }}
        >
          Department Admin Dashboard
        </Link>

        <Link
          href="/org-admin/dashboard"
          className="block w-full text-center px-4 py-3 bg-orange-500 text-white rounded-lg"
          onClick={() => {
            localStorage.setItem("role", "org-admin");
          }}
        >
          Organization Admin Dashboard
        </Link>

        <Link
          href="/super-admin/dashboard"
          className="block w-full text-center px-4 py-3 bg-gray-900 text-white rounded-lg"
          onClick={() => {
            localStorage.setItem("role", "super-admin");
          }}
        >
          Super Admin Dashboard
        </Link>

      </div>
    </main>
  );
}