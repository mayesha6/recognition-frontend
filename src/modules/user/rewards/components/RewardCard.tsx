import Image from "next/image";

interface RewardCardProps {
  title: string;
  description: string;
  points: number;
  icon: string;
}

export default function RewardCard({ title, description, points, icon }: RewardCardProps) {
  return (
    // কার্ডে flex-col এবং h-full ব্যবহার করুন
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
      
      {/* উপরের কন্টেন্ট */}
      <div className="grow">
        <div className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden">
            <Image src={icon} alt={title} width={32} height={32} className="object-contain" />
          </div>
          <span className="text-blue-600 font-bold text-lg">{points}pts</span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-500 text-sm mb-4">{description}</p>
      </div>

      {/* বাটন (এটি সবসময় নিচে থাকবে) */}
      <div className="mt-auto pt-4">
        <button className="w-full py-2.5 bg-gradient hover:bg-indigo-600 text-white font-medium rounded-lg transition-colors">
          Claim Reward
        </button>
      </div>
    </div>
  );
}