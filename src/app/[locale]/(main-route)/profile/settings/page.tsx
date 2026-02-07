import { ProfilePageHeader } from "@/components/profile/ProfilePageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UpdateProfileForm from "@/components/profile/UpdateProfileForm";
import ChangePasswordForm from "@/components/profile/ChangePasswordForm";
import { fetchMyProfile } from "@/services/Auth";
import { getTranslations } from "next-intl/server";

export default async function ProfileSettingsPage() {
  const t = await getTranslations("Profile.settings");
  const profileData = await fetchMyProfile();
  const user = profileData?.success ? profileData.data : null;

  return (
    <div className="space-y-6">
      <ProfilePageHeader
        title={t("title")}
        description={t("description")}
      />

      <Tabs defaultValue="account" className="space-y-6">
        <TabsList>
          <TabsTrigger value="account">{t("tabs.account")}</TabsTrigger>
          <TabsTrigger value="security">{t("tabs.security")}</TabsTrigger>
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
