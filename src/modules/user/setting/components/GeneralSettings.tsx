// src/components/settings/GeneralSettings.tsx
export default function GeneralSettings({ user }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      <h3 className="font-bold mb-4">General Settings</h3>
      <div className="flex items-center gap-6">
        <div className="w-24 h-24 bg-gray-100 rounded-xl" />
        <div>
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 text-sm">Change Photo</button>
          <p className="text-xs text-gray-400 mt-2">JPEG, PNG, WEBP · max 2MB</p>
        </div>
      </div>
    </div>
  );
}