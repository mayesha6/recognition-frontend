import { Plan } from "@/types/subscription";
import { CheckCircle2, Pencil, Trash2 } from "lucide-react";

interface PlanCardProps {
  plan: Plan;
  onEdit: (plan: Plan) => void;
  onDelete: (plan: Plan) => void;
}

export default function PlanCard({ plan, onEdit, onDelete }: PlanCardProps) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
      <p className="text-sm text-gray-500 mt-2 min-h-10">{plan.description}</p>

      <div className="mt-4 flex items-baseline gap-1">
        <span className="text-4xl font-bold text-indigo-600">
          {plan.price === "Free" ? "Free" : `$${plan.price}`}
        </span>
        <span className="text-gray-500 text-sm font-medium">/ {plan.billingCycle}</span>
      </div>

      {/* Features Box */}
      <div className="bg-gray-50/80 rounded-xl p-5 mt-6 flex-1">
        <h4 className="text-sm font-semibold text-gray-700 mb-4">Core Access</h4>
        <ul className="space-y-3">
          {plan.features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 mt-6">
        <button
          onClick={() => onEdit(plan)}
          className="flex-1 flex justify-center items-center gap-2 border border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-indigo-600 py-2.5 rounded-lg text-sm font-medium transition-colors"
        >
          <Pencil className="w-4 h-4" /> Edit Plan
        </button>
        <button
          onClick={() => onDelete(plan)}
          className="flex justify-center items-center border border-red-100 text-red-500 hover:bg-red-50 w-11 h-10 rounded-lg transition-colors"
          title="Delete Plan"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}