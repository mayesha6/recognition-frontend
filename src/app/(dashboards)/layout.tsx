import Sidebar from "@/components/layout/dashboard/Sidebar";
import Header from "@/components/layout/dashboard/Header";
import ReduxProvider from "@/redux/reduxProvider";
export default function DashboardsLayout({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header Full Width */}
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
    </ReduxProvider>
  );
}