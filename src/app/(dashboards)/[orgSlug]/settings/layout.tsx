import SettingsTabs from "@/modules/org-admin/settings/SettingTabs";


export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-6">
      {/* সেটিং পেজের শিরোনাম */}
      <div>
        <h1 className="text-[28px] font-medium">Settings</h1>
      </div>

      {/* নেভিগেশন ট্যাব - যা সব সেটিং পেজে থাকবে */}
      <SettingsTabs />

      {/* কন্টেন্ট এরিয়া - এখানে প্রতিটি সেটিং পেজের কন্টেন্ট রেন্ডার হবে */}
      <div className="">
        {children}
      </div>
    </div>
  );
}  