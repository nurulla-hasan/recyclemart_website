import { ProfilePageHeader } from "@/components/profile/ProfilePageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UpdateProfileForm from "@/components/profile/UpdateProfileForm";
import ChangePasswordForm from "@/components/profile/ChangePasswordForm";
import { fetchMyProfile } from "@/services/Auth";

export default async function ProfileSettingsPage() {
  const profileData = await fetchMyProfile();
  const user = profileData?.success ? profileData.data : null;

  return (
    <div className="space-y-6">
      <ProfilePageHeader
        title="Profile settings"
        description="Update account details, manage security preferences, and configure notifications."
      />

      <Tabs defaultValue="account" className="space-y-6">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          {/* <TabsTrigger value="notifications">Notifications</TabsTrigger> */}
        </TabsList>

        <TabsContent value="account" className="space-y-4">
          <UpdateProfileForm user={user} />
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <ChangePasswordForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
