"use client";

export default function AdminAccessTable({ data }: { data: any[] }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-50/50 text-gray-400 text-xs uppercase tracking-wider">
          <tr>
            <th className="px-6 py-4 font-medium">SL</th>
            <th className="px-6 py-4 font-medium">Name</th>
            <th className="px-6 py-4 font-medium">Email</th>
            <th className="px-6 py-4 font-medium">Number</th>
            <th className="px-6 py-4 font-medium">Assigned Department</th>
            <th className="px-6 py-4 font-medium text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.map((admin, index) => (
            <tr key={admin.id} className="hover:bg-gray-50/50 transition-colors">
              <td className="px-6 py-4 text-sm text-gray-500">{index + 1}</td>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">{admin.name}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{admin.email}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{admin.number}</td>
              <td className="px-6 py-4">
                <DepartmentBadge dept={admin.department} />
              </td>
              <td className="px-6 py-4 text-right text-gray-400 cursor-pointer">...</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}