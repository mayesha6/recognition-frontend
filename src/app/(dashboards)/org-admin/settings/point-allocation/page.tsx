"use client";

import PointsManager from "@/modules/org-admin/settings/PointsAllocation";

export default function PointsAllocationPage() {
  const handleSave = (data: any) => {
    console.log("API এ পাঠানো ডাটা:", data);
  };

  return (
    <div className="space-y-6">
      <PointsManager 
        initialData={[]} 
        onSave={handleSave} 
      />
    </div>
  );
}