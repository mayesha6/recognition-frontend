import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function RevenueChart({ data }: any) {
  return (
    
<ResponsiveContainer width="100%" height={350}>
  <LineChart 
    data={data} 
    margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
  >
    <XAxis 
      dataKey="month" 
      axisLine={false} 
      tickLine={false} 
      padding={{ left: 20, right: 20 }} // দুই পাশে জায়গা বাড়াবে
      dy={10}
      dx={10}
    />
    <YAxis 
      axisLine={false} 
      tickLine={false} 
      width={50} // ওয়াই-অ্যাক্সিসের প্রস্থ কমানো হয়েছে
      tickFormatter={(value) => `${value / 1000}k`}
    />
    <Tooltip />
    <Line 
      type="monotone" 
      dataKey="revenue" 
      stroke="#6366f1" 
      strokeWidth={2} 
      dot={true} // জানুয়ারি মাসের পয়েন্ট দেখার জন্য এটি প্রয়োজন
      isAnimationActive={false} // পারফরম্যান্সের জন্য
    />
  </LineChart>
</ResponsiveContainer>

  );
}