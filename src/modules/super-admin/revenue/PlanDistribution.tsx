import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export default function PlanDistributionChart({ data }: any) {
  const COLORS = ['#f59e0b', '#6366f1', '#06b6d4', '#f97316'];
  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie data={data} innerRadius={60} outerRadius={80} dataKey="value">
          {data.map((entry: any, index: number) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}