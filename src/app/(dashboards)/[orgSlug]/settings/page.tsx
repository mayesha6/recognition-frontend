import { redirect } from "next/navigation";

interface SettingsIndexPageProps {
  params: Promise<{
    orgSlug: string;
  }>;
}

export default async function SettingsIndexPage({ params }: SettingsIndexPageProps) {
  const { orgSlug } = await params;
  redirect(`/${orgSlug}/settings/general`);
}
