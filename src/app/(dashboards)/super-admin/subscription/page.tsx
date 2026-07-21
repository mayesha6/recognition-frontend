"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import { Plan } from "@/types/subscription";
import PlanCard from "@/modules/super-admin/subscription/PlanCard";
import PlanFormModal from "@/modules/super-admin/subscription/PlanFormModal";
import DeleteConfirmationModal from "@/components/common/DeleteConfirmationModal";
import {
  useGetPlansQuery,
  useCreatePlanMutation,
  useUpdatePlanMutation,
  useDeletePlanMutation,
} from "@/redux/api/planApi";
import { toast } from "sonner";

export default function SubscriptionPage() {
  const { data: plansRes, isLoading, refetch } = useGetPlansQuery();
  const [createPlan] = useCreatePlanMutation();
  const [updatePlan] = useUpdatePlanMutation();
  const [deletePlan, { isLoading: isDeleting }] = useDeletePlanMutation();

  // Modals State
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingPlan, setDeletingPlan] = useState<Plan | null>(null);

  const rawPlans = plansRes?.data || plansRes?.result || plansRes || [];
  const plans: Plan[] = Array.isArray(rawPlans)
    ? rawPlans.map((p: any) => ({
        id: p._id || p.id,
        name: p.name,
        price: p.price === 0 ? "Free" : String(p.price),
        billingCycle: p.duration === "YEARLY" ? "yearly" : "monthly",
        description: p.description || "",
        features: p.features || [],
        userLimit: p.userLimit ?? 0,
        isPopular: p.isPopular || false,
      }))
    : [];

  const handleAddNew = () => {
    setEditingPlan(null);
    setIsFormModalOpen(true);
  };

  const handleEdit = (plan: Plan) => {
    setEditingPlan(plan);
    setIsFormModalOpen(true);
  };

  const handleDeleteClick = (plan: Plan) => {
    setDeletingPlan(plan);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deletingPlan) return;
    try {
      await deletePlan(deletingPlan.id).unwrap();
      toast.success("Plan deleted successfully!");
      refetch();
      setIsDeleteModalOpen(false);
      setDeletingPlan(null);
    } catch (err: any) {
      toast.error(err?.data?.message || err?.message || "Failed to delete plan");
    }
  };

  const handleSave = async (planData: Partial<Plan>) => {
    // Format data back to backend requirements
    const payload = {
      name: planData.name,
      description: planData.description,
      price: planData.price === "Free" || Number(planData.price) === 0 ? 0 : Number(planData.price),
      duration: planData.billingCycle === "yearly" ? "YEARLY" : "MONTHLY",
      userLimit: Number(planData.userLimit) || 0,
      features: planData.features || [],
      isPopular: Boolean((planData as any).isPopular),
    };

    try {
      if (editingPlan) {
        await updatePlan({ id: editingPlan.id, ...payload }).unwrap();
        toast.success("Plan updated successfully!");
      } else {
        await createPlan(payload).unwrap();
        toast.success("Plan created successfully!");
      }
      refetch();
      setIsFormModalOpen(false);
    } catch (err: any) {
      toast.error(err?.data?.message || err?.message || "Failed to save plan");
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-2">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        <p className="text-sm text-gray-500 font-medium animate-pulse">Loading subscription plans...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-[28px] font-semibold text-gray-900">Subscription Plan</h2>
        <button 
          onClick={handleAddNew}
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
            onDelete={handleDeleteClick} 
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

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeletingPlan(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Delete Subscription Plan"
        itemName={deletingPlan?.name}
        isLoading={isDeleting}
      />
    </div>
  );
}