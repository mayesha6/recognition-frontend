import ChangePassword from "@/modules/user/setting/components/ChangePassword";
import ContactInfo from "@/modules/user/setting/components/ContactInfo";
import GeneralSettings from "@/modules/user/setting/components/GeneralSettings";

export default function SettingsPage() {
  // const { data: user } = useGetMeQuery(undefined);
const user = {
  // General Settings
  profilePicture: "",
  
  // Contact Info
  fullName: "Saifur Rahman",
  email: "saifur.rahman@quotexstudio.com",
  phoneNumber: "+880 1711 000000",
  department: "Engineering",
  organization: "Quotex Studio",
  
  // Status flags (if needed)
  isEmailVerified: true,
  lastUpdated: "June 25, 2026"
};
  return (
    <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-6">
      <GeneralSettings user={user} />
      <ContactInfo user={user}/>
      <ChangePassword />
    </div>
  );
}