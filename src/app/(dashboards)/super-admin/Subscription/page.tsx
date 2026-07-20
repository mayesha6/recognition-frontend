"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import { Plan } from "@/types/subscription";
import PlanCard from "@/modules/super-admin/subscription/PlanCard";
import PlanFormModal from "@/modules/super-admin/subscription/PlanFormModal";
import {
  useGetPlansQuery,
  useCreatePlanMutation,
  useUpdatePlanMutation,
  useDeletePlanMutation,
} from "@/redux/api/planApi";

export default function SubscriptionPage() {
  const { data: plansRes, isLoading, refetch } = useGetPlansQuery();
  const [createPlan] = useCreatePlanMutation();
  const [updatePlan] = useUpdatePlanMutation();
  const [deletePlan] = useDeletePlanMutation();

  // Modals State
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);

  // Convert backend fields to frontend format
  const getPlansList = (): Plan[] => {
    if (!plansRes?.data) return [];
    return plansRes.data.map((plan: any) => ({
      id: plan._id,
      name: plan.name,
      description: plan.description || "",
      price: plan.price === 0 ? "Free" : plan.price,
      billingCycle: plan.interval === "MONTH" ? "Monthly" : plan.interval === "YEAR" ? "Yearly" : plan.interval,
      features: plan.features || [],
      allocatedPoints: plan.allocatedPoints || 0,
      userLimit: plan.userLimit || 1,
    }));
  };

  const handleCreate = () => {
    setEditingPlan(null);
    setIsFormModalOpen(true);
  };

  const handleEdit = (plan: Plan) => {
    setEditingPlan(plan);
    setIsFormModalOpen(true);
  };

  const handleDelete = async (plan: Plan) => {
    if (confirm(`Are you sure you want to delete the ${plan.name} plan?`)) {
      try {
        await deletePlan(plan.id).unwrap();
        refetch();
      } catch (err: any) {
        alert(err?.data?.message || err?.message || "Failed to delete plan");
      }
    }
  };

  const handleSave = async (planData: Partial<Plan>) => {
    // Format data back to backend requirements
    const payload = {
      name: planData.name,
      description: planData.description,
      price: planData.price === "Free" || Number(planData.price) === 0 ? 0 : Number(planData.price),
      interval: planData.billingCycle === "Monthly" ? "MONTH" : "YEAR",
      features: planData.features,
      allocatedPoints: planData.allocatedPoints || 0,
      userLimit: planData.userLimit || 1,
    };

    try {
      if (editingPlan) {
        await updatePlan({ id: editingPlan.id, ...payload }).unwrap();
      } else {
        await createPlan(payload).unwrap();
      }
      setIsFormModalOpen(false);
      refetch();
    } catch (err: any) {
      alert(err?.data?.message || err?.message || "Failed to save plan");
    }
  };

  if (isLoading) return <div className="p-8 text-gray-500">Loading plans...</div>;

  const plans = getPlansList();

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