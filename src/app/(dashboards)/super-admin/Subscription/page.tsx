"use client";
import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Plan } from "@/types/subscription";
import PlanCard from "@/modules/super-admin/subscription/PlanCard";
import PlanFormModal from "@/modules/super-admin/subscription/PlanFormModal";

// Demo Data (API থেকে এভাবেই আসবে)
const demoPlans: Plan[] = [
  {
    id: "1",
    name: "Starter",
    description: "Best for small teams and startups.",
    price: "Free",
    billingCycle: "Monthly",
    features: ["AI Recognition Messages", "Employee Points System", "Peer-to-Peer Recognition", "Reward Redemption"]
  },
  {
    id: "2",
    name: "Professional",
    description: "Best for growing teams.",
    price: 8,
    billingCycle: "Monthly",
    features: ["Everything in Starter", "Advanced Analytics", "Department Insights", "Custom Rewards Catalog"]
  },
  {
    id: "3",
    name: "Premium",
    description: "Best for large organizations.",
    price: 20,
    billingCycle: "Monthly",
    features: ["Everything in Pro", "Enterprise-Level Security", "Dedicated Account Manager", "API Access"]
  }
];

export default function SubscriptionPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Modals State
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);

  useEffect(() => {
    // API Call Simulation
    setTimeout(() => {
      setPlans(demoPlans);
      setIsLoading(false);
    }, 1000); // 1 second fake delay
  }, []);

  const handleCreate = () => {
    setEditingPlan(null);
    setIsFormModalOpen(true);
  };

  const handleEdit = (plan: Plan) => {
    setEditingPlan(plan);
    setIsFormModalOpen(true);
  };

  const handleDelete = (plan: Plan) => {
    if (confirm(`Are you sure you want to delete the ${plan.name} plan?`)) {
      // Call Delete API here
      setPlans(plans.filter(p => p.id !== plan.id));
      console.log("Deleted Plan:", plan.id);
    }
  };

  const handleSave = (planData: Partial<Plan>) => {
    if (editingPlan) {
      // Call Update API here
      console.log("Update API Payload:", planData);
      setPlans(plans.map(p => p.id === editingPlan.id ? { ...p, ...planData } as Plan : p));
    } else {
      // Call Create API here
      const newPlan = { ...planData, id: Date.now().toString() } as Plan;
      console.log("Create API Payload:", newPlan);
      setPlans([...plans, newPlan]);
    }
    setIsFormModalOpen(false);
  };

  if (isLoading) return <div className="p-8 text-gray-500">Loading plans...</div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-[28px] font-semibold text-gray-900">Subscription Plan</h2>
        <button 
          onClick={handleCreate}
          className="bg-gradient hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors"
        >
          <Plus size={16} /> Create Plan
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
        {plans.map((plan) => (
          <PlanCard 
            key={plan.id} 
            plan={plan} 
            onEdit={handleEdit} 
            onDelete={handleDelete} 
          />
        ))}
      </div>

      {/* Form Modal */}
      <PlanFormModal 
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        initialData={editingPlan}
        onSave={handleSave}
      />
    </div>
  );
}