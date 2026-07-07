const EngagementProgress = ({ value }: { value: number }) => (
  <div className="flex items-center gap-3">
    <div className="h-2 w-24 bg-gray-100 rounded-full overflow-hidden">
      <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${value}%` }} />
    </div>
    <span className="text-sm font-medium">{value}</span>
  </div>
);

export default function DepartmentTable({ data }: any) {
  return (
    <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-50 text-gray-400 text-xs uppercase">
          <tr>
            <th className="px-6 py-4">Department</th>
            <th className="px-6 py-4">Admin</th>
            <th className="px-6 py-4">Employees</th>
            <th className="px-6 py-4">Recognitions</th>
            <th className="px-6 py-4">Engagement</th>
            <th className="px-6 py-4">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.map((dept: any, i: number) => (
            <tr key={i} className="hover:bg-gray-50/50">
              <td className="px-6 py-4 font-medium">{dept.name}</td>
              <td className="px-6 py-4">{dept.admin}</td>
              <td className="px-6 py-4">{dept.employees}</td>
              <td className="px-6 py-4">{dept.recognitions}</td>
              <td className="px-6 py-4"><EngagementProgress value={dept.engagement} /></td>
              <td className="px-6 py-4">
                <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-xs font-medium">● Active</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}