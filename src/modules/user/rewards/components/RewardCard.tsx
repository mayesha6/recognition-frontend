import Image from "next/image";

interface RewardCardProps {
  _id: string;
  name: string;
  description?: string;
  points: number;
  stock: number;
  image?: string;
  onClaim: (id: string) => void;
  isClaiming?: boolean;
}

export default function RewardCard({ _id, name, description, points, stock, image, onClaim, isClaiming }: RewardCardProps) {
  const isOutOfStock = stock <= 0;

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
      {/* উপরের কন্টেন্ট */}
      <div className="grow">
        <div className="flex justify-between items-start mb-4">
          <div className="relative w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden">
            <Image src={image || "/reward.png"} alt={name} fill className="object-cover" />
          </div>
          <span className="text-blue-600 font-bold text-lg">{points} pts</span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-2">{name}</h3>
        <p className="text-gray-500 text-sm mb-4">{description || "No description available."}</p>
        <p className="text-xs font-medium text-gray-400 mb-4">Available stock: <span className={isOutOfStock ? "text-red-500 font-bold" : "text-gray-600"}>{stock}</span></p>
      </div>

      {/* বাটন (এটি সবসময় নিচে থাকবে) */}
      <div className="mt-auto pt-4">
        <button
          onClick={() => onClaim(_id)}
          disabled={isOutOfStock || isClaiming}
          className="w-full py-2.5 bg-gradient hover:bg-indigo-600 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isClaiming ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Claiming...
            </>
          ) : isOutOfStock ? (
            "Out of Stock"
          ) : (
            "Claim Reward"
          )}
        </button>
      </div>
    </div>
  );
}