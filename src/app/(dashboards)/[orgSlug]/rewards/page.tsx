"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AddRewardModal from "@/modules/org-admin/reward/AddRewardModal";
import EditRewardModal from "@/modules/org-admin/reward/EditRewardModal";
import RewardTable from "@/modules/org-admin/reward/RewardTable";
import StatCard from "@/modules/user/rewards/components/StatCard";
import DeleteConfirmationModal from "@/components/common/DeleteConfirmationModal";
import { Gift, ShoppingBag, CreditCard, Search, Plus, Coins } from "lucide-react";
import { 
  useGetRewardsQuery, 
  useCreateRewardMutation, 
  useUpdateRewardMutation, 
  useDeleteRewardMutation,
  useGetMyClaimsQuery
} from "@/redux/api/rewardApi";
import { toast } from "sonner";

export default function RewardsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddRewardModalOpen, setIsAddRewardModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [selectedReward, setSelectedReward] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: rewardsRes, isLoading: isRewardsLoading } = useGetRewardsQuery();
  const { data: claimsRes } = useGetMyClaimsQuery();

  const [createReward, { isLoading: isCreating }] = useCreateRewardMutation();
  const [updateReward, { isLoading: isUpdating }] = useUpdateRewardMutation();
  const [deleteReward, { isLoading: isDeleting }] = useDeleteRewardMutation();

  const rawRewards = rewardsRes?.data || rewardsRes?.result || rewardsRes || [];
  const rewardsList = Array.isArray(rawRewards) ? rawRewards : [];

  const filteredRewards = rewardsList.filter((item: any) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      (item.name && item.name.toLowerCase().includes(term)) ||
      (item.description && item.description.toLowerCase().includes(term))
    );
  });

  const claimsList = claimsRes?.data?.result || claimsRes?.data || claimsRes || [];
  const claimsCount = Array.isArray(claimsList) ? claimsList.length : 0;

  const handleCreate = async (payload: any) => {
    try {
      await createReward(payload).unwrap();
      toast.success("Reward created successfully!");
      setIsAddRewardModalOpen(false);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to create reward");
    }
  };

  const handleEditSave = async (payload: any) => {
    try {
      await updateReward(payload).unwrap();
      toast.success("Reward updated successfully!");
      setIsModalOpen(false);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update reward");
    }
  };

  const handleDeleteClick = (id: string) => {
    setDeletingId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deletingId) return;
    try {
      await deleteReward(deletingId).unwrap();
      toast.success("Reward deleted successfully!");
      setIsDeleteModalOpen(false);
      setDeletingId(null);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete reward");
    }
  };

  const handleEdit = (reward: any) => {
    setSelectedReward(reward);
    setIsModalOpen(true);
  };

  const topRewardName = filteredRewards[0]?.name || "N/A";

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-[28px] font-medium text-gray-900 font-bold">Reward & Redeem</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="Total Rewards"
          count={rewardsList.length}
          icon={<Gift className="w-5 h-5 text-indigo-800" />}
          iconBgColor="bg-indigo-800/10"
        />
        <StatCard
          title="Points in Circulation"
          count="0"
          icon={<Coins className="w-5 h-5 text-orange-500" />}
          iconBgColor="bg-orange-500/10"
        />
        <StatCard
          title="Redemptions This Month"
          count={claimsCount}
          icon={<ShoppingBag className="w-5 h-5 text-green-500" />}
          iconBgColor="bg-green-500/10"
        />
        <StatCard
          title="Latest Reward"
          count={topRewardName}
          icon={<CreditCard className="w-5 h-5 text-indigo-500" />}
          iconBgColor="bg-indigo-500/10"
        />
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mt-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <h2 className="text-2xl font-light text-gray-900">Reward Catalog</h2>
          <div className="flex items-center justify-end gap-4 w-full sm:w-auto">
            <div className="flex items-center bg-gray-100 rounded-lg px-3 w-full sm:w-64 border border-gray-200">
              <Search className="w-4 h-4 text-gray-400" />
              <Input 
                placeholder="Search..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full focus-visible:ring-0 focus-visible:ring-offset-0 border-none bg-transparent" 
              />
            </div>
            <Button onClick={() => setIsAddRewardModalOpen(true)} className="bg-gradient hover:opacity-90 text-white whitespace-nowrap">
              <Plus className="w-4 h-4 mr-1" />
              Add Reward
            </Button>
          </div>
        </div>

        {isRewardsLoading ? (
          <div className="flex flex-col items-center justify-center min-h-[200px] gap-2">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            <p className="text-sm text-gray-500 font-medium animate-pulse">Loading rewards catalog...</p>
          </div>
        ) : (
          <RewardTable
            rewards={filteredRewards}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
          />
        )}
      </div>

      <AddRewardModal
        isOpen={isAddRewardModalOpen}
        onClose={() => setIsAddRewardModalOpen(false)}
        onSave={handleCreate}
        isLoading={isCreating}
      />

      <EditRewardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        rewardData={selectedReward}
        onSave={handleEditSave}
        isLoading={isUpdating}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeletingId(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Delete Reward"
        description="Are you sure you want to delete this reward? This action is permanent and cannot be undone."
        isLoading={isDeleting}
      />
    </div>
  );
}