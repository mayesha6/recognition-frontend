"use client";

import PointsManager from "@/modules/org-admin/settings/point/PointsAllocation";

export default function PointsAllocationPage() {
  return (
    <div className="space-y-6">
      <PointsManager initialData={[]} />
    </div>
  );
}