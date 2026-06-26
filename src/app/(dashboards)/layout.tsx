// src/app/(dashboards)/layout.tsx
export default function DashboardsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar Placeholder */}
      <aside className="hidden w-64 bg-gray-100 border-r md:block">
        <div className="p-4 text-xl font-bold">Greetely</div>
      </aside>
      
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header Placeholder */}
        <header className="flex items-center h-16 px-6 border-b">
          <span className="font-medium">Dashboard Header</span>
        </header>
        
        <main className="flex-1 p-6 overflow-y-auto bg-slate-50">
          {children}
        </main>
      </div>
    </div>
  );
}