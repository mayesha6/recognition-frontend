import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Welcome to Greetely</h1>
      <div className="flex gap-4">
        <Link href="/user" className="px-4 py-2 bg-blue-500 text-white rounded">User Dashboard</Link>
        <Link href="/super-admin" className="px-4 py-2 bg-gray-800 text-white rounded">Admin Dashboard</Link>
      </div>
    </main>
  );
}