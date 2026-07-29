import { redirect } from "next/navigation";

interface DeptAdminIndexPageProps {
  params: Promise<{
    orgSlug: string;
  }>;
}

export default async function DeptAdminIndexPage({ params }: DeptAdminIndexPageProps) {
  const { orgSlug } = await params;
  redirect(`/${orgSlug}/dept-admin/dashboard`);
}